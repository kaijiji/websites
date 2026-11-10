// 戦闘エフェクト：火花・炎・衝撃波・予兆マーカー・ダメージ数字
import * as THREE from 'three';
import { rand, TAU, sat } from './util.js';

const MAXP = 2600;
const _v = new THREE.Vector3();

export class Fx {
  constructor(world, layer) {
    this.world = world; this.scene = world.scene; this.layer = layer;
    // ---- パーティクル（CPU更新・加算合成） ----
    this.n = MAXP; this.cursor = 0;
    this.pos = new Float32Array(MAXP * 3); this.vel = new Float32Array(MAXP * 3);
    this.col = new Float32Array(MAXP * 3); this.size = new Float32Array(MAXP);
    this.life = new Float32Array(MAXP); this.maxLife = new Float32Array(MAXP);
    this.grav = new Float32Array(MAXP); this.drag = new Float32Array(MAXP); this.alpha = new Float32Array(MAXP);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    g.setAttribute('aCol', new THREE.BufferAttribute(this.col, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1));
    g.setAttribute('aAlpha', new THREE.BufferAttribute(this.alpha, 1));
    this.pmat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uScale: { value: 1 } },
      vertexShader: `attribute vec3 aCol; attribute float aSize; attribute float aAlpha; varying vec3 vC; varying float vA; uniform float uScale;
        void main(){ vC = aCol; vA = aAlpha; vec4 mv = modelViewMatrix*vec4(position,1.0); gl_Position = projectionMatrix*mv; gl_PointSize = aAlpha > 0.0 ? uScale*aSize/max(-mv.z,0.3) : 0.0; }`,
      fragmentShader: `varying vec3 vC; varying float vA; void main(){ float d = length(gl_PointCoord-0.5); if(d>0.5) discard; float f = smoothstep(0.5,0.0,d); gl_FragColor = vec4(vC*vA*f*f*1.6, 1.0); }`,
    });
    this.points = new THREE.Points(g, this.pmat); this.points.frustumCulled = false; this.points.renderOrder = 5;
    this.scene.add(this.points);
    // ---- 使い回すメッシュ ----
    this.rings = []; this.markers = []; this.pillars = []; this.balls = [];
    this.ringGeo = new THREE.RingGeometry(0.86, 1, 64); this.ringGeo.rotateX(-Math.PI / 2);
    this.discGeo = new THREE.CircleGeometry(1, 40); this.discGeo.rotateX(-Math.PI / 2);
    this.cylGeo = new THREE.CylinderGeometry(1, 1, 1, 20, 1, true); this.cylGeo.translate(0, 0.5, 0);
    this.ballGeo = new THREE.IcosahedronGeometry(1, 1);
    this.flashLight = new THREE.PointLight(0xffa050, 0, 30, 1.6); this.scene.add(this.flashLight);
    this.numbers = [];
    this.tmp = new THREE.Vector3();
  }

  resize(h, pr) { this.pmat.uniforms.uScale.value = h * pr * 0.9; }

  // o: {speed, spread(0..1 dirの拡散), dir:[x,y,z], life, size, gravity, drag, color:[r,g,b], color2}
  burst(p, n, o = {}) {
    const sp = o.speed ?? 6, life = o.life ?? 0.6, size = o.size ?? 0.25, c = o.color ?? [1, 0.6, 0.2], c2 = o.color2 ?? c;
    const dir = o.dir, spread = o.spread ?? 1, jitter = o.jitter ?? 0.15;
    for (let k = 0; k < n; k++) {
      const i = this.cursor; this.cursor = (this.cursor + 1) % MAXP;
      let vx, vy, vz;
      const u = Math.random() * 2 - 1, th = Math.random() * TAU, s = Math.sqrt(1 - u * u);
      vx = s * Math.cos(th); vy = u; vz = s * Math.sin(th);
      if (dir) { vx = dir[0] + vx * spread; vy = dir[1] + vy * spread; vz = dir[2] + vz * spread; }
      const m = sp * (0.35 + Math.random() * 0.65);
      this.vel[i * 3] = vx * m; this.vel[i * 3 + 1] = vy * m; this.vel[i * 3 + 2] = vz * m;
      this.pos[i * 3] = p.x + (Math.random() - 0.5) * jitter; this.pos[i * 3 + 1] = p.y + (Math.random() - 0.5) * jitter; this.pos[i * 3 + 2] = p.z + (Math.random() - 0.5) * jitter;
      const t = Math.random();
      this.col[i * 3] = c[0] + (c2[0] - c[0]) * t; this.col[i * 3 + 1] = c[1] + (c2[1] - c[1]) * t; this.col[i * 3 + 2] = c[2] + (c2[2] - c[2]) * t;
      this.size[i] = size * (0.6 + Math.random() * 0.8);
      this.life[i] = this.maxLife[i] = life * (0.5 + Math.random() * 0.7);
      this.grav[i] = o.gravity ?? 9; this.drag[i] = o.drag ?? 1.2; this.alpha[i] = 1;
    }
  }

  // よく使う演出
  hitSpark(p, strong, weak) {
    this.burst(p, strong ? 46 : 22, { speed: strong ? 13 : 9, life: 0.45, size: strong ? 0.5 : 0.36, color: weak ? [1, 0.9, 0.4] : [1, 0.55, 0.15], color2: [1, 0.25, 0.05], gravity: 14 });
    this.burst(p, strong ? 10 : 5, { speed: 2, life: 0.22, size: strong ? 2.6 : 1.7, color: [1, 0.8, 0.5], gravity: 0, drag: 4 });
    this.flash(p, strong ? 60 : 26, 0.12);
  }
  metalSpark(p) { this.burst(p, 30, { speed: 12, life: 0.3, size: 0.26, color: [0.8, 0.9, 1], color2: [1, 1, 0.7], gravity: 16 }); this.flash(p, 20, 0.08, 0xbfd8ff); }
  dust(p, n = 16, sp = 4) { this.burst(p, n, { speed: sp, life: 1.1, size: 1.9, color: [0.2, 0.14, 0.11], color2: [0.12, 0.09, 0.08], gravity: -0.6, drag: 2.2, dir: [0, 0.35, 0], spread: 1 }); }
  flash(p, intensity, dur, color = 0xffa050) { this.flashLight.color.setHex(color); this.flashLight.position.copy(p); this.flashLight.intensity = intensity * 8; this._flashDecay = intensity * 8 / dur; }

  ring(x, z, t0, speed, maxR, color = 0xff7a2a) {
    const m = new THREE.Mesh(this.ringGeo, new THREE.MeshBasicMaterial({ color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false }));
    m.position.set(x, 0.12, z); this.scene.add(m);
    this.rings.push({ m, t: t0, speed, maxR });
  }
  marker(x, z, r, delay) {
    const m = new THREE.Mesh(this.discGeo, new THREE.MeshBasicMaterial({ color: 0xff3a10, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
    const e = new THREE.Mesh(this.ringGeo, new THREE.MeshBasicMaterial({ color: 0xffb060, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, side: THREE.DoubleSide }));
    m.position.set(x, 0.06, z); m.scale.setScalar(r); e.position.set(x, 0.08, z); this.scene.add(m, e);
    this.markers.push({ m, e, r, t: 0, delay });
  }
  pillar(x, z, r, color = 0xff6a20) {
    const m = new THREE.Mesh(this.cylGeo, new THREE.MeshBasicMaterial({ color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false }));
    m.position.set(x, 0, z); this.scene.add(m);
    this.pillars.push({ m, r, t: 0 });
    _v.set(x, 0.5, z);
    this.burst(_v, 70, { speed: 20, life: 1.0, size: 0.8, color: [1, 0.5, 0.1], color2: [1, 0.2, 0.02], dir: [0, 1.4, 0], spread: 0.5, gravity: 12, jitter: r });
    this.burst(_v, 24, { speed: 6, life: 1.4, size: 3, color: [0.25, 0.12, 0.08], gravity: -1.5, drag: 2, jitter: r });
    this.flash(_v.set(x, 2, z), 80, 0.3);
  }
  ball(from, to, dur) {
    const m = new THREE.Mesh(this.ballGeo, new THREE.MeshBasicMaterial({ color: 0xffc070, fog: false }));
    m.scale.setScalar(0.9); this.scene.add(m);
    this.balls.push({ m, from: from.clone(), to: to.clone(), t: 0, dur });
  }

  number(p, text, cls) {
    const el = document.createElement('div');
    el.className = 'dmg ' + (cls || ''); el.textContent = text;
    this.layer.appendChild(el);
    this.numbers.push({ el, p: p.clone(), t: 0, ox: rand(-24, 24), vy: rand(60, 90) });
    if (this.numbers.length > 40) { const o = this.numbers.shift(); o.el.remove(); }
  }

  update(dt, camera) {
    // パーティクル
    const { pos, vel, life, maxLife, grav, drag, alpha } = this;
    for (let i = 0; i < MAXP; i++) {
      if (life[i] <= 0) continue;
      life[i] -= dt;
      if (life[i] <= 0) { alpha[i] = 0; continue; }
      const d = Math.exp(-drag[i] * dt), j = i * 3;
      vel[j] *= d; vel[j + 1] = vel[j + 1] * d - grav[i] * dt; vel[j + 2] *= d;
      pos[j] += vel[j] * dt; pos[j + 1] += vel[j + 1] * dt; pos[j + 2] += vel[j + 2] * dt;
      if (pos[j + 1] < 0.03 && grav[i] > 0) { pos[j + 1] = 0.03; vel[j + 1] *= -0.3; vel[j] *= 0.6; vel[j + 2] *= 0.6; }
      alpha[i] = Math.min(1, (life[i] / maxLife[i]) * 2.2);
    }
    const g = this.points.geometry;
    g.attributes.position.needsUpdate = true; g.attributes.aAlpha.needsUpdate = true; g.attributes.aCol.needsUpdate = true; g.attributes.aSize.needsUpdate = true;
    if (this.flashLight.intensity > 0) this.flashLight.intensity = Math.max(0, this.flashLight.intensity - (this._flashDecay || 100) * dt);
    // 衝撃波
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const r = this.rings[i]; r.t += dt;
      const R = Math.max(0.01, r.t * r.speed);
      r.m.scale.set(R, 1, R); r.m.material.opacity = sat(1.3 - R / r.maxR) * 0.95; r.m.visible = r.t >= 0;
      if (R >= r.maxR) { this.scene.remove(r.m); r.m.material.dispose(); this.rings.splice(i, 1); }
    }
    for (let i = this.markers.length - 1; i >= 0; i--) {
      const k = this.markers[i]; k.t += dt;
      const f = sat(k.t / k.delay);
      k.e.scale.setScalar(k.r * (1.0 - f * 0.999) + 0.001 + k.r * 0.0); k.e.scale.y = 1;
      k.m.material.opacity = 0.14 + f * 0.3 + Math.sin(k.t * 22) * 0.05;
      if (k.t >= k.delay) { this.scene.remove(k.m, k.e); k.m.material.dispose(); k.e.material.dispose(); this.markers.splice(i, 1); }
    }
    for (let i = this.pillars.length - 1; i >= 0; i--) {
      const k = this.pillars[i]; k.t += dt;
      const f = k.t / 0.7;
      k.m.scale.set(k.r * (0.6 + f * 0.5), 2 + f * 16, k.r * (0.6 + f * 0.5)); k.m.material.opacity = sat(1 - f) * 0.85;
      if (f >= 1) { this.scene.remove(k.m); k.m.material.dispose(); this.pillars.splice(i, 1); }
    }
    for (let i = this.balls.length - 1; i >= 0; i--) {
      const b = this.balls[i]; b.t += dt;
      const f = sat(b.t / b.dur);
      b.m.position.lerpVectors(b.from, b.to, f); b.m.position.y += Math.sin(f * Math.PI) * 9;
      this.burst(b.m.position, 3, { speed: 1.5, life: 0.5, size: 1.5, color: [1, 0.5, 0.1], color2: [0.6, 0.12, 0.02], gravity: -1, drag: 2 });
      if (f >= 1) { this.scene.remove(b.m); b.m.material.dispose(); this.balls.splice(i, 1); }
    }
    // ダメージ数字（3D座標を画面に投影）
    const w = innerWidth, h = innerHeight;
    for (let i = this.numbers.length - 1; i >= 0; i--) {
      const n = this.numbers[i]; n.t += dt;
      if (n.t > 0.9) { n.el.remove(); this.numbers.splice(i, 1); continue; }
      this.tmp.copy(n.p).project(camera);
      if (this.tmp.z > 1) { n.el.style.opacity = 0; continue; }
      const x = (this.tmp.x * 0.5 + 0.5) * w + n.ox, y = (-this.tmp.y * 0.5 + 0.5) * h - n.vy * Math.sqrt(n.t);
      const sc = n.t < 0.1 ? 1.7 - n.t * 7 : 1;
      n.el.style.transform = `translate(${x.toFixed(0)}px,${y.toFixed(0)}px) translate(-50%,-50%) scale(${sc.toFixed(2)})`;
      n.el.style.opacity = n.t > 0.6 ? (0.9 - n.t) / 0.3 : 1;
    }
  }

  clear() {
    for (const r of this.rings) this.scene.remove(r.m);
    for (const k of this.markers) this.scene.remove(k.m, k.e);
    for (const k of this.pillars) this.scene.remove(k.m);
    for (const b of this.balls) this.scene.remove(b.m);
    this.rings.length = this.markers.length = this.pillars.length = this.balls.length = 0;
    for (const n of this.numbers) n.el.remove(); this.numbers.length = 0;
    this.life.fill(0); this.alpha.fill(0);
  }
}
