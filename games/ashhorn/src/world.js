// 描画まわり：レンダラー、闘技場「燼の火口」、空、光、環境パーティクル
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ARENA_R } from './config.js';
import { clamp, sat, TAU } from './util.js';

// 値ノイズ（地形と模様に使う）
function hash2(x, y) { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
export function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi), b = hash2(xi + 1, yi), c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
const fbm = (x, y) => vnoise(x, y) * 0.55 + vnoise(x * 2.1, y * 2.1) * 0.3 + vnoise(x * 4.3, y * 4.3) * 0.15;

export const QUALITY = {
  high: { pr: 2, shadow: 2048, bloom: true, embers: 900, aa: true },
  mid: { pr: 1.5, shadow: 1024, bloom: true, embers: 500, aa: false },
  low: { pr: 1, shadow: 0, bloom: false, embers: 220, aa: false },
};

export class World {
  constructor(canvas, quality) {
    this.canvas = canvas;
    this.qName = quality;
    this.q = QUALITY[quality];
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: this.q.aa, powerPreference: 'high-performance' });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x2a1410, 0.0125);
    this.camera = new THREE.PerspectiveCamera(80, 1, 0.08, 900);
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera);
    // 手元の武器は別シーンに描いて、モンスターにめり込まないようにする
    this.vmScene = new THREE.Scene();
    this.vmCamera = new THREE.PerspectiveCamera(58, 1, 0.01, 20);
    this.time = 0;
    this.trauma = 0; this.shake = { x: 0, y: 0, z: 0 };
    this.rage = 0;

    this._buildLights();
    this._buildSky();
    this._buildGround();
    this._buildRocks();
    this._buildMountains();
    this._buildEmbers();
    this.setQuality(quality);
    addEventListener('resize', () => this.resize());
    this.resize();
  }

  _buildLights() {
    const hemi = new THREE.HemisphereLight(0x6f7fb5, 0x8a3412, 1.05);
    this.scene.add(hemi); this.hemi = hemi;
    const moon = new THREE.DirectionalLight(0xbfd0ff, 1.9);
    moon.position.set(-30, 60, 25);
    moon.shadow.camera.left = -34; moon.shadow.camera.right = 34; moon.shadow.camera.top = 34; moon.shadow.camera.bottom = -34;
    moon.shadow.camera.near = 1; moon.shadow.camera.far = 160; moon.shadow.bias = -0.0006; moon.shadow.normalBias = 0.05;
    this.scene.add(moon); this.scene.add(moon.target); this.moon = moon;
    const rim = new THREE.DirectionalLight(0xff5a1c, 1.25); // 火山側からの照り返し
    rim.position.set(10, 8, -60); this.scene.add(rim);
    // 武器用の照明
    this.vmScene.add(new THREE.HemisphereLight(0x8fa0d0, 0x9a4018, 1.3));
    const vl = new THREE.DirectionalLight(0xdfe6ff, 1.6); vl.position.set(-1, 2, 1.5); this.vmScene.add(vl);
    const vr = new THREE.DirectionalLight(0xff6a2a, 0.9); vr.position.set(1.5, 0.2, -1); this.vmScene.add(vr);
    this.vmGlow = new THREE.PointLight(0xffa040, 0, 4); this.vmGlow.position.set(0.3, 0.1, -0.8); this.vmScene.add(this.vmGlow);
  }

  _buildSky() {
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, fog: false,
      uniforms: { uTime: { value: 0 }, uRage: { value: 0 } },
      vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `
        varying vec3 vDir; uniform float uTime; uniform float uRage;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
        float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
        float fbm(vec2 p){ float a=0.0, w=0.5; for(int i=0;i<4;i++){ a+=noise(p)*w; p*=2.03; w*=0.5; } return a; }
        void main(){
          vec3 d = normalize(vDir);
          float h = d.y;
          vec3 top = vec3(0.012,0.016,0.045), mid = vec3(0.13,0.045,0.09), hor = vec3(0.95,0.26,0.06);
          vec3 col = mix(mid, top, smoothstep(0.05,0.7,h));
          col = mix(hor*(0.75+uRage*0.5), col, smoothstep(-0.08,0.26,h));
          // 火山方向 (-Z) の空焼け
          float toV = max(dot(normalize(d.xz+1e-5), vec2(0.0,-1.0)),0.0);
          col += vec3(1.0,0.32,0.08) * pow(toV, 6.0) * smoothstep(0.5,-0.02,h) * 0.75;
          // 噴煙
          vec2 uv = vec2(atan(d.x,d.z)*2.2, h*5.0);
          float sm = fbm(uv*1.2 + vec2(uTime*0.012, -uTime*0.006));
          float band = smoothstep(0.62,0.02,h) * smoothstep(0.42,0.75,sm);
          col = mix(col, vec3(0.05,0.02,0.025) + hor*0.14*toV, band*0.82);
          // 星
          vec2 sp = d.xz/(abs(d.y)+0.35)*90.0;
          float st = step(0.9965, hash(floor(sp))) * smoothstep(0.18,0.6,h) * (1.0-band);
          col += vec3(0.8,0.85,1.0) * st * (0.6+0.4*sin(uTime*2.0+hash(floor(sp))*40.0));
          // 月（灰に霞む）
          vec3 md = normalize(vec3(-0.42,0.62,0.38));
          float m = dot(d, md);
          col += vec3(0.85,0.9,1.0) * smoothstep(0.9975,0.9985,m) * 1.5;
          col += vec3(0.35,0.42,0.6) * pow(max(m,0.0), 60.0) * 0.5;
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(700, 32, 20), mat);
    this.sky.frustumCulled = false;
    this.scene.add(this.sky);
  }

  // 高さ関数：闘技場内は平ら、外側は溶岩の堀→岩の外輪
  groundH(x, z) {
    const r = Math.hypot(x, z);
    if (r <= ARENA_R + 3) return 0;
    const k = r - (ARENA_R + 3);
    const moat = -2.4 * sat(k / 5) * sat((22 - k) / 8);
    const rise = Math.pow(sat((k - 14) / 60), 1.4) * 46;
    const n = (fbm(x * 0.045 + 7, z * 0.045 + 3) - 0.45) * 9 * sat(k / 10);
    return moat + rise + n;
  }

  _buildGround() {
    // 岩肌テクスチャ（溶岩の亀裂つき）をキャンバスで生成
    const S = 1024;
    const c1 = document.createElement('canvas'), c2 = document.createElement('canvas');
    c1.width = c1.height = c2.width = c2.height = S;
    const a = c1.getContext('2d'), e = c2.getContext('2d');
    a.fillStyle = '#3a312c'; a.fillRect(0, 0, S, S);
    e.fillStyle = '#000'; e.fillRect(0, 0, S, S);
    for (let i = 0; i < 2600; i++) {
      const x = Math.random() * S, y = Math.random() * S, r = 2 + Math.random() * 26;
      const g = 30 + Math.random() * 46;
      a.fillStyle = `rgba(${g + 12},${g + 3},${g - 2},${0.06 + Math.random() * 0.12})`;
      a.beginPath(); a.ellipse(x, y, r, r * (0.4 + Math.random() * 0.6), Math.random() * 3, 0, TAU); a.fill();
    }
    for (let i = 0; i < 9000; i++) { // 細かい粒
      const g = Math.random() < 0.5 ? 14 : 96;
      a.fillStyle = `rgba(${g},${g * 0.9},${g * 0.85},${Math.random() * 0.22})`;
      a.fillRect(Math.random() * S, Math.random() * S, 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
    const crack = (glow) => {
      let x = Math.random() * S, y = Math.random() * S, ang = Math.random() * TAU;
      const pts = [[x, y]];
      const n = 14 + Math.random() * 30;
      for (let i = 0; i < n; i++) { ang += (Math.random() - 0.5) * 1.3; x += Math.cos(ang) * (8 + Math.random() * 16); y += Math.sin(ang) * (8 + Math.random() * 16); pts.push([x, y]); }
      for (let ox = -S; ox <= S; ox += S) for (let oy = -S; oy <= S; oy += S) { // タイル境界で途切れないように
        const path = (ctx) => { ctx.beginPath(); pts.forEach(([px, py], i) => (i ? ctx.lineTo(px + ox, py + oy) : ctx.moveTo(px + ox, py + oy))); ctx.stroke(); };
        a.lineCap = e.lineCap = 'round'; a.lineJoin = e.lineJoin = 'round';
        a.strokeStyle = 'rgba(8,6,5,0.9)'; a.lineWidth = glow ? 7 : 3; path(a);
        if (glow) {
          e.strokeStyle = 'rgba(255,70,10,0.3)'; e.lineWidth = 9; path(e);
          e.strokeStyle = 'rgba(255,110,30,0.85)'; e.lineWidth = 3; path(e);
          e.strokeStyle = 'rgba(255,210,130,1)'; e.lineWidth = 1; path(e);
          a.strokeStyle = 'rgba(120,40,10,0.8)'; a.lineWidth = 3; path(a);
        }
      }
    };
    for (let i = 0; i < 26; i++) crack(false);
    for (let i = 0; i < 9; i++) crack(true);
    const map = new THREE.CanvasTexture(c1), em = new THREE.CanvasTexture(c2);
    for (const t of [map, em]) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(16, 16); t.anisotropy = 8; }
    map.colorSpace = THREE.SRGBColorSpace; em.colorSpace = THREE.SRGBColorSpace;

    const geo = new THREE.PlaneGeometry(520, 520, 150, 150);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) pos.setY(i, this.groundH(pos.getX(i), pos.getZ(i)));
    geo.computeVertexNormals();
    this.groundMat = new THREE.MeshStandardMaterial({ map, emissiveMap: em, emissive: 0xffffff, emissiveIntensity: 1.2, roughness: 0.94, metalness: 0.02 });
    const ground = new THREE.Mesh(geo, this.groundMat);
    ground.receiveShadow = true;
    this.scene.add(ground);

    // 溶岩の堀
    this.lavaMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uRage: { value: 0 }, fogColor: { value: this.scene.fog.color }, fogDensity: { value: this.scene.fog.density } },
      vertexShader: 'varying vec2 vP; varying float vD; void main(){ vP = position.xz; vec4 mv = modelViewMatrix*vec4(position,1.0); vD = -mv.z; gl_Position = projectionMatrix*mv; }',
      fragmentShader: `
        varying vec2 vP; varying float vD; uniform float uTime; uniform float uRage; uniform vec3 fogColor; uniform float fogDensity;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
        float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
        void main(){
          vec2 p = vP*0.16;
          float n = noise(p + vec2(uTime*0.05, uTime*0.03)) * 0.6 + noise(p*2.7 - vec2(uTime*0.07, 0.0)) * 0.4;
          float crust = smoothstep(0.38, 0.62, n);
          vec3 hot = mix(vec3(1.0,0.2,0.02), vec3(1.0,0.75,0.25), smoothstep(0.1,0.45,1.0-n)) * (2.2 + uRage*1.2);
          vec3 col = mix(hot, vec3(0.06,0.02,0.015), crust);
          float f = 1.0 - exp(-fogDensity*fogDensity*vD*vD*0.45);
          gl_FragColor = vec4(mix(col, fogColor, f), 1.0);
        }`,
    });
    const lava = new THREE.Mesh(new THREE.RingGeometry(ARENA_R + 2, 96, 96, 1), this.lavaMat);
    lava.rotation.x = -Math.PI / 2; lava.position.y = -1.1;
    this.scene.add(lava);
    // 溶岩の照り返し
    this.lavaLights = [];
    for (let i = 0; i < 4; i++) {
      const pl = new THREE.PointLight(0xff5a18, 260, 75, 1.7);
      const an = (i / 4) * TAU + 0.6; pl.position.set(Math.cos(an) * (ARENA_R + 9), 2.5, Math.sin(an) * (ARENA_R + 9));
      this.scene.add(pl); this.lavaLights.push(pl);
    }
  }

  _rockGeo(seed) {
    const g = new THREE.IcosahedronGeometry(1, 1);
    const p = g.attributes.position, tmp = new Map();
    for (let i = 0; i < p.count; i++) { // 同じ頂点は同じだけずらす
      const key = `${p.getX(i).toFixed(3)},${p.getY(i).toFixed(3)},${p.getZ(i).toFixed(3)}`;
      if (!tmp.has(key)) tmp.set(key, 0.72 + hash2(tmp.size * 1.7 + seed, seed * 3.1) * 0.6);
      const s = tmp.get(key); p.setXYZ(i, p.getX(i) * s, p.getY(i) * s, p.getZ(i) * s);
    }
    g.computeVertexNormals(); return g;
  }

  _buildRocks() {
    const geos = [this._rockGeo(1), this._rockGeo(2), this._rockGeo(3)];
    const mat = new THREE.MeshStandardMaterial({ color: 0x3b3431, roughness: 0.95, flatShading: true });
    const mat2 = new THREE.MeshStandardMaterial({ color: 0x4a3d36, roughness: 0.9, flatShading: true });
    this.rocks = new THREE.Group();
    const N = 46;
    for (let i = 0; i < N; i++) {
      const an = (i / N) * TAU + hash2(i, 5) * 0.08;
      const big = i % 5 === 0;
      const r = ARENA_R + 2.4 + hash2(i, 9) * 2.2 + (big ? 1.2 : 0);
      const m = new THREE.Mesh(geos[i % 3], i % 2 ? mat : mat2);
      const w = (big ? 3.4 : 1.9) + hash2(i, 2) * 1.6, h = (big ? 9 : 3) + hash2(i, 3) * (big ? 9 : 4.5);
      m.scale.set(w, h, w * (0.8 + hash2(i, 4) * 0.5));
      m.position.set(Math.cos(an) * r, h * 0.28 - 0.6, Math.sin(an) * r);
      m.rotation.set((hash2(i, 6) - 0.5) * 0.35, hash2(i, 7) * TAU, (hash2(i, 8) - 0.5) * 0.35);
      m.castShadow = true; m.receiveShadow = true;
      this.rocks.add(m);
    }
    // 外輪の巨岩
    for (let i = 0; i < 34; i++) {
      const an = hash2(i, 21) * TAU, r = 66 + hash2(i, 22) * 70;
      const m = new THREE.Mesh(geos[i % 3], mat);
      const w = 6 + hash2(i, 23) * 12, h = 10 + hash2(i, 24) * 30;
      m.scale.set(w, h, w);
      const x = Math.cos(an) * r, z = Math.sin(an) * r;
      m.position.set(x, this.groundH(x, z) + h * 0.2, z);
      m.rotation.set((hash2(i, 25) - 0.5) * 0.5, hash2(i, 26) * TAU, (hash2(i, 27) - 0.5) * 0.5);
      this.rocks.add(m);
    }
    // 巨大な古竜の肋骨（景観）
    const boneMat = new THREE.MeshStandardMaterial({ color: 0xa89f8c, roughness: 0.8, flatShading: true });
    for (let i = 0; i < 7; i++) {
      const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, -2, 0), new THREE.Vector3(1.5, 9, 0), new THREE.Vector3(6, 16 - i * 0.6, 0), new THREE.Vector3(12, 14 - i, 0)]);
      const rib = new THREE.Mesh(new THREE.TubeGeometry(curve, 10, 0.75 - i * 0.05, 5, false), boneMat);
      const an = -2.2 + i * 0.13;
      rib.position.set(Math.cos(an) * (ARENA_R + 7), 0, Math.sin(an) * (ARENA_R + 7));
      rib.rotation.y = -an + Math.PI; rib.castShadow = true;
      this.rocks.add(rib);
    }
    this.scene.add(this.rocks);
  }

  _buildMountains() {
    const ring = (radius, hMin, hMax, color, seed, n) => {
      const pos = [];
      for (let i = 0; i < n; i++) {
        const a0 = (i / n) * TAU, a1 = ((i + 1) / n) * TAU;
        const h0 = hMin + fbm(i * 0.35 + seed, seed) * (hMax - hMin) * (0.5 + hash2(i, seed)), h1 = hMin + fbm((i + 1) * 0.35 + seed, seed) * (hMax - hMin) * (0.5 + hash2(i + 1, seed));
        const x0 = Math.cos(a0) * radius, z0 = Math.sin(a0) * radius, x1 = Math.cos(a1) * radius, z1 = Math.sin(a1) * radius;
        pos.push(x0, -10, z0, x1, -10, z1, x0, h0, z0, x1, -10, z1, x1, h1, z1, x0, h0, z0);
      }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color, fog: false, side: THREE.DoubleSide }));
      m.frustumCulled = false; this.scene.add(m);
    };
    ring(330, 40, 150, 0x1c0d14, 3, 90);
    ring(230, 22, 80, 0x0d0709, 11, 110);
    // 火山
    const vol = new THREE.Mesh(new THREE.ConeGeometry(150, 210, 9, 1, true), new THREE.MeshBasicMaterial({ color: 0x100709, fog: false }));
    vol.position.set(30, 85, -380); this.scene.add(vol);
    const glowTex = this._radialTex('rgba(255,150,50,1)', 'rgba(255,60,10,0)');
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, fog: false, depthWrite: false, opacity: 0.6 }));
    glow.position.set(30, 205, -378); glow.scale.set(170, 120, 1); this.scene.add(glow); this.volGlow = glow;
    for (let i = 0; i < 3; i++) { // 溶岩流（細い筋）
      const s = new THREE.Mesh(new THREE.PlaneGeometry(1.6 + i * 0.8, 120 - i * 20), new THREE.MeshBasicMaterial({ color: 0xff6a1c, fog: false }));
      s.position.set(30 - 20 + i * 22, 118 + i * 6, -318 - i * 1.5); s.rotation.set(-0.62, 0, (i - 1) * 0.34); this.scene.add(s);
    }
  }

  _radialTex(c0, c1) {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const x = c.getContext('2d'); const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, c0); g.addColorStop(1, c1); x.fillStyle = g; x.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }

  _buildEmbers() {
    const N = 900;
    const pos = new Float32Array(N * 3), seed = new Float32Array(N);
    for (let i = 0; i < N; i++) { pos[i * 3] = Math.random() * 70; pos[i * 3 + 1] = Math.random() * 26; pos[i * 3 + 2] = Math.random() * 70; seed[i] = Math.random(); }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    this.emberMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uCam: { value: new THREE.Vector3() }, uScale: { value: 1 }, uRage: { value: 0 } },
      vertexShader: `
        attribute float aSeed; uniform float uTime; uniform vec3 uCam; uniform float uScale; uniform float uRage; varying float vA; varying float vSeed;
        void main(){
          vec3 p = position;
          float ash = step(0.62, aSeed);
          float sp = mix(1.6 + aSeed*3.2, -0.5 - aSeed*0.5, ash) * (1.0 + uRage*0.8*(1.0-ash));
          p.y = mod(p.y + uTime*sp, 26.0);
          p.x += sin(uTime*(0.5+aSeed) + aSeed*40.0) * 1.4; p.z += cos(uTime*(0.4+aSeed*0.7) + aSeed*17.0) * 1.4;
          p.xz = mod(p.xz - uCam.xz + 35.0, 70.0) - 35.0 + uCam.xz;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uScale * mix(26.0, 34.0, ash) * (0.5 + aSeed) / max(-mv.z, 0.5);
          vA = (1.0 - ash*0.72) * smoothstep(26.0, 20.0, p.y) * smoothstep(0.0, 1.5, p.y) * (0.6 + 0.4*sin(uTime*7.0 + aSeed*90.0));
          vSeed = ash;
        }`,
      fragmentShader: `
        varying float vA; varying float vSeed;
        void main(){ vec2 c = gl_PointCoord - 0.5; float d = length(c); if (d > 0.5) discard;
          vec3 col = mix(vec3(1.0,0.5,0.12), vec3(0.5,0.48,0.46), vSeed);
          gl_FragColor = vec4(col * vA * smoothstep(0.5, 0.0, d) * 1.8, 1.0); }`,
    });
    this.embers = new THREE.Points(g, this.emberMat);
    this.embers.frustumCulled = false;
    this.scene.add(this.embers);
  }

  setQuality(name) {
    this.qName = name; this.q = QUALITY[name];
    const q = this.q;
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, q.pr));
    this.renderer.shadowMap.enabled = q.shadow > 0;
    this.moon.castShadow = q.shadow > 0;
    if (q.shadow) { this.moon.shadow.mapSize.set(q.shadow, q.shadow); if (this.moon.shadow.map) { this.moon.shadow.map.dispose(); this.moon.shadow.map = null; } }
    this.embers.geometry.setDrawRange(0, q.embers);
    for (let i = 0; i < this.lavaLights.length; i++) this.lavaLights[i].visible = name !== 'low' || i < 2;
    this.scene.traverse((o) => { if (o.material && o.material.isMeshStandardMaterial) o.material.needsUpdate = true; });
    if (q.bloom) {
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      const vm = new RenderPass(this.vmScene, this.vmCamera); vm.clear = false; vm.clearDepth = true;
      this.composer.addPass(vm);
      this.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.62, 0.55, 0.82);
      this.composer.addPass(this.bloom);
      this.composer.addPass(new OutputPass());
    } else { this.composer = null; this.bloom = null; }
    this.resize();
  }

  resize() {
    const w = innerWidth, h = innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    this.vmCamera.aspect = w / h; this.vmCamera.updateProjectionMatrix();
    if (this.composer) { this.composer.setPixelRatio(this.renderer.getPixelRatio()); this.composer.setSize(w, h); }
    this.emberMat.uniforms.uScale.value = h / 900 * this.renderer.getPixelRatio() * 4;
  }

  addShake(a) { this.trauma = Math.min(1.25, this.trauma + a); }

  update(dt, focus) {
    this.time += dt;
    const t = this.time;
    this.sky.material.uniforms.uTime.value = t; this.sky.material.uniforms.uRage.value = this.rage;
    this.sky.position.copy(this.camera.position);
    this.lavaMat.uniforms.uTime.value = t; this.lavaMat.uniforms.uRage.value = this.rage;
    this.emberMat.uniforms.uTime.value = t; this.emberMat.uniforms.uCam.value.copy(this.camera.position); this.emberMat.uniforms.uRage.value = this.rage;
    this.groundMat.emissiveIntensity = 1.05 + Math.sin(t * 1.3) * 0.22 + this.rage * 1.3;
    for (let i = 0; i < this.lavaLights.length; i++) this.lavaLights[i].intensity = (240 + Math.sin(t * 2.1 + i * 2) * 50) * (1 + this.rage * 0.7);
    this.volGlow.material.opacity = 0.5 + Math.sin(t * 0.7) * 0.1 + this.rage * 0.25;
    if (focus) { // 影の範囲をプレイヤー周辺に寄せる
      this.moon.target.position.set(focus.x * 0.6, 0, focus.z * 0.6);
      this.moon.position.set(focus.x * 0.6 - 30, 60, focus.z * 0.6 + 25);
    }
    // 画面揺れ
    this.trauma = Math.max(0, this.trauma - dt * 1.5);
    const s = this.trauma * this.trauma;
    this.shake.x = (vnoise(t * 31, 1.3) - 0.5) * 0.14 * s;
    this.shake.y = (vnoise(t * 33, 7.7) - 0.5) * 0.14 * s;
    this.shake.z = (vnoise(t * 29, 4.1) - 0.5) * 0.2 * s;
    if (this.bloom) this.bloom.strength = 0.6 + this.rage * 0.25;
  }

  render() {
    const r = this.renderer;
    if (this.composer) { this.composer.render(); return; }
    r.autoClear = true; r.render(this.scene, this.camera);
    r.autoClear = false; r.clearDepth(); r.render(this.vmScene, this.vmCamera); r.autoClear = true;
  }
}
