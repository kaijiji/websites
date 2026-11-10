// 自分のハンター（一人称）と、他プレイヤーの見た目
import * as THREE from 'three';
import { PLAYER, ATTACKS, CHARGE, HITZONE, ARENA_R, WEAPONS, SP_GAIN, RANGED } from './config.js';
export const LOCKS = [null, { name: '頭', i: 0 }, { name: '胴', i: 2 }, { name: '尾', i: 7 }]; // 注目できる部位
import { clamp, lerp, sat, smooth, easeOut, damp, dampAngle, angDiff, rand, TAU } from './util.js';

export const ST = { free: 0, light1: 1, light2: 2, light3: 3, charge: 4, heavy: 5, counter: 6, dodge: 7, guard: 8, hurt: 9, knock: 10, dead: 11, drink: 12, stunned: 13, bounce: 14, special: 15 };
const V = new THREE.Vector3(), V2 = new THREE.Vector3();

// 剣の構えキーフレーム [時刻, x, y, z, rx, ry, rz]
const IDLE = [0.4, -0.4, -0.66, -0.62, 0.12, 0.2];
const KEYS = {
  light1: [[0, ...IDLE], [0.1, 0.62, -0.16, -0.6, -0.25, 0.3, -1.4], [0.2, 0.0, -0.2, -0.88, -1.3, 0, -0.25], [0.3, -0.58, -0.3, -0.6, -0.9, -0.5, 1.3], [0.56, ...IDLE]],
  light2: [[0, -0.4, -0.3, -0.62, -0.7, -0.4, 1.1], [0.1, -0.55, -0.18, -0.6, -0.3, -0.3, 1.45], [0.19, 0.05, -0.2, -0.88, -1.3, 0, 0.22], [0.3, 0.66, -0.3, -0.6, -0.9, 0.5, -1.4], [0.56, ...IDLE]],
  light3: [[0, 0.5, -0.25, -0.6, -0.8, 0.3, -1.0], [0.19, 0.28, 0.3, -0.5, 0.95, 0, 0.12], [0.33, 0.14, -0.22, -0.92, -1.35, 0, 0.05], [0.44, 0.1, -0.62, -0.8, -1.95, 0, 0.05], [0.86, ...IDLE]],
  heavy: [[0, 0.48, 0.3, -0.45, 1.15, 0, -0.5], [0.22, 0.0, -0.18, -0.96, -1.3, 0, 0.3], [0.36, -0.36, -0.7, -0.75, -2.0, 0, 0.6], [0.6, -0.3, -0.72, -0.72, -1.9, 0, 0.6], [1.0, ...IDLE]],
  special: [[0, 0.48, 0.3, -0.45, 1.15, 0, -0.5], [0.8, 0.52, 0.4, -0.38, 1.4, 0, -0.62], [1.0, 0.0, -0.18, -0.96, -1.3, 0, 0.3], [1.14, -0.36, -0.7, -0.75, -2.0, 0, 0.6], [1.6, ...IDLE]],
  counter: [[0, 0.02, -0.2, -0.55, -0.15, 0, 1.25], [0.14, 0.18, -0.06, -0.92, -1.2, 0, -0.7], [0.28, 0.58, 0.36, -0.6, -0.4, 0, -1.6], [0.66, ...IDLE]],
};
function sampleKeys(keys, t, out) {
  let i = 0;
  while (i < keys.length - 2 && t > keys[i + 1][0]) i++;
  const a = keys[i], b = keys[i + 1], f = smooth(sat((t - a[0]) / (b[0] - a[0])));
  for (let k = 0; k < 6; k++) out[k] = lerp(a[k + 1], b[k + 1], f);
  return out;
}

function buildSword(glowMat) {
  const g = new THREE.Group();
  const steel = new THREE.MeshStandardMaterial({ color: 0x9aa3b2, roughness: 0.42, metalness: 0.45 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2a2624, roughness: 0.7, metalness: 0.4 });
  const leather = new THREE.MeshStandardMaterial({ color: 0x4a2f20, roughness: 0.9 });
  const bone = new THREE.MeshStandardMaterial({ color: 0x8f866f, roughness: 0.7, flatShading: true });
  const box = (m, w, h, d, x, y, z, rz = 0) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.rotation.z = rz; g.add(o); return o; };
  // 刀身（骨と鋼の大剣）
  const blade = new THREE.Shape(); blade.moveTo(-0.075, 0); blade.lineTo(-0.095, 1.0); blade.lineTo(-0.02, 1.34); blade.lineTo(0.06, 1.12); blade.lineTo(0.075, 0); blade.closePath();
  const bm = new THREE.Mesh(new THREE.ExtrudeGeometry(blade, { depth: 0.028, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 1 }), steel);
  bm.position.set(0, 0.2, -0.014); g.add(bm);
  box(dark, 0.05, 1.0, 0.04, -0.01, 0.72, 0);                    // 樋
  box(glowMat, 0.012, 0.95, 0.045, -0.01, 0.72, 0);              // 刃文の光
  box(bone, 0.1, 0.5, 0.05, 0.075, 0.5, 0, -0.02);               // 峰の骨
  box(dark, 0.36, 0.07, 0.08, 0, 0.18, 0); box(bone, 0.07, 0.1, 0.07, -0.2, 0.2, 0, 0.5); box(bone, 0.07, 0.1, 0.07, 0.2, 0.2, 0, -0.5);
  box(leather, 0.05, 0.36, 0.055, 0, -0.03, 0); box(dark, 0.08, 0.07, 0.08, 0, -0.23, 0);
  return g;
}
function buildDual(glowMat) {
  const g = new THREE.Group();
  const steel = new THREE.MeshStandardMaterial({ color: 0xa7b0bd, roughness: 0.4, metalness: 0.45 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2a2624, roughness: 0.7, metalness: 0.4 });
  const sh = new THREE.Shape(); sh.moveTo(-0.05, 0); sh.lineTo(-0.075, 0.55); sh.lineTo(0.03, 0.95); sh.lineTo(0.055, 0.5); sh.lineTo(0.05, 0); sh.closePath();
  const bm = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 1 }), steel); bm.position.set(0, 0.16, -0.01); g.add(bm);
  const box = (m, w, h, d, x, y, z) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); g.add(o); };
  box(glowMat, 0.012, 0.62, 0.035, -0.01, 0.5, 0); box(dark, 0.24, 0.05, 0.07, 0, 0.14, 0); box(dark, 0.045, 0.26, 0.05, 0, 0, 0);
  return g;
}
function buildHammer(glowMat) {
  const g = new THREE.Group();
  const stone = new THREE.MeshStandardMaterial({ color: 0x6a625c, roughness: 0.8, metalness: 0.15, flatShading: true });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2a2624, roughness: 0.7, metalness: 0.4 });
  const wood = new THREE.MeshStandardMaterial({ color: 0x4a2f20, roughness: 0.9 });
  const box = (m, w, h, d, x, y, z, rz = 0) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.rotation.z = rz; g.add(o); };
  box(wood, 0.055, 1.35, 0.055, 0, 0.5, 0); box(dark, 0.08, 0.07, 0.08, 0, -0.2, 0);
  box(stone, 0.56, 0.36, 0.36, 0, 1.25, 0); box(dark, 0.6, 0.1, 0.4, 0, 1.25, 0); box(glowMat, 0.4, 0.04, 0.38, 0, 1.36, 0); box(glowMat, 0.4, 0.04, 0.38, 0, 1.14, 0);
  box(stone, 0.12, 0.3, 0.3, 0.33, 1.25, 0); box(stone, 0.12, 0.3, 0.3, -0.33, 1.25, 0);
  return g;
}
function buildBow(glowMat) {
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: 0x5a3a26, roughness: 0.8 });
  const bone = new THREE.MeshStandardMaterial({ color: 0x9a917a, roughness: 0.7, flatShading: true });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2a2624, roughness: 0.7 });
  const box = (m, w, h, d, x, y, z, rx = 0) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.rotation.x = rx; g.add(o); return o; };
  box(dark, 0.07, 0.3, 0.08, 0, 0, 0);
  for (const s of [-1, 1]) { box(wood, 0.055, 0.62, 0.06, 0, s * 0.44, 0.06, s * 0.22); box(bone, 0.05, 0.5, 0.05, 0, s * 0.93, 0.24, s * 0.5); }
  box(dark, 0.008, 2.28, 0.008, 0, 0, 0.36);                                // 弦
  box(bone, 0.018, 0.018, 1.25, 0.04, 0.03, -0.25); box(glowMat, 0.035, 0.035, 0.1, 0.04, 0.03, -0.9); // 矢
  g.scale.setScalar(0.62);
  return g;
}
function buildArm(color) {
  const g = new THREE.Group();
  const cloth = new THREE.MeshStandardMaterial({ color: 0x2c2a2e, roughness: 0.9 });
  const metal = new THREE.MeshStandardMaterial({ color: 0x4a4744, roughness: 0.6, metalness: 0.4, flatShading: true });
  const acc = new THREE.MeshStandardMaterial({ color, roughness: 0.7 });
  const m = (mat, w, h, d, x, y, z) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); o.position.set(x, y, z); g.add(o); };
  m(metal, 0.12, 0.13, 0.13, 0, 0, 0); m(cloth, 0.1, 0.5, 0.11, 0, -0.3, 0.04); m(metal, 0.125, 0.22, 0.13, 0, -0.2, 0.04); m(acc, 0.13, 0.04, 0.135, 0, -0.33, 0.04);
  return g;
}

// ---------------------------------------------------------------- ローカルプレイヤー
export class Player {
  constructor(world, input, env) {
    this.world = world; this.input = input; this.env = env;
    this.glowMat = new THREE.MeshStandardMaterial({ color: 0x331405, emissive: 0xff7a20, emissiveIntensity: 0.6 });
    this.vm = new THREE.Group(); world.vmScene.add(this.vm);
    this.sword = new THREE.Group(); this.sword.scale.setScalar(0.52); this.vm.add(this.sword);
    this.models = { great: buildSword(this.glowMat), dual: buildDual(this.glowMat), hammer: buildHammer(this.glowMat), bow: buildBow(this.glowMat) };
    this.lock = 0;
    for (const k in this.models) this.sword.add(this.models[k]);
    // 双剣の左手
    this.off = new THREE.Group(); this.off.scale.setScalar(0.52); this.off.add(buildDual(this.glowMat)); this.vm.add(this.off);
    this.armOff = buildArm(0xe2573a); this.off.add(this.armOff); this.armOff.position.set(0, -0.02, 0.02); this.armOff.rotation.x = 0.5;
    this.tp = false;
    this.armR = buildArm(0xe2573a); this.sword.add(this.armR); this.armR.position.set(0, -0.02, 0.02); this.armR.rotation.x = 0.5;
    this.armL = buildArm(0xe2573a); this.sword.add(this.armL); this.armL.position.set(0, -0.2, 0.02); this.armL.rotation.set(0.5, 0, 0.9);
    // 回復薬の瓶
    this.flask = new THREE.Group();
    const fm = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.13, 8), new THREE.MeshStandardMaterial({ color: 0x1c6b3a, emissive: 0x2bd070, emissiveIntensity: 1.2, roughness: 0.2 }));
    const fn = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.06, 8), new THREE.MeshStandardMaterial({ color: 0x7a6a50 })); fn.position.y = 0.09;
    this.flask.add(fm, fn); this.flask.visible = false; this.vm.add(this.flask);
    // 剣の軌跡
    const N = 16; this.trailN = N;
    const tg = new THREE.BufferGeometry();
    tg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 2 * 3), 3));
    tg.setAttribute('color', new THREE.BufferAttribute(new Float32Array(N * 2 * 3), 3));
    const idx = []; for (let i = 0; i < N - 1; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    tg.setIndex(idx);
    this.trail = new THREE.Mesh(tg, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false, depthTest: false }));
    this.trail.frustumCulled = false; world.vmScene.add(this.trail);
    this.trailPts = []; this.trailCol = [1, 0.8, 0.5];
    this.pose = [...IDLE]; this.poseT = [...IDLE];
    this.consumed = new Set();
    this.hitsOut = [];
    this.setWeapon('great');
    this.reset(0, 0);
  }

  setColor(hex) { for (const a of [this.armR, this.armL, this.armOff]) a.children[3].material.color.set(hex); }
  setWeapon(id) {
    this.weaponId = WEAPONS[id] ? id : 'great';
    const w = (this.w = WEAPONS[this.weaponId]);
    this.defs = {};
    for (const k in ATTACKS) { const d = ATTACKS[k], hv = k.startsWith('heavy') || k === 'counter'; this.defs[k] = { dur: d.dur / w.speed, hit: d.hit / w.speed, next: d.next / w.speed, mv: d.mv * (hv ? w.heavy : w.mv), reach: d.reach + w.reach, step: w.ranged ? 0 : d.step, strong: d.mv >= 34 }; }
    if (w.sp.dur) { const k = w.sp.hit / 0.97; this.defs.special = { ...w.sp, strong: true, k }; } // k: 構えアニメの時間倍率
    this.chargeT = CHARGE.lv.map((v) => v * w.charge); this.chargeOver = CHARGE.over * w.charge;
    for (const k in this.models) this.models[k].visible = k === this.weaponId;
  }

  reset(i, n) {
    const an = n > 1 ? (i - (n - 1) / 2) * 0.16 : 0;
    this.spawn = { x: Math.sin(an) * 28, z: 28 * Math.cos(an) };
    this.x = this.spawn.x; this.z = this.spawn.z; this.y = 0; this.yaw = Math.PI; this.pitch = 0.08;
    this.vx = 0; this.vz = 0; this.kx = 0; this.kz = 0;
    this.hp = PLAYER.hp; this.hpLag = PLAYER.hp; this.stamina = PLAYER.stamina; this.stamDelay = 0; this.potions = PLAYER.potions;
    this.state = 'free'; this.st = 0; this.combo = 0; this.buffer = null; this.didHit = false;
    this.guarding = false; this.guardT = 0; this.chargeLv = 0; this.attackHeld = 0; this.attackDown = false;
    this.sp = 0; this.oniT = 0;
    this.buffT = 0; this.counterT = 0; this.invuln = 0; this.hitstop = 0; this.healPool = 0; this.respawnT = 0;
    this.bob = 0; this.bobAmp = 0; this.roll = 0; this.eyeOff = 0; this.fov = 80; this.exhausted = false; this.sprinting = false;
    this.stats = { dmg: 0, hits: 0, just: 0, parry: 0, taken: 0, downs: 0, weak: 0, maxHit: 0 };
    this.consumed.clear(); this.alive = true; this.frozen = false; this.atk = null;
  }

  get eyeY() { return PLAYER.eye + this.eyeOff; }
  lookDir(out) { const cp = Math.cos(this.pitch); return out.set(Math.sin(this.yaw) * cp, Math.sin(this.pitch), Math.cos(this.yaw) * cp); }
  setState(s) { this.state = s; this.st = 0; this.didHit = false; }
  canAct() { return this.state === 'free'; }

  startAttack(name, mvBonus = 1) {
    const def = this.defs[name];
    this.atk = { name, def, mvBonus };
    this.setState(name.startsWith('heavy') ? 'heavy' : name);
    this.swung = false; this.attackDown = false;
    this.lunge = def.step;
  }

  update(dt, boss) {
    const inp = this.input, P = PLAYER, env = this.env;
    // ヒットストップ中は自分の時間だけ止める
    if (this.hitstop > 0) { this.hitstop -= dt; dt *= 0.06; }
    this.st += dt;
    this.buffT = Math.max(0, this.buffT - dt); this.counterT = Math.max(0, this.counterT - dt); this.invuln = Math.max(0, this.invuln - dt);
    // 視点
    if (this.state !== 'dead') {
      const lk = inp.consumeLook(), slow = this.state === 'heavy' || this.state.startsWith('light') ? 0.75 : 1;
      this.yaw -= lk.x * slow; this.pitch = clamp(this.pitch - lk.y * slow, -1.35, 1.4);
    } else inp.consumeLook();
    // 注目（ロックオン）：選んだ部位へ視点を自動で向ける
    if (!this.frozen && inp.pressed('lock')) { this.lock = (this.lock + 1) % LOCKS.length; if (this.lock === 3 && boss && boss.tailCut) this.lock = 0; env.popup(this.lock ? '注目：' + LOCKS[this.lock].name : '注目解除', 'warn'); }
    if (this.lock && boss && boss.active && !boss.dead && this.state !== 'dead') {
      let s = boss.spheres[LOCKS[this.lock].i]; if (!s.on) s = boss.spheres[2];
      const dx = s.pos.x - this.x, dz = s.pos.z - this.z, d = Math.hypot(dx, dz);
      this.yaw = dampAngle(this.yaw, Math.atan2(dx, dz), 11, dt);
      this.pitch = damp(this.pitch, clamp(Math.atan2(s.pos.y - (this.tp ? 2.0 : PLAYER.eye), Math.max(d, 1.2)), -1.2, 1.3), 11, dt);
    }

    const sinY = Math.sin(this.yaw), cosY = Math.cos(this.yaw);
    let mx = inp.move.x, my = inp.move.y;
    if (this.frozen) { mx = my = 0; }
    let wishX = sinY * my - cosY * mx, wishZ = cosY * my + sinY * mx;
    let speed = 0, control = 14;
    this.guarding = false;
    const wantAttack = !this.frozen && inp.pressed('attack'), attackHeld = !this.frozen && inp.held.attack;
    const wantDodge = !this.frozen && inp.pressed('dodge'), wantGuard = !this.frozen && inp.held.guard, wantPotion = !this.frozen && inp.pressed('potion');
    if (wantAttack) this.buffer = { k: 'attack', t: 0.28 };
    if (wantDodge) this.buffer = { k: 'dodge', t: 0.25 };
    if (this.buffer) { this.buffer.t -= dt; if (this.buffer.t <= 0) this.buffer = null; }
    this.oniT = Math.max(0, this.oniT - dt);
    // 奥義：ゲージが満タンのときだけ
    const wantSp = !this.frozen && inp.pressed('special');
    const trySpecial = () => {
      if (this.sp < 100) { env.popup('奥義ゲージが足りない', 'warn'); return false; }
      const sp = this.w.sp; this.sp = 0; this.buffer = null;
      env.popup(sp.name, 'just'); env.flash('charge'); env.audio.play('charge3', 1.3); env.audio.play('snarl', 0.5);
      if (sp.oni) { this.oniT = sp.oni; env.flash('just'); return false; } // 鬼人化はその場で発動して動き続けられる
      this.startAttack('special');
      return true;
    };
    const tryDodge = () => {
      if (this.stamina < 8) { env.popup('スタミナ切れ', 'warn'); return false; }
      this.stamina -= this.w.dodgeCost * (this.oniT > 0 ? 0.5 : 1); this.stamDelay = P.staminaDelay;
      let dx = wishX, dz = wishZ; const m = Math.hypot(dx, dz);
      if (m < 0.2) { dx = -sinY; dz = -cosY; } else { dx /= m; dz /= m; }
      this.dodgeDir = { x: dx, z: dz }; this.dodgeSide = -(dx * cosY - dz * sinY);
      this.setState('dodge'); env.audio.play('dodge', 1); this.buffer = null; this.justDone = false;
      return true;
    };

    switch (this.state) {
      case 'free': {
        this.sprinting = (inp.held.sprint || inp.autoSprint) && my > 0.3 && !this.exhausted && !wantGuard && this.stamina > 0;
        speed = (this.sprinting ? P.sprint : P.walk) * this.w.walk;
        if (this.sprinting) { this.stamina -= P.sprintDrain * dt; this.stamDelay = 0.25; if (this.stamina <= 0) { this.stamina = 0; this.exhausted = true; } }
        if (wantGuard) { this.guarding = true; this.guardT += dt; speed = P.guardMove; } else this.guardT = 0;
        if (this.buffer && this.buffer.k === 'dodge') { if (tryDodge()) break; this.buffer = null; }
        if (wantSp && trySpecial()) break;
        if (wantPotion) {
          if (this.potions <= 0) env.popup('回復薬がない', 'warn');
          else if (this.hp >= P.hp) env.popup('体力は満タン', 'warn');
          else { this.potions--; this.setState('drink'); env.audio.play('potion', 1); break; }
        }
        // 攻撃：押した瞬間に斬り始め、押し続けると溜めに移る
        if (this.buffer && this.buffer.k === 'attack') {
          this.buffer = null;
          if (this.counterT > 0) { this.counterT = 0; this.startAttack('counter'); break; }
          this.startAttack('light1'); this.attackDown = attackHeld;
        }
        break;
      }
      case 'light1': case 'light2': case 'light3': case 'heavy': case 'counter': case 'special': {
        if (this.oniT > 0) this.st += dt * 0.28; // 鬼人化中は振りが速い
        if (wantSp && this.state !== 'special' && this.st >= this.atk.def.next && trySpecial()) break;
        const def = this.atk.def;
        speed = 0.9; control = 6;
        if (this.lunge > 0 && this.st < def.hit) { const v = this.lunge / def.hit; this.x += sinY * v * dt; this.z += cosY * v * dt; }
        if (!this.didHit && this.st >= def.hit && !(this.attackDown && this.state.startsWith('light'))) { this.didHit = true; this.resolveAttack(boss); }
        if (!this.swung && this.st >= def.hit - 0.09 && !(this.attackDown && this.state.startsWith('light'))) { this.swung = true; env.audio.play(this.state.startsWith('light') ? 'swing' : 'swingHeavy', 1); }
        if (this.attackDown && !attackHeld) this.attackDown = false;
        if (this.attackDown && this.state.startsWith('light') && !this.didHit && this.st >= 0.15) { this.chargeLv = 0; this.setState('charge'); this.st = 0.15; break; }
        if (this.st >= def.next && this.buffer) {
          if (this.buffer.k === 'dodge') { if (tryDodge()) break; this.buffer = null; }
          else if (this.buffer.k === 'attack') {
            this.buffer = null;
            this.startAttack(this.state === 'light1' ? 'light2' : this.state === 'light2' ? 'light3' : 'light1'); this.attackDown = attackHeld;
            break;
          }
        }
        if (this.st >= def.dur) this.setState('free');
        break;
      }
      case 'charge': {
        speed = P.chargeMove;
        const lv = this.st >= this.chargeOver ? 2 : this.st >= this.chargeT[2] ? 3 : this.st >= this.chargeT[1] ? 2 : this.st >= this.chargeT[0] ? 1 : 0;
        if (lv !== this.chargeLv) {
          if (lv > this.chargeLv) { env.audio.play('charge' + lv, 1); env.flash('charge'); }
          else env.popup('溜めすぎ', 'warn');
          this.chargeLv = lv;
        }
        if (wantDodge) { if (tryDodge()) break; }
        if (!attackHeld) { this.startAttack('heavy' + Math.max(1, this.chargeLv)); break; }
        break;
      }
      case 'dodge': {
        const f = this.st / P.dodgeDur, v = (P.dodgeDist / P.dodgeDur) * (f < 0.65 ? 1.25 : 0.45);
        this.x += this.dodgeDir.x * v * dt; this.z += this.dodgeDir.z * v * dt; speed = 0;
        if (this.st >= P.dodgeDur) this.setState('free');
        break;
      }
      case 'drink': {
        speed = P.guardMove;
        if (!this.didHit && this.st >= P.potionTime * 0.72) { this.didHit = true; this.healPool += P.potionHeal; env.audio.play('heal', 1); env.flash('heal'); }
        if (wantDodge && this.st < P.potionTime * 0.6) { this.potions++; if (tryDodge()) break; this.potions--; }
        if (this.st >= P.potionTime) this.setState('free');
        break;
      }
      case 'hurt': speed = 1.2; if (this.st >= 0.42) this.setState('free'); break;
      case 'bounce': speed = 0.5; if (this.st >= 0.5) this.setState('free'); break;
      case 'stunned': speed = 0; if (this.st >= 1.7) this.setState('free'); break;
      case 'knock': speed = 0; if (this.st >= 1.25) { this.setState('free'); this.invuln = 0.5; } break;
      case 'dead':
        speed = 0;
        if (this.respawnT > 0) { this.respawnT -= dt; if (this.respawnT <= 0 && env.canRespawn()) this.respawn(); }
        break;
    }

    // 移動
    const wm = Math.hypot(wishX, wishZ);
    if (wm > 1) { wishX /= wm; wishZ /= wm; }
    this.vx = damp(this.vx, wishX * speed, control, dt); this.vz = damp(this.vz, wishZ * speed, control, dt);
    this.kx = damp(this.kx, 0, 4.5, dt); this.kz = damp(this.kz, 0, 4.5, dt);
    this.x += (this.vx + this.kx) * dt; this.z += (this.vz + this.kz) * dt;
    if (boss && !boss.dead) boss.pushOut(this, P.radius);
    const r = Math.hypot(this.x, this.z);
    if (r > ARENA_R) { this.x *= ARENA_R / r; this.z *= ARENA_R / r; }

    // スタミナと回復
    if (this.stamDelay > 0) this.stamDelay -= dt;
    else if (!this.sprinting || this.state !== 'free') this.stamina = Math.min(P.stamina, this.stamina + P.staminaRegen * (this.guarding ? 0.35 : this.state === 'charge' ? 0.5 : 1) * dt);
    if (this.exhausted && this.stamina > 30) this.exhausted = false;
    if (this.healPool > 0 && this.state !== 'dead') { const h = Math.min(this.healPool, 70 * dt); this.healPool -= h; this.hp = Math.min(P.hp, this.hp + h); }
    this.hpLag = this.hpLag > this.hp ? Math.max(this.hp, this.hpLag - 22 * dt) : this.hp;

    this.updateCamera(dt);
    this.updateViewModel(dt);
  }

  resolveAttack(boss) {
    const { def, name, mvBonus } = this.atk, env = this.env;
    const ranged = this.w.ranged;
    V.set(this.x, this.eyeY, this.z); this.lookDir(V2);
    if (this.tp && ranged) V.copy(this.world.camera.position); // 弓は三人称では画面の照準どおりに飛ぶ
    else if (this.tp) { const c = this.world.camera.position; V2.multiplyScalar(11).add(c).sub(V).normalize(); } // 三人称では照準の先を狙う
    const hit = boss && boss.active && !boss.dead ? boss.queryHit(V, V2, ranged ? RANGED.reach : def.reach, ranged ? 0.03 : name === 'special' ? 0.75 : name.startsWith('light') ? 0.52 : 0.44) : null;
    if (name === 'special' && this.w.blunt) { // 砕岩衝：外しても地面を割る
      const gp = new THREE.Vector3(this.x + Math.sin(this.yaw) * 2.4, 0.2, this.z + Math.cos(this.yaw) * 2.4);
      env.fx.dust(gp, 50, 11); env.fx.ring(gp.x, gp.z, 0, 22, 9, 0xffd9a0); env.audio.play('slam', 1.1); this.world.addShake(0.8);
      env.fx.burst(gp, 40, { speed: 13, life: 0.9, size: 0.5, color: [0.6, 0.55, 0.5], gravity: 16, dir: [0, 1, 0], spread: 0.8 });
    }
    if (ranged) {
      const from = new THREE.Vector3(this.x - Math.cos(this.yaw) * 0.25, this.eyeY - 0.22, this.z + Math.sin(this.yaw) * 0.25).addScaledVector(V2, 1.6);
      const to = hit ? hit.point : new THREE.Vector3().copy(V2).multiplyScalar(RANGED.reach).add(V);
      env.fx.tracer(from, to, name === 'special'); env.audio.play('dodge', name === 'special' ? 1.6 : 0.9); if (name === 'special') env.audio.play('bounce', 0.7);
    }
    if (!hit) return;
    const hd = Math.hypot(hit.point.x - this.x, hit.point.z - this.z), rangeMul = !ranged || (hd >= RANGED.near && hd <= RANGED.far) ? 1 : RANGED.off;
    const blunt = this.w.blunt, hz = blunt && hit.part === 'back' ? 0.7 : HITZONE[hit.part], strong = def.strong, weak = hit.part === 'head';
    const dmg = Math.max(1, Math.round(def.mv * mvBonus * hz * (this.buffT > 0 ? 1.25 : 1) * (this.oniT > 0 ? 1.2 : 1) * rangeMul * rand(0.95, 1.05)));
    if (name !== 'special' && this.oniT <= 0) this.sp = Math.min(100, this.sp + dmg * SP_GAIN.perDmg);
    this.stats.dmg += dmg; this.stats.hits++; if (weak) this.stats.weak++; this.stats.maxHit = Math.max(this.stats.maxHit, dmg);
    if (hit.part === 'back' && !blunt) { // 硬い背甲には弾かれる
      env.fx.metalSpark(hit.point); env.audio.play('bounce', 1); env.fx.number(hit.point, String(dmg), 'dull');
      this.world.addShake(0.25); this.setState('bounce'); env.popup('弾かれた！', 'warn');
    } else {
      env.fx.hitSpark(hit.point, strong && !ranged, weak); env.audio.play(strong ? 'hitHeavy' : 'hit', 1); if (weak) env.audio.play('weak', 1);
      env.fx.number(hit.point, String(dmg), weak ? 'weak' : strong ? 'strong' : '');
      this.hitstop = ranged ? 0 : strong ? 0.13 : 0.06; this.world.addShake(ranged ? 0.08 : strong ? 0.5 : 0.22);
      if (ranged && rangeMul < 1) env.popup(hd < RANGED.near ? '近すぎる' : '遠すぎる', 'warn');
      if (name === 'heavy3') { this.world.addShake(0.35); env.flash('impact'); }
      if (name === 'special') { this.hitstop = ranged ? 0.05 : 0.22; this.world.addShake(0.7); env.flash('impact'); env.fx.hitSpark(hit.point, !ranged, true); env.audio.play('crack', 0.8); }
    }
    boss.hitFlash = 1;
    env.dealHit(hit.part, dmg, hit.point, strong, weak, blunt, name === 'special' ? def.stun || 0 : 0);
  }

  // 敵の攻撃を受ける
  takeHit(h) {
    const P = PLAYER, env = this.env;
    if (this.state === 'dead' || this.consumed.has(h.key)) return;
    if (this.invuln > 0 || this.state === 'knock') return;
    if (this.state === 'dodge' && this.st >= P.iFrom && this.st <= P.iTo) {
      this.consumed.add(h.key);
      if (!this.justDone) { this.justDone = true; this.stats.just++; this.sp = Math.min(100, this.sp + SP_GAIN.just); this.buffT = this.w.buff; this.stamina = Math.min(P.stamina, this.stamina + 35); env.audio.play('just', 1); env.popup('見切り！', 'just'); env.flash('just'); env.onJust(); }
      return;
    }
    this.consumed.add(h.key);
    if (this.consumed.size > 200) this.consumed.clear();
    const dx = this.x - h.fromX, dz = this.z - h.fromZ, d = Math.hypot(dx, dz) || 1;
    const facing = Math.abs(angDiff(this.yaw, Math.atan2(-dx, -dz))) < 1.75;
    if (this.guarding && (facing || h.roar)) {
      if (this.guardT <= P.parryWindow && !h.fire) { // ジャストガード
        this.stats.parry++; this.counterT = 2.6; this.sp = Math.min(100, this.sp + SP_GAIN.parry); this.stamina = Math.min(P.stamina, this.stamina + 15);
        env.audio.play('parry', 1); env.popup(h.roar ? '耐えた！' : '弾き返し！', 'parry'); env.flash('parry'); this.world.addShake(0.4); this.hitstop = 0.1;
        V.set(this.x + Math.sin(this.yaw) * 0.9, this.eyeY - 0.2, this.z + Math.cos(this.yaw) * 0.9); env.fx.metalSpark(V);
        if (!h.roar) env.parry(h);
        return;
      }
      if (h.roar) { env.audio.play('guard', 0.6); return; }
      const dmg = h.dmg * this.w.guardRate;
      this.stamina -= h.dmg * (h.fire ? 0.7 : 1.15); this.stamDelay = 1.0;
      this.damage(dmg);
      env.audio.play('guard', 1); this.world.addShake(0.35);
      V.set(this.x + Math.sin(this.yaw) * 0.9, this.eyeY - 0.2, this.z + Math.cos(this.yaw) * 0.9); env.fx.metalSpark(V);
      this.kx += dx / d * h.kb * 0.45; this.kz += dz / d * h.kb * 0.45;
      if (this.stamina <= 0) { this.stamina = 0; this.exhausted = true; env.popup('ガード崩し', 'warn'); if (this.state !== 'dead') this.setState('hurt'); }
      return;
    }
    if (this.state === 'special' && !this.didHit) { // 奥義の構え中は怯まない（被ダメージ半減）
      if (!h.roar) { this.damage(h.dmg * 0.5); env.audio.play('guard', 0.8); env.flash('hurt'); this.world.addShake(0.4); }
      return;
    }
    if (h.roar) { this.setState('stunned'); env.popup('咆哮で動けない！', 'warn'); this.world.addShake(0.5); return; }
    this.damage(h.dmg);
    env.audio.play('hurt', 1); env.flash('hurt'); this.world.addShake(h.heavy ? 0.9 : 0.55);
    if (this.state === 'dead') return;
    this.kx += dx / d * h.kb; this.kz += dz / d * h.kb;
    this.attackDown = false; this.buffer = null;
    if (h.heavy) { this.setState('knock'); }
    else if (h.light) { if (this.state === 'drink' || this.state === 'charge') this.setState('hurt'); }
    else this.setState('hurt');
  }

  damage(d) {
    this.hp -= d; this.stats.taken += d; this.healPool = 0;
    if (this.hp <= 0) {
      this.hp = 0; this.alive = false; this.stats.downs++; this.setState('dead'); this.respawnT = 5;
      this.env.audio.play('down', 1); this.env.onDown();
    }
  }
  respawn() {
    this.x = this.spawn.x; this.z = this.spawn.z; this.yaw = Math.atan2(-this.x, -this.z); this.pitch = 0;
    this.hp = PLAYER.hp; this.hpLag = this.hp; this.stamina = PLAYER.stamina; this.potions = Math.max(this.potions, 2);
    this.alive = true; this.invuln = 2.5; this.kx = this.kz = 0; this.setState('free'); this.env.onRespawn();
  }

  updateCamera(dt) {
    const cam = this.world.camera, sh = this.world.shake, s = this.state;
    const sp = Math.hypot(this.vx, this.vz);
    this.bob += sp * dt * 1.55; this.bobAmp = damp(this.bobAmp, s === 'free' || s === 'charge' ? sat(sp / 5) : 0, 8, dt);
    let eye = 0, roll = 0, pitchAdd = 0, fov = 80;
    if (this.sprinting && s === 'free') fov = 87;
    if (s === 'dodge') { const f = this.st / PLAYER.dodgeDur; eye = -0.55 * Math.sin(Math.min(1, f * 1.15) * Math.PI); roll = this.dodgeSide * 0.2 * Math.sin(f * Math.PI); fov = 90; }
    else if (s === 'knock') { const f = this.st / 1.25; eye = -1.15 * (f < 0.25 ? f / 0.25 : f > 0.7 ? 1 - (f - 0.7) / 0.3 : 1); roll = 0.4 * Math.sin(sat(f * 1.4) * Math.PI); pitchAdd = 0.35 * Math.sin(f * Math.PI); }
    else if (s === 'dead') { eye = -1.3 * easeOut(sat(this.st / 0.6)); roll = 0.9 * easeOut(sat(this.st / 0.7)); }
    else if (s === 'hurt') { roll = 0.12 * Math.sin(sat(this.st / 0.42) * Math.PI); pitchAdd = 0.08 * Math.sin(sat(this.st / 0.42) * Math.PI); }
    else if (s === 'stunned') { roll = Math.sin(this.st * 9) * 0.05; pitchAdd = -0.25 * Math.sin(sat(this.st / 1.7) * Math.PI); fov = 74; }
    else if (s === 'charge') { fov = 80 - this.chargeLv * 2.5; }
    else if (s === 'special') { const d = this.atk.def; fov = this.st < d.hit ? 80 - 7 * sat(this.st / d.hit) : 80 + 10 * Math.sin(sat((this.st - d.hit) / 0.4) * Math.PI); pitchAdd = -0.09 * Math.sin(sat((this.st - d.hit + 0.05) / 0.35) * Math.PI); }
    else if (s === 'heavy') { fov = 80 + 7 * Math.sin(sat(this.st / 0.5) * Math.PI); pitchAdd = -0.07 * Math.sin(sat((this.st - 0.15) / 0.35) * Math.PI); }
    else if (s === 'light3') { pitchAdd = -0.04 * Math.sin(sat((this.st - 0.25) / 0.3) * Math.PI); }
    this.eyeOff = damp(this.eyeOff, eye, 18, dt); this.roll = damp(this.roll, roll - clamp(this.input.move.x, -1, 1) * 0.012 * sat(sp / 5), 14, dt);
    this.fov = damp(this.fov, fov, 9, dt);
    const by = Math.sin(this.bob * 2) * 0.045 * this.bobAmp, bx = Math.cos(this.bob) * 0.03 * this.bobAmp;
    cam.position.set(this.x - Math.cos(this.yaw) * bx, PLAYER.eye + this.eyeOff + by, this.z + Math.sin(this.yaw) * bx);
    cam.rotation.set(this.pitch + pitchAdd + sh.x, this.yaw + Math.PI + sh.y, this.roll + sh.z);
    if (this.tp) { // 三人称：右肩ごしのカメラ
      const cp = Math.cos(this.pitch), dist = 4.4;
      let cx = this.x - Math.sin(this.yaw) * cp * dist - Math.cos(this.yaw) * 0.75, cz = this.z - Math.cos(this.yaw) * cp * dist + Math.sin(this.yaw) * 0.75;
      const cy = Math.max(0.35, 2.0 + this.eyeOff * 0.3 - Math.sin(this.pitch) * dist), cr = Math.hypot(cx, cz), lim = ARENA_R + 1.2;
      if (cr > lim) { cx *= lim / cr; cz *= lim / cr; }
      cam.position.set(cx, cy, cz); cam.rotation.set(this.pitch + sh.x, this.yaw + Math.PI + sh.y, sh.z + this.roll * 0.3);
    }
    const aspectFov = innerWidth < innerHeight ? 95 : this.fov - (this.tp ? 8 : 0);
    if (Math.abs(cam.fov - aspectFov) > 0.05) { cam.fov = aspectFov; cam.updateProjectionMatrix(); }
  }

  updateViewModel(dt) {
    const s = this.state, t = this.st, T = this.poseT, time = this.world.time;
    let k = 16;
    this.flask.visible = false;
    const atkS = !!KEYS[s] || s === 'special';
    if (this.w.ranged && (atkS || s === 'charge' || (s === 'free' && !this.guarding))) { // 弓の構え
      const draw = s === 'charge' ? 0.5 + this.chargeLv * 0.17 : s === 'special' ? sat(t / this.atk.def.hit) * (t < this.atk.def.hit ? 1 : 0) : 0, kick = atkS && s !== 'special' ? 1 - sat(t / 0.16) : s === 'special' && t >= this.atk.def.hit ? 1 - sat((t - this.atk.def.hit) / 0.2) : 0;
      const up = atkS || s === 'charge' ? 1 : 0, tr = draw * 0.004;
      T[0] = lerp(0.4, 0.24, up) + rand(-tr, tr); T[1] = lerp(-0.34, -0.14, up) + rand(-tr, tr); T[2] = lerp(-0.6, -0.56, up) + draw * 0.07 + kick * 0.06; T[3] = lerp(-0.3, 0, up) + kick * 0.12; T[4] = lerp(0.3, -0.12, up); T[5] = lerp(0.5, 0.1, up); k = 22;
      this.models.bow.children[this.models.bow.children.length - 2].position.z = -0.25 + draw * 0.35; this.models.bow.children[this.models.bow.children.length - 1].position.z = -0.9 + draw * 0.35;
      this.models.bow.children[this.models.bow.children.length - 2].visible = this.models.bow.children[this.models.bow.children.length - 1].visible = !(atkS && kick < 1 && t > 0.02 && s !== 'special') && !(s === 'special' && t >= this.atk.def.hit);
    }
    else if (s === 'special') { sampleKeys(KEYS.special, t / this.atk.def.k, T); if (t < this.atk.def.hit - 0.1) { T[0] += rand(-0.008, 0.008); T[1] += rand(-0.008, 0.008); } k = 50; }
    else if (KEYS[s]) { sampleKeys(KEYS[s], t * this.w.speed, T); k = 60; }
    else if (s === 'charge') {
      const lv = this.chargeLv, tr = 0.004 + lv * 0.004;
      T[0] = 0.48 + rand(-tr, tr); T[1] = 0.26 + lv * 0.02 + rand(-tr, tr); T[2] = -0.45; T[3] = 0.95 + lv * 0.08; T[4] = 0; T[5] = -0.5; k = 12;
    } else if (s === 'dodge') { T[0] = 0.5; T[1] = -0.72; T[2] = -0.6; T[3] = -0.9; T[4] = 0; T[5] = 0.5; k = 18; }
    else if (s === 'drink') {
      T[0] = 0.62; T[1] = -0.8; T[2] = -0.6; T[3] = -0.9; T[4] = 0.2; T[5] = 0.3;
      const f = t / PLAYER.potionTime, up = smooth(sat(f / 0.25)) * (1 - smooth(sat((f - 0.8) / 0.2)));
      this.flask.visible = true; this.flask.position.set(-0.05, -0.55 + up * 0.36, -0.42); this.flask.rotation.set(-0.3 - up * 0.9, 0, 0.2);
    } else if (s === 'hurt' || s === 'bounce') { T[0] = 0.55; T[1] = -0.3; T[2] = -0.55; T[3] = 0.3; T[4] = 0.3; T[5] = -0.9; k = 20; }
    else if (s === 'knock' || s === 'dead' || s === 'stunned') { T[0] = 0.6; T[1] = -0.95; T[2] = -0.5; T[3] = -1.2; T[4] = 0; T[5] = 0.8; k = 8; }
    else if (this.guarding) { T[0] = 0.04 + (this.guardT < 0.12 ? 0.05 : 0); T[1] = -0.2; T[2] = -0.52 - (this.guardT < 0.12 ? 0.08 : 0); T[3] = -0.12; T[4] = 0; T[5] = 1.28; k = 30; }
    else {
      const run = this.sprinting ? 1 : 0, b = this.bobAmp;
      T[0] = IDLE[0] + Math.cos(this.bob) * 0.022 * b + run * 0.05; T[1] = IDLE[1] + Math.sin(this.bob * 2) * 0.02 * b + Math.sin(time * 1.7) * 0.006 - run * 0.1;
      T[2] = IDLE[2]; T[3] = IDLE[3] - run * 0.45; T[4] = IDLE[4]; T[5] = IDLE[5] + run * 0.2;
      if (this.counterT > 0) { T[1] += 0.05; T[5] = 0.9; }
    }
    const P = this.pose, f = 1 - Math.exp(-k * dt);
    for (let i = 0; i < 6; i++) P[i] = lerp(P[i], T[i], f);
    const portrait = innerWidth < innerHeight ? 0.55 : 1;
    this.sword.position.set(P[0] * portrait, P[1], P[2]); this.sword.rotation.set(P[3], P[4], P[5]);
    // 両手持ち・片手持ち
    this.armL.visible = this.weaponId !== 'dual' && (s === 'heavy' || s === 'charge' || s === 'light3' || this.guarding);
    this.off.visible = this.weaponId === 'dual'; this.off.position.set(-P[0] * portrait, P[1], P[2]); this.off.rotation.set(P[3], -P[4], -P[5]);
    // 光：溜め段階・見切りバフ
    const lv = s === 'charge' ? this.chargeLv : 0;
    const target = 0.5 + lv * 2.2 + (this.buffT > 0 ? 1.6 + Math.sin(time * 9) * 0.4 : 0) + (this.counterT > 0 ? 3 : 0) + (s === 'heavy' ? 3 : 0) + (s === 'special' ? 6 : 0) + (this.oniT > 0 ? 2.5 + Math.sin(time * 14) * 0.6 : 0) + (this.sp >= 100 ? 0.8 + Math.sin(time * 5) * 0.4 : 0);
    this.glowMat.emissiveIntensity = damp(this.glowMat.emissiveIntensity, this.w.ranged ? Math.min(target, 2.2) : target, 12, dt);
    this.glowMat.emissive.setHex(this.oniT > 0 || s === 'special' ? 0xff2a2a : this.counterT > 0 ? 0x7ac8ff : this.buffT > 0 ? 0xffe070 : lv >= 3 ? 0xff4020 : 0xff7a20);
    this.world.vmGlow.intensity = (lv * 1.2 + (s === 'heavy' ? 2 : 0) + (this.counterT > 0 ? 1.5 : 0)) * 0.8;
    this.world.vmGlow.color.setHex(this.counterT > 0 ? 0x7ac8ff : 0xffa040);
    // 軌跡
    const atk = this.atk, swinging = !this.w.ranged && atk && (s === atk.name || (s === 'heavy' && atk.name.startsWith('heavy'))) && t > atk.def.hit - 0.12 && t < atk.def.hit + 0.13;
    this.sword.updateMatrixWorld(true);
    if (swinging) {
      const tip = new THREE.Vector3(-0.02, this.w.tip, 0).applyMatrix4(this.sword.matrixWorld), base = new THREE.Vector3(0, this.w.base, 0).applyMatrix4(this.sword.matrixWorld);
      this.trailPts.unshift({ tip, base, a: 1 });
      this.trailCol = s === 'special' || this.oniT > 0 ? [1, 0.25, 0.15] : s === 'counter' ? [0.5, 0.8, 1] : s === 'heavy' ? [1, 0.45, 0.15] : [1, 0.85, 0.6];
    }
    for (const p of this.trailPts) p.a -= dt * 5.5;
    while (this.trailPts.length && (this.trailPts[this.trailPts.length - 1].a <= 0 || this.trailPts.length > this.trailN)) this.trailPts.pop();
    const pa = this.trail.geometry.attributes.position, ca = this.trail.geometry.attributes.color, c = this.trailCol;
    for (let i = 0; i < this.trailN; i++) {
      const p = this.trailPts[Math.min(i, this.trailPts.length - 1)];
      if (!p) { pa.setXYZ(i * 2, 0, 0, 0); pa.setXYZ(i * 2 + 1, 0, 0, 0); ca.setXYZ(i * 2, 0, 0, 0); ca.setXYZ(i * 2 + 1, 0, 0, 0); continue; }
      const a = i < this.trailPts.length ? Math.max(0, p.a) * 0.6 : 0;
      pa.setXYZ(i * 2, p.tip.x, p.tip.y, p.tip.z); pa.setXYZ(i * 2 + 1, p.base.x, p.base.y, p.base.z);
      ca.setXYZ(i * 2, c[0] * a, c[1] * a, c[2] * a); ca.setXYZ(i * 2 + 1, c[0] * a * 0.15, c[1] * a * 0.15, c[2] * a * 0.15);
    }
    pa.needsUpdate = true; ca.needsUpdate = true;
    this.vm.visible = !this.tp; this.trail.visible = !this.tp;
  }

  netState() {
    return [+this.x.toFixed(2), +this.z.toFixed(2), +this.yaw.toFixed(2), +this.pitch.toFixed(2), ST[this.guarding ? 'guard' : this.state] ?? 0, +this.st.toFixed(2), Math.ceil(this.hp), this.chargeLv, this.atk && this.state === 'heavy' ? +this.atk.def.dur.toFixed(2) : 0];
  }
}

// ---------------------------------------------------------------- 他プレイヤーの見た目
const STN = Object.keys(ST);
export class Avatar {
  constructor(scene, name, color, weapon = 'great') {
    this.scene = scene; this.name = name; this.color = color; this.wid = weapon; this.dual = weapon === 'dual'; this.ranged = weapon === 'bow'; this.k = 13;
    const g = (this.g = new THREE.Group());
    const armor = new THREE.MeshStandardMaterial({ color: 0x6b6660, roughness: 0.5, metalness: 0.55, flatShading: true });
    const cloth = new THREE.MeshStandardMaterial({ color: 0x2c2a2e, roughness: 0.9 });
    const acc = new THREE.MeshStandardMaterial({ color, roughness: 0.7, emissive: color, emissiveIntensity: 0.25 });
    const steel = new THREE.MeshStandardMaterial({ color: 0xaab2c0, roughness: 0.3, metalness: 0.9, emissive: 0xff7a20, emissiveIntensity: 0 });
    this.steel = steel;
    const box = (p, m, w, h, d, x, y, z) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.castShadow = true; p.add(o); return o; };
    const piv = (p, x, y, z) => { const o = new THREE.Group(); o.position.set(x, y, z); p.add(o); return o; };
    this.bodyG = piv(g, 0, 0, 0);
    this.torso = piv(this.bodyG, 0, 0.95, 0);
    box(this.torso, armor, 0.52, 0.5, 0.3, 0, 0.42, 0); box(this.torso, cloth, 0.44, 0.24, 0.26, 0, 0.1, 0); box(this.torso, acc, 0.54, 0.1, 0.32, 0, 0.2, 0);
    box(this.torso, acc, 0.5, 0.75, 0.04, 0, 0.2, -0.19); // マント
    box(this.torso, armor, 0.24, 0.16, 0.3, -0.36, 0.64, 0); box(this.torso, armor, 0.24, 0.16, 0.3, 0.36, 0.64, 0);
    this.headG = piv(this.torso, 0, 0.72, 0);
    box(this.headG, armor, 0.27, 0.28, 0.29, 0, 0.14, 0); box(this.headG, cloth, 0.2, 0.07, 0.02, 0, 0.16, 0.15); box(this.headG, acc, 0.06, 0.2, 0.34, 0, 0.36, -0.03);
    this.legL = piv(this.bodyG, 0.14, 0.95, 0); box(this.legL, cloth, 0.19, 0.6, 0.21, 0, -0.3, 0); box(this.legL, armor, 0.21, 0.38, 0.24, 0, -0.76, 0.01);
    this.legR = piv(this.bodyG, -0.14, 0.95, 0); box(this.legR, cloth, 0.19, 0.6, 0.21, 0, -0.3, 0); box(this.legR, armor, 0.21, 0.38, 0.24, 0, -0.76, 0.01);
    this.armL = piv(this.torso, 0.34, 0.58, 0); box(this.armL, cloth, 0.14, 0.6, 0.15, 0, -0.3, 0);
    this.armR = piv(this.torso, -0.34, 0.58, 0); box(this.armR, cloth, 0.14, 0.6, 0.15, 0, -0.3, 0); box(this.armR, armor, 0.16, 0.24, 0.17, 0, -0.48, 0);
    this.swordG = piv(this.armR, 0, -0.6, 0.05); this.swordG.rotation.x = Math.PI / 2;
    if (weapon === 'bow') { box(this.swordG, cloth, 0.05, 1.5, 0.07, 0, 0.1, 0); box(this.swordG, steel, 0.015, 1.4, 0.015, 0, 0.1, -0.16); }
    else if (weapon === 'hammer') { box(this.swordG, cloth, 0.06, 1.4, 0.06, 0, 0.6, 0); box(this.swordG, armor, 0.52, 0.34, 0.34, 0, 1.3, 0); box(this.swordG, steel, 0.54, 0.08, 0.36, 0, 1.3, 0); }
    else if (weapon === 'dual') {
      this.sword2 = piv(this.armL, 0, -0.6, 0.05); this.sword2.rotation.x = Math.PI / 2 - 0.9;
      for (const sg of [this.swordG, this.sword2]) { box(sg, steel, 0.11, 0.85, 0.035, 0, 0.58, 0); box(sg, armor, 0.26, 0.06, 0.07, 0, 0.14, 0); box(sg, cloth, 0.05, 0.26, 0.05, 0, 0, 0); }
    } else { box(this.swordG, steel, 0.16, 1.35, 0.04, 0, 0.85, 0); box(this.swordG, armor, 0.38, 0.07, 0.08, 0, 0.16, 0); box(this.swordG, cloth, 0.05, 0.3, 0.05, 0, 0, 0); }
    // 名札
    const c = document.createElement('canvas'); c.width = 256; c.height = 64; const x = c.getContext('2d');
    x.font = '700 30px "Zen Kaku Gothic New", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.lineWidth = 6; x.strokeStyle = 'rgba(0,0,0,0.85)'; x.strokeText(name, 128, 32); x.fillStyle = color; x.fillText(name, 128, 32);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    this.label = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true, fog: false })); this.label.scale.set(2.2, 0.55, 1); this.label.position.y = 2.35; this.label.renderOrder = 10;
    g.add(this.label);
    scene.add(g);
    this.x = 0; this.z = 28; this.yaw = Math.PI; this.tx = 0; this.tz = 28; this.tyaw = Math.PI; this.pitch = 0;
    this.state = 'free'; this.st = 0; this.hp = 100; this.alive = true; this.run = 0; this.speed = 0; this.first = true; this.lv = 0; this.adur = 0.9;
  }
  apply(s) {
    this.tx = s[0]; this.tz = s[1]; this.tyaw = s[2]; this.pitch = s[3];
    const ns = STN[s[4]] || 'free';
    if (ns !== this.state || s[5] < this.st - 0.2) { this.state = ns; }
    this.st = s[5]; this.hp = s[6]; this.lv = s[7] || 0; this.adur = s[8] || 0.9;
    this.alive = this.state !== 'dead';
    if (this.first) { this.x = this.tx; this.z = this.tz; this.yaw = this.tyaw; this.first = false; }
  }
  update(dt) {
    const px = this.x, pz = this.z;
    this.x = damp(this.x, this.tx, this.k, dt); this.z = damp(this.z, this.tz, this.k, dt); this.yaw = dampAngle(this.yaw, this.tyaw, this.k, dt);
    this.st += dt;
    const sp = dt > 0 ? Math.hypot(this.x - px, this.z - pz) / dt : 0; this.speed = damp(this.speed, sp, 10, dt);
    this.run += this.speed * dt * 2.3;
    const g = this.g, s = this.state, t = this.st, mv = sat(this.speed / 5);
    g.position.set(this.x, 0, this.z); g.rotation.set(0, this.yaw, 0);
    let bx = 0, by = 0, torsoX = this.speed > 6 ? 0.25 : 0.06 * mv, armX = -0.5, armZ = 0, swX = Math.PI / 2 - 0.9, legA = Math.sin(this.run) * 0.75 * mv, armLX = -Math.sin(this.run) * 0.5 * mv, glow = 0;
    const swing = (t0, t1, a0, a1) => lerp(a0, a1, smooth(sat((t - t0) / (t1 - t0))));
    if (s === 'special') { armX = swing(0.75, 1.0, -3.2, -0.1); swX = 1.2; torsoX = swing(0.75, 1.0, -0.3, 0.6); glow = 4; }
    else if (s === 'light1') { armX = -1.3; armZ = swing(0.08, 0.3, -1.3, 1.2); swX = 1.5; }
    else if (s === 'light2') { armX = -1.3; armZ = swing(0.08, 0.3, 1.2, -1.3); swX = 1.5; }
    else if (s === 'light3') { armX = swing(0.15, 0.42, -3.0, -0.4); swX = 1.1; torsoX = swing(0.15, 0.42, -0.15, 0.4); }
    else if (s === 'charge') { armX = -2.9; swX = 0.7; torsoX = -0.12; glow = this.lv; }
    else if (s === 'heavy') { armX = swing(0.1, 0.36, -3.1, -0.2); swX = 1.2; torsoX = swing(0.1, 0.36, -0.2, 0.5); glow = 3 * (1 - sat(t / 0.5)); }
    else if (s === 'counter') { armX = swing(0.05, 0.3, -0.3, -2.8); armZ = swing(0.05, 0.3, 0.8, -0.6); swX = 1.3; }
    else if (s === 'guard') { armX = -1.25; armZ = 0.9; swX = 0.3; torsoX = 0.12; }
    else if (s === 'dodge') { bx = sat(t / 0.5) * TAU; by = 0.45 * Math.sin(sat(t / 0.5) * Math.PI); legA = 0; torsoX = 0.6; }
    else if (s === 'drink') { armLX = -2.3; }
    else if (s === 'hurt' || s === 'bounce') { torsoX = -0.3; }
    else if (s === 'stunned') { torsoX = 0.5; armX = -2.2; armLX = -2.2; }
    else if (s === 'knock' || s === 'dead') { bx = -Math.PI / 2 * easeOut(sat(t / 0.4)) * (s === 'knock' ? 1 - smooth(sat((t - 0.9) / 0.35)) : 1); by = 0.25 * sat(t / 0.4); legA = 0; }
    if (this.ranged && (s.startsWith('light') || s === 'heavy' || s === 'charge' || s === 'counter' || s === 'special')) { armX = -1.5; armZ = 0; swX = 0; torsoX = 0; glow = s === 'charge' ? this.lv : 0; }
    this.bodyG.rotation.x = bx; this.bodyG.position.y = by + Math.abs(Math.sin(this.run)) * 0.05 * mv;
    this.torso.rotation.x = damp(this.torso.rotation.x, torsoX, 16, dt);
    this.headG.rotation.x = clamp(-this.pitch * 0.6, -0.6, 0.6);
    this.armR.rotation.x = damp(this.armR.rotation.x, armX, 30, dt); this.armR.rotation.z = damp(this.armR.rotation.z, armZ, 30, dt);
    this.swordG.rotation.x = damp(this.swordG.rotation.x, swX, 20, dt);
    const atk = s.startsWith('light') || s === 'heavy' || s === 'charge' || s === 'counter';
    this.armL.rotation.x = damp(this.armL.rotation.x, this.dual && atk ? armX : armLX, this.dual && atk ? 30 : 14, dt);
    if (this.sword2) this.sword2.rotation.x = this.swordG.rotation.x;
    this.legL.rotation.x = legA; this.legR.rotation.x = -legA;
    this.steel.emissiveIntensity = damp(this.steel.emissiveIntensity, glow * 0.9, 10, dt);
    this.label.material.opacity = this.alive ? 1 : 0.4;
  }
  dispose() { this.scene.remove(this.g); }
}
