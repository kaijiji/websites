// 灰角竜グラヴァルド：モデル（プリミティブ組み立て）、手続きアニメーション、AI、攻撃判定
import * as THREE from 'three';
import { BOSS, ARENA_R } from './config.js';
import { clamp, lerp, sat, smooth, easeOut, easeIn, seg, angDiff, turnToward, damp, dampAngle, rand, pick, weightedPick, TAU } from './util.js';

export const ACTIONS = ['idle', 'intro', 'roar', 'bite', 'claw', 'tailspin', 'charge', 'skid', 'crash', 'leap', 'breath', 'fireballs', 'eruption', 'flinch', 'topple', 'stunned', 'death'];
const V = new THREE.Vector3();

const BASE_POSE = {
  bodyY: 0, bodyZ: 0, bodyPitch: 0, bodyYaw: 0, bodyRoll: 0, neckPitch: -0.32, neckYaw: 0, headPitch: 0.34, headYaw: 0, headRoll: 0, jaw: 0.06,
  tailYaw: 0, tailPitch: 0.05, tailWave: 1, spin: 0, rootRoll: 0, rootPitch: 0,
  fl: 0, fr: 0, bl: 0, br: 0, flL: 0, frL: 0, blL: 0, brL: 0, glow: 0,
};

// ---------------------------------------------------------------- モデル
function buildModel(b) {
  const hide = new THREE.MeshStandardMaterial({ color: 0x322c29, roughness: 0.82, metalness: 0.05, flatShading: true });
  const plate = new THREE.MeshStandardMaterial({ color: 0x5a5049, roughness: 0.7, metalness: 0.1, flatShading: true });
  const bone = new THREE.MeshStandardMaterial({ color: 0xc9bea6, roughness: 0.55, flatShading: true });
  const magma = new THREE.MeshStandardMaterial({ color: 0x1a0500, emissive: 0xe03a0c, emissiveIntensity: 1.4, roughness: 0.6, flatShading: true });
  const eye = new THREE.MeshBasicMaterial({ color: 0xffd870, fog: false });
  b.mats = { hide, plate, bone, magma, eye };
  const icoG = new THREE.IcosahedronGeometry(1, 1), boxG = new THREE.BoxGeometry(1, 1, 1), coneG = new THREE.ConeGeometry(1, 1, 5);
  const add = (parent, geo, mat, x, y, z, sx, sy, sz, rx = 0, ry = 0, rz = 0) => {
    const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.scale.set(sx, sy, sz); m.rotation.set(rx, ry, rz);
    m.castShadow = true; parent.add(m); return m;
  };
  const grp = (parent, x, y, z) => { const g = new THREE.Group(); g.position.set(x, y, z); parent.add(g); return g; };
  const spike = (parent, x, y, z, r, h, rx = 0, rz = 0, mat = bone) => add(parent, coneG, mat, x, y, z, r, h, r, rx, 0, rz);

  const root = new THREE.Group(); b.root = root;
  const body = grp(root, 0, 2.7, 0); b.body = body;
  // 胴
  add(body, icoG, hide, 0, 0.1, 1.3, 1.8, 1.7, 2.15);
  add(body, icoG, hide, 0, -0.05, -0.9, 1.6, 1.45, 2.0);
  add(body, icoG, hide, 0, 0.0, -2.4, 1.42, 1.35, 1.55);
  add(body, icoG, magma, 0, -0.72, -0.1, 1.18, 0.95, 2.7);   // 腹の溶岩光
  add(body, icoG, magma, 0, -0.55, 2.0, 0.7, 0.75, 0.9);       // 喉元
  // 背甲と背びれ
  for (let i = 0; i < 8; i++) {
    const z = 2.5 - i * 0.78, w = 1.9 - Math.abs(i - 2.5) * 0.2, y = 1.42 + Math.sin((i / 7) * Math.PI) * 0.32 - (i > 5 ? 0.25 : 0);
    add(body, boxG, plate, 0, y, z, w, 0.5, 0.95, 0.12 * (i % 2 ? 1 : -1), 0, 0);
    spike(body, 0, y + 0.75 - Math.abs(i - 3) * 0.06, z, 0.3, 1.5 - Math.abs(i - 3) * 0.14, -0.35);
    add(body, boxG, magma, 0, y - 0.18, z - 0.4, w * 0.85, 0.16, 0.2);
  }
  for (const s of [-1, 1]) { // 肩と腰の装甲
    add(body, icoG, plate, s * 1.55, 0.75, 1.5, 0.95, 0.9, 1.25, 0, 0, s * -0.4);
    spike(body, s * 2.0, 1.4, 1.5, 0.32, 1.3, 0, s * -0.9);
    add(body, icoG, plate, s * 1.3, 0.6, -2.3, 0.8, 0.8, 1.0, 0, 0, s * -0.4);
  }
  // 首〜頭
  const neck0 = grp(body, 0, 0.55, 2.9); b.neck0 = neck0;
  add(neck0, icoG, hide, 0, 0, 0.55, 0.98, 0.95, 1.05);
  add(neck0, boxG, plate, 0, 0.72, 0.5, 1.1, 0.35, 0.9);
  const neck1 = grp(neck0, 0, 0, 1.2); b.neck1 = neck1;
  add(neck1, icoG, hide, 0, 0, 0.55, 0.85, 0.82, 1.0);
  add(neck1, boxG, plate, 0, 0.62, 0.5, 0.95, 0.3, 0.8);
  const head = grp(neck1, 0, 0, 1.2); b.head = head;
  add(head, icoG, hide, 0, 0.08, 0.6, 0.95, 0.8, 1.05);
  add(head, new THREE.CylinderGeometry(0.4, 0.74, 1.6, 5), hide, 0, -0.02, 1.75, 1, 1, 0.82, Math.PI / 2, 0, 0);
  add(head, boxG, plate, 0, 0.62, 0.75, 1.5, 0.3, 1.3, 0.12);
  add(head, boxG, plate, 0, 0.4, 1.9, 0.6, 0.22, 1.0, 0.1);
  spike(head, 0, 0.75, 2.2, 0.2, 0.9, 0.5); // 鼻角
  for (const s of [-1, 1]) {
    add(head, new THREE.SphereGeometry(0.13, 8, 6), eye, s * 0.62, 0.3, 1.1, 1, 1, 1);
    add(head, boxG, plate, s * 0.66, 0.45, 1.05, 0.25, 0.14, 0.5, 0, 0, s * 0.3);
    // 大角：3節でねじれて前へ
    const h0 = grp(head, s * 0.75, 0.6, 0.35); h0.rotation.set(-0.5, 0, s * -1.05);
    add(h0, new THREE.CylinderGeometry(0.3, 0.42, 1.2, 6), bone, 0, 0.6, 0, 1, 1, 1);
    const h1 = grp(h0, 0, 1.2, 0); h1.rotation.set(0.75, 0, s * 0.55);
    add(h1, new THREE.CylinderGeometry(0.2, 0.3, 1.2, 6), bone, 0, 0.6, 0, 1, 1, 1);
    const h2 = grp(h1, 0, 1.2, 0); h2.rotation.set(0.7, 0, s * 0.3);
    add(h2, coneG, bone, 0, 0.7, 0, 0.2, 1.4, 0.2);
    if (s === 1) { b.hornTip = h1; b.hornStub = h0; }
    for (let i = 0; i < 5; i++) spike(head, s * (0.52 - i * 0.05), -0.32, 1.25 + i * 0.26, 0.07, 0.3, Math.PI); // 上顎の牙
  }
  const jaw = grp(head, 0, -0.32, 0.5); b.jaw = jaw;
  add(jaw, new THREE.CylinderGeometry(0.32, 0.62, 1.7, 5), hide, 0, -0.2, 1.0, 1, 1, 0.5, Math.PI / 2, 0, 0);
  add(jaw, boxG, magma, 0, 0.02, 0.9, 0.7, 0.1, 1.4);
  for (const s of [-1, 1]) for (let i = 0; i < 4; i++) spike(jaw, s * (0.45 - i * 0.06), 0.1, 0.9 + i * 0.3, 0.07, 0.28);
  b.mouth = grp(head, 0, -0.25, 2.3);
  // 尾
  b.tail = [];
  let tp = grp(body, 0, 0.05, -3.5);
  for (let i = 0; i < 6; i++) {
    const r0 = 0.92 - i * 0.11, r1 = 0.92 - (i + 1) * 0.11;
    if (i === 3) { const tip = new THREE.Group(); tp.add(tip); b.tailTip = tip; b.tailCutParent = tp; tp = tip; }
    b.tail.push(tp);
    add(tp, new THREE.CylinderGeometry(r0, r1, 1.3, 6), hide, 0, 0, -0.62, 1, 1, 1, Math.PI / 2);
    add(tp, boxG, plate, 0, r0 * 0.8, -0.6, r0 * 1.3, 0.22, 0.9);
    if (i % 2 === 0) spike(tp, 0, r0 + 0.35, -0.6, 0.18, 0.8, -0.3);
    if (i === 5) { // 尾の先の棘鎚
      add(tp, icoG, plate, 0, 0, -1.5, 0.85, 0.7, 0.95);
      add(tp, icoG, magma, 0, 0, -1.5, 0.6, 0.75, 0.7);
      for (let k = 0; k < 6; k++) { const a = (k / 6) * TAU; spike(tp, Math.cos(a) * 0.75, Math.sin(a) * 0.6, -1.6, 0.16, 0.8, 0, a - Math.PI / 2); }
      spike(tp, 0, 0, -2.5, 0.2, 1.0, -Math.PI / 2);
    }
    tp = grp(tp, 0, 0, -1.25);
  }
  b.tailCutStub = add(b.tailCutParent, icoG, magma, 0, 0, 0.02, 0.5, 0.5, 0.2); b.tailCutStub.visible = false;
  // 脚
  b.legs = {};
  const L1 = 1.4, L2 = 1.25;
  for (const [name, x, z, front] of [['fl', 1.5, 1.55, true], ['fr', -1.5, 1.55, true], ['bl', 1.38, -2.25, false], ['br', -1.38, -2.25, false]]) {
    const g = grp(root, x, 2.83, z);
    const k = front ? 1.12 : 1;
    add(g, icoG, hide, 0, -0.35, 0, 0.72 * k, 0.95, 0.85 * k);
    add(g, new THREE.CylinderGeometry(0.5 * k, 0.36 * k, L1, 6), hide, 0, -L1 / 2, 0, 1, 1, 1);
    add(g, boxG, plate, Math.sign(x) * 0.42, -0.5, 0, 0.3, 0.9, 0.8);
    const knee = grp(g, 0, -L1, 0);
    add(knee, new THREE.CylinderGeometry(0.36 * k, 0.3 * k, L2, 6), hide, 0, -L2 / 2, 0, 1, 1, 1);
    add(knee, icoG, plate, 0, 0, front ? 0.1 : -0.1, 0.42, 0.42, 0.42);
    const foot = grp(knee, 0, -L2, 0);
    add(foot, boxG, hide, 0, -0.12, 0.25, 0.95 * k, 0.36, 1.25 * k);
    for (let c = -1; c <= 1; c++) spike(foot, c * 0.3 * k, -0.15, 1.05 * k, 0.12, 0.6, Math.PI / 2);
    b.legs[name] = { g, knee, foot, front };
  }
  // 胸の光
  b.light = new THREE.PointLight(0xff5a1c, 60, 26, 1.8); b.light.position.set(0, 2.2, 1.0); root.add(b.light);

  // 当たり判定の球（部位）
  const S = (part, node, x, y, z, r, extra = {}) => ({ part, node, off: new THREE.Vector3(x, y, z), r, pos: new THREE.Vector3(), on: true, ...extra });
  b.spheres = [
    S('head', head, 0, 0.1, 1.2, 1.3),
    S('body', neck1, 0, 0, 0.3, 0.95),
    S('body', body, 0, 0, 1.4, 1.75, { solid: 1.45 }),
    S('body', body, 0, -0.1, -0.7, 1.6, { solid: 1.35 }),
    S('body', body, 0, 0, -2.3, 1.45, { solid: 1.15 }),
    S('back', body, 0, 1.6, 0.2, 1.3),
    S('tail', b.tail[0], 0, 0, -0.6, 0.95),
    S('tail', b.tail[2], 0, 0, -0.3, 0.8),
    S('tail', b.tail[3], 0, 0, -0.9, 0.8, { tip: true }),
    S('tail', b.tail[5], 0, 0, -1.2, 0.95, { tip: true }),
  ];
  for (const k of ['fl', 'fr', 'bl', 'br']) {
    b.spheres.push(S('leg', b.legs[k].knee, 0, 0, 0, 0.72), S('leg', b.legs[k].foot, 0, 0.1, 0.2, 0.72));
  }
}

// ---------------------------------------------------------------- 攻撃ごとの定義
// pose: 姿勢 / move: ホストでの移動 / cues: 全員で鳴らす演出 / host: ホストだけが行う処理 / hits: 攻撃判定
const A = {};
A.idle = { dur: Infinity, pose() {} };

A.intro = {
  dur: 1.4,
  pose(b, t, P) { P.neckPitch = -0.1; P.headPitch = 0.5; P.bodyY = -0.2 * Math.sin(t * 2); },
  next: 'roar',
};

A.roar = {
  dur: 3.0,
  pose(b, t, P) {
    const up = smooth(seg(t, 0, 0.55)) * (1 - smooth(seg(t, 2.3, 2.9))), r = seg(t, 0.6, 2.3) > 0 && t < 2.3 ? 1 : 0;
    P.bodyPitch = -0.2 * up; P.bodyY = 0.25 * up - 0.35 * smooth(seg(t, 0, 0.3)) * (1 - smooth(seg(t, 0.3, 0.6)));
    P.neckPitch = lerp(-0.32, -0.95, up); P.headPitch = lerp(0.34, -0.25, up); P.jaw = 0.1 + 0.85 * smooth(seg(t, 0.5, 0.7)) * (1 - smooth(seg(t, 2.25, 2.5)));
    P.headRoll = r * Math.sin(t * 38) * 0.05; P.neckYaw = r * Math.sin(t * 2.6) * 0.35; P.tailPitch = 0.35 * up; P.glow = up;
    P.flL = 0.5 * up * (Math.sin(t * 1.5) > 0 ? 1 : 0.2);
  },
  cues: [[0.58, (b) => { b.env.audio.play('roar', 1, b.distLocal()); b.env.fx.ring(b.x, b.z, 0, 30, 24, 0xffd9a0); }]],
  frame(b, t, dt) { if (t > 0.6 && t < 2.3) b.env.shake(dt * 2.6, b.x, b.z, 60); },
  hits(b, t, out) { if (t > 0.62 && t < 0.82) out.push({ id: 'r', kind: 'circle', x: b.x, z: b.z, r: 21, dmg: 0, kb: 0, roar: true }); },
};

A.bite = {
  dur: 1.95, track: 0.52, turn: 2.4,
  pose(b, t, P) {
    const w = smooth(seg(t, 0, 0.6)), l = easeOut(seg(t, 0.64, 0.8)), rc = smooth(seg(t, 1.25, 1.9));
    P.neckPitch = lerp(lerp(-0.32, -0.85, w), 0.42, l); P.neckPitch = lerp(P.neckPitch, -0.32, rc);
    P.headPitch = lerp(lerp(0.34, 0.0, w), 0.25, l); P.headPitch = lerp(P.headPitch, 0.34, rc);
    P.jaw = lerp(0.06, 0.8, w) * (1 - easeOut(seg(t, 0.74, 0.84))) + 0.06;
    P.bodyPitch = lerp(-0.1 * w, 0.2, l) * (1 - rc); P.bodyZ = lerp(-0.5 * w, 1.2, l) * (1 - rc); P.bodyY = -0.45 * l * (1 - rc);
    P.neckYaw = Math.sin(t * 5) * 0.08 * w * (1 - l);
  },
  move(b, t, dt) { if (t > 0.64 && t < 0.82) b.advance(13 * dt); },
  cues: [[0.02, (b) => b.env.audio.play('snarl', 0.8, b.distLocal())], [0.66, (b) => b.env.audio.play('swingHeavy', 1, b.distLocal())], [0.82, (b) => { b.env.audio.play('guard', 0.6, b.distLocal()); }]],
  hits(b, t, out) { if (t > 0.66 && t < 0.9) { const s = b.spheres[0].pos; out.push({ id: 'b', kind: 'sphere', x: s.x, y: s.y, z: s.z, r: 1.95, dmg: 25, kb: 7, parryFlinch: true }); } },
};

A.claw = { // ap[0] = 左右 (+1/-1), ap[1] = 連撃なら1（予備動作が短い）
  dur: 1.7, track: 0.45, turn: 2.6,
  time(b, t) { return b.ap[1] ? t + 0.22 : t; },
  pose(b, t, P) {
    t = A.claw.time(b, t);
    const s = b.ap[0] || 1, w = smooth(seg(t, 0, 0.55)), sw = easeOut(seg(t, 0.6, 0.8)), rc = smooth(seg(t, 1.1, 1.7));
    const lift = w * (1 - sw), k = s > 0 ? 'fl' : 'fr';
    P[k + 'L'] = lift * 1.5; P[k] = lerp(-0.5 * w, 1.15, sw) * (1 - rc);
    P.bodyRoll = (-0.2 * w + 0.32 * sw) * s * (1 - rc); P.bodyYaw = (0.3 * w - 0.55 * sw) * s * (1 - rc);
    P.bodyPitch = (-0.12 * w + 0.2 * sw) * (1 - rc); P.bodyY = (0.25 * w - 0.4 * sw) * (1 - rc);
    P.neckYaw = -0.3 * s * w * (1 - rc); P.jaw = 0.4 * w * (1 - rc);
  },
  move(b, t, dt) { t = A.claw.time(b, t); if (t > 0.58 && t < 0.8) b.advance(8 * dt); },
  cues: [[0.36, (b) => b.env.audio.play('swingHeavy', 1, b.distLocal())], [0.6, (b) => { b.fwd(V, 3.2); V.y = 0.2; b.env.fx.dust(V, 20, 7); b.env.audio.play('step', 1, b.distLocal()); b.env.shake(0.35, b.x, b.z, 22); }]],
  hits(b, t, out) {
    t = A.claw.time(b, t);
    if (t > 0.6 && t < 0.86) out.push({ id: 'c', kind: 'arc', x: b.x + Math.sin(b.yaw) * 1.0, z: b.z + Math.cos(b.yaw) * 1.0, r: 6.2, ang: b.yaw - (b.ap[0] || 1) * 0.25, half: 1.3, dmg: 23, kb: 8, parryFlinch: true });
  },
};

A.tailspin = { // ap[0] = 回転方向
  dur: 2.35,
  pose(b, t, P) {
    const s = b.ap[0] || 1, w = smooth(seg(t, 0, 0.75)), sp = smooth(seg(t, 0.8, 1.55)), rc = smooth(seg(t, 1.6, 2.3));
    P.spin = s * TAU * sp;
    P.bodyY = -0.55 * w * (1 - rc); P.tailYaw = lerp(-0.42 * s * w, 0.3 * s, seg(t, 0.8, 1.0)) * (1 - seg(t, 1.45, 1.75));
    P.tailPitch = 0.05 + 0.02 * w; P.tailWave = 1 - w * (1 - rc);
    P.neckYaw = -0.8 * s * w * (1 - sp); P.headYaw = -0.4 * s * w * (1 - sp); P.bodyRoll = -0.14 * s * Math.sin(sp * Math.PI);
  },
  cues: [[0.05, (b) => b.env.audio.play('snarl', 0.7, b.distLocal())], [0.82, (b) => b.env.audio.play('swingHeavy', 1.4, b.distLocal())], [1.15, (b) => b.env.audio.play('swingHeavy', 1.2, b.distLocal())]],
  frame(b, t) { if (t > 0.8 && t < 1.55) { const s = b.spheres[b.tailCut ? 7 : 9].pos; V.set(s.x, 0.15, s.z); b.env.fx.dust(V, 2, 5); } },
  hits(b, t, out) {
    if (t > 0.8 && t < 1.57) {
      const a1 = b.yaw + b.P.spin + Math.PI;
      out.push({ id: 't', kind: 'sweep', x: b.x, z: b.z, r0: 1.5, r1: b.tailCut ? 7.4 : 11.6, a0: b._prevTailAng ?? a1, a1, dmg: 27, kb: 10 });
      b._prevTailAng = a1;
    } else b._prevTailAng = null;
  },
};

A.charge = {
  dur: 4.2, track: 0.95, turn: 3.2,
  pose(b, t, P) {
    const w = smooth(seg(t, 0, 0.9)), run = seg(t, 1.0, 1.2);
    P.neckPitch = lerp(-0.32, 0.5, w); P.headPitch = lerp(0.34, 0.75, w); P.bodyPitch = 0.14 * w; P.bodyY = -0.35 * w + run * Math.abs(Math.sin(b.walkPhase)) * 0.3;
    P.tailPitch = 0.4 * w; P.glow = w * 0.6;
    if (t < 1.0) { P.flL = Math.max(0, Math.sin(t * 13)) * 0.9 * w; P.fl = -0.3 * P.flL; } // 前脚で地面を掻く
  },
  move(b, t, dt) {
    if (t < 1.0) return;
    const sp = BOSS.run * smooth(seg(t, 1.0, 1.35)) * b.speedMul;
    const tg = b.targetPos();
    if (tg) b.yaw = turnToward(b.yaw, Math.atan2(tg.x - b.x, tg.z - b.z), (t < 1.7 ? 0.75 : 0.18) * dt);
    b.advance(sp * dt, true);
    b.ap[2] = (b.ap[2] || 0) + sp * dt;
    const r = Math.hypot(b.x, b.z);
    if (r > ARENA_R - 3.2 && b.x * Math.sin(b.yaw) + b.z * Math.cos(b.yaw) > 0) return b.start('crash');
    if (b.ap[2] > 36 || t > 3.8) return b.start('skid');
    if (tg) { // 通り過ぎたら止まる
      const dx = tg.x - b.x, dz = tg.z - b.z;
      if (dx * Math.sin(b.yaw) + dz * Math.cos(b.yaw) < -7 && t > 1.6) return b.start('skid');
    }
  },
  cues: [[0.05, (b) => b.env.audio.play('snarl', 1, b.distLocal())], [0.3, (b) => b.pawFx()], [0.62, (b) => b.pawFx()], [0.98, (b) => b.env.audio.play('roar', 0.5, b.distLocal())]],
  hits(b, t, out) {
    if (t > 1.05) {
      const h = b.spheres[0].pos, c = b.spheres[2].pos;
      out.push({ id: 'ch', kind: 'circle', x: h.x, z: h.z, r: 2.0, dmg: 36, kb: 15, heavy: true });
      out.push({ id: 'ch', kind: 'circle', x: c.x, z: c.z, r: 2.5, dmg: 36, kb: 15, heavy: true });
    }
  },
  armor: true,
};

A.skid = {
  dur: 1.5,
  pose(b, t, P) { const k = 1 - smooth(seg(t, 0.2, 1.4)); P.bodyPitch = -0.16 * k; P.bodyY = -0.5 * k; P.neckPitch = lerp(-0.32, 0.2, k); P.fl = P.fr = -0.5 * k; P.bl = P.br = -0.4 * k; P.tailPitch = 0.4 * k; },
  move(b, t, dt) { b.advance(BOSS.run * 0.8 * Math.pow(1 - sat(t / 0.8), 2) * dt, true); },
  frame(b, t) { if (t < 0.7) { b.fwd(V, 2); V.y = 0.1; b.env.fx.dust(V, 3, 5); } },
  cues: [[0.0, (b) => b.env.audio.play('dodge', 1.6, b.distLocal())]],
};

A.crash = { // 外周の岩に角が刺さる＝大きな隙
  dur: 3.9,
  pose(b, t, P) {
    const k = 1 - smooth(seg(t, 3.1, 3.9)), st = t < 2.9 ? Math.sin(t * 9) : 0;
    P.neckPitch = lerp(-0.32, 0.3, k); P.headPitch = lerp(0.34, 0.5, k); P.bodyPitch = 0.1 * k; P.bodyY = -0.4 * k; P.bodyZ = 0.5 * k + st * 0.15 * k;
    P.bodyRoll = st * 0.06 * k; P.tailYaw = st * 0.4 * k; P.bl = st * 0.3 * k; P.br = -st * 0.3 * k; P.jaw = 0.3 * k;
  },
  cues: [[0.0, (b) => { b.env.audio.play('slam', 1.2, b.distLocal()); b.env.audio.play('crack', 1, b.distLocal()); b.env.shake(0.9, b.x, b.z, 45); b.fwd(V, 5.5); V.y = 2; b.env.fx.dust(V, 50, 10); b.env.fx.burst(V, 40, { speed: 12, life: 1.2, size: 0.6, color: [0.5, 0.45, 0.4], gravity: 16 }); }],
    [1.2, (b) => b.env.audio.play('snarl', 0.8, b.distLocal())], [2.4, (b) => b.env.audio.play('snarl', 0.9, b.distLocal())]],
};

A.leap = { // ap = [着地点x, 着地点z, 出発x, 出発z]
  dur: 3.0, track: 0.8, turn: 2.2,
  pose(b, t, P) {
    const cr = smooth(seg(t, 0, 0.8)), air = seg(t, 0.9, 1.75), land = t >= 1.75 ? 1 - smooth(seg(t, 1.75, 2.9)) : 0;
    P.bodyY = -0.95 * cr * (t < 0.9 ? 1 : 0) - 0.9 * land; P.tailPitch = 0.5 * cr * (1 - seg(t, 1.6, 1.9));
    if (air > 0 && air < 1) { P.bodyPitch = lerp(-0.42, 0.35, air); P.fl = P.fr = lerp(0.9, -0.7, air); P.bl = P.br = lerp(-0.9, 0.4, air); P.flL = P.frL = P.blL = P.brL = Math.sin(air * Math.PI) * 0.9; P.jaw = 0.5; P.neckPitch = -0.1; }
    P.neckPitch = lerp(P.neckPitch, 0.25, land); P.bodyPitch += 0.08 * land;
  },
  move(b, t, dt) {
    if (t < 0.8) { const tg = b.targetPos(); if (tg) { let dx = tg.x - b.x, dz = tg.z - b.z; const d = Math.hypot(dx, dz) || 1; const dd = clamp(d - 1.5, 3, 26); b.ap[0] = b.x + dx / d * dd; b.ap[1] = b.z + dz / d * dd; b.ap[2] = b.x; b.ap[3] = b.z; } }
    else if (t >= 0.9 && t < 1.75) {
      const f = seg(t, 0.9, 1.75);
      let x = lerp(b.ap[2], b.ap[0], f), z = lerp(b.ap[3], b.ap[1], f);
      const r = Math.hypot(x, z); if (r > ARENA_R - 4) { x *= (ARENA_R - 4) / r; z *= (ARENA_R - 4) / r; }
      b.x = x; b.z = z; b.y = Math.sin(f * Math.PI) * 7.5;
    } else b.y = 0;
  },
  cues: [[0.0, (b) => b.env.audio.play('snarl', 0.9, b.distLocal())], [0.88, (b) => { b.env.audio.play('swingHeavy', 1.5, b.distLocal()); V.set(b.x, 0.2, b.z); b.env.fx.dust(V, 30, 8); b.env.shake(0.3, b.x, b.z, 25); }],
    [1.75, (b) => { b.env.audio.play('slam', 1.4, b.distLocal()); b.env.shake(1.1, b.x, b.z, 55); V.set(b.x, 0.3, b.z); b.env.fx.dust(V, 70, 13); b.env.fx.burst(V, 60, { speed: 16, life: 0.9, size: 0.6, color: [1, 0.5, 0.1], color2: [1, 0.2, 0.05], dir: [0, 0.8, 0], spread: 1, gravity: 18, jitter: 4 }); }]],
  host: [[1.75, (b) => b.emit({ k: 'ring', x: b.x, z: b.z, sp: 17, r: 17, dmg: 20 })]],
  hits(b, t, out) { if (t > 1.72 && t < 1.86) out.push({ id: 'l', kind: 'circle', x: b.x, z: b.z, r: 4.6, dmg: 44, kb: 13, heavy: true }); },
  armor: true,
};

const breathSweep = (b, t) => (b.ap[0] || 1) * lerp(-1.0, 1.0, smooth(seg(t, 1.05, 2.95)));
A.breath = { // ap[0] = 薙ぎ払う向き
  dur: 3.7, track: 0.9, turn: 1.6,
  pose(b, t, P) {
    const inh = smooth(seg(t, 0, 0.9)), fire = t > 1.0 && t < 3.0 ? 1 : 0, rc = smooth(seg(t, 3.0, 3.7));
    const sw = fire ? breathSweep(b, t) : lerp((b.ap[0] || 1) * -1.0 * smooth(seg(t, 0.5, 1.0)), 0, 0) * (t < 1 ? 1 : 0) + (t >= 3 ? (b.ap[0] || 1) * (1 - rc) : 0);
    P.neckPitch = lerp(lerp(-0.32, -0.8, inh), 0.12, smooth(seg(t, 0.92, 1.1))); P.neckPitch = lerp(P.neckPitch, -0.32, rc);
    P.headPitch = lerp(0.34, 0.5, smooth(seg(t, 0.92, 1.1))) ; P.jaw = (0.3 * inh + 0.6 * fire) * (1 - rc) + 0.06;
    P.bodyYaw = sw * 0.25; P.neckYaw = sw * 0.5; P.headYaw = sw * 0.25; P.bodyY = 0.3 * inh * (1 - fire) - 0.3 * fire; P.bodyPitch = -0.1 * inh * (1 - fire) + 0.08 * fire;
    P.glow = Math.max(inh, fire) * (1 - rc); P.headRoll = fire * Math.sin(t * 40) * 0.02;
  },
  cues: [[0.02, (b) => b.env.audio.play('fireball', 1.2, b.distLocal())], [1.0, (b) => b.env.audio.play('roar', 0.45, b.distLocal())]],
  frame(b, t, dt) {
    const m = b.mouth.getWorldPosition(V);
    if (t < 0.95) { // 吸い込み
      const a = rand(TAU), r = rand(2, 5);
      b.env.fx.burst({ x: m.x + Math.cos(a) * r, y: m.y + rand(-1.5, 1.5), z: m.z + Math.sin(a) * r }, 2, { speed: 6, dir: [-Math.cos(a) * 1.2, 0, -Math.sin(a) * 1.2], spread: 0.1, life: 0.4, size: 0.4, color: [1, 0.6, 0.2], gravity: 0, drag: 0 });
    } else if (t > 1.0 && t < 3.0) {
      const ang = b.yaw + breathSweep(b, t), dx = Math.sin(ang), dz = Math.cos(ang);
      b.env.fx.burst(m, 6, { speed: 27, dir: [dx, -0.2, dz], spread: 0.16, life: 0.68, size: 2.4, color: [1, 0.75, 0.25], color2: [1, 0.25, 0.04], gravity: -3, drag: 0.6, jitter: 0.5 });
      b.env.fx.burst(m, 2, { speed: 20, dir: [dx, -0.15, dz], spread: 0.2, life: 1.0, size: 3.4, color: [0.3, 0.12, 0.06], gravity: -4, drag: 0.8 });
      b.env.shake(dt * 0.5, b.x, b.z, 30);
      b.env.audio.breath(true, clamp(1 / (1 + b.distLocal() * b.distLocal() / 500), 0.1, 1));
      b._breathing = true;
    }
    if ((t >= 3.0 || t < 1.0) && b._breathing) { b._breathing = false; b.env.audio.breath(false); }
  },
  hits(b, t, out) {
    if (t > 1.08 && t < 3.0) {
      const ang = b.yaw + breathSweep(b, t - 0.12);
      out.push({ id: 'f' + Math.floor((t - 1.08) / 0.3), kind: 'cone', x: b.x + Math.sin(ang) * 3.2, z: b.z + Math.cos(ang) * 3.2, ang, half: 0.2, len: 17, dmg: 14, kb: 2.5, fire: true, light: true });
    }
  },
  end(b) { if (b._breathing) { b._breathing = false; b.env.audio.breath(false); } },
};

A.fireballs = {
  dur: 2.7, track: 2.0, turn: 1.8,
  pose(b, t, P) {
    let k = 0; for (const s of [0.7, 1.15, 1.6]) k += smooth(seg(t, s - 0.25, s)) * (1 - easeOut(seg(t, s, s + 0.14)));
    const up = smooth(seg(t, 0, 0.5)) * (1 - smooth(seg(t, 2.0, 2.6)));
    P.neckPitch = lerp(-0.32, -0.7, up) + 0.45 * (1 - k) * up - 0.2 * up; P.headPitch = 0.1 + 0.3 * (1 - k); P.jaw = 0.1 + 0.7 * k; P.glow = up; P.bodyY = 0.2 * up; P.bodyPitch = -0.12 * up;
  },
  host: [0.7, 1.15, 1.6].map((s, i) => [s, (b) => {
    const ts = b.alivePlayers(); if (!ts.length) return;
    const p = ts.length > 1 ? ts[(i + (b.seq % 3)) % ts.length] : ts[0];
    const m = b.mouth.getWorldPosition(V);
    const lead = i === 0 ? 0 : 1; // 2発目以降は少し散らす
    b.emit({ k: 'ball', fx: +m.x.toFixed(2), fy: +m.y.toFixed(2), fz: +m.z.toFixed(2), x: +(p.x + rand(-1.6, 1.6) * lead).toFixed(2), z: +(p.z + rand(-1.6, 1.6) * lead).toFixed(2), t: 1.15, r: 3.7, dmg: 28 });
  }]),
  cues: [[0.0, (b) => b.env.audio.play('snarl', 0.9, b.distLocal())]],
};

A.eruption = {
  dur: 3.3,
  pose(b, t, P) {
    const up = smooth(seg(t, 0, 0.75)), dn = easeIn(seg(t, 0.8, 0.95)), rc = smooth(seg(t, 2.2, 3.2));
    const rear = up * (1 - dn);
    P.bodyPitch = -0.55 * rear + 0.15 * dn * (1 - rc); P.bodyY = 0.9 * rear - 0.5 * dn * (1 - rc); P.flL = P.frL = 1.2 * rear; P.fl = P.fr = -0.6 * rear;
    P.neckPitch = lerp(-0.32, -0.6, rear) + 0.5 * dn * (1 - rc); P.jaw = 0.6 * up * (1 - rc); P.tailPitch = 0.3 * up * (1 - rc); P.glow = up * (1 - rc);
  },
  cues: [[0.0, (b) => b.env.audio.play('roar', 0.6, b.distLocal())], [0.95, (b) => { b.env.audio.play('slam', 1.3, b.distLocal()); b.env.shake(1.0, b.x, b.z, 60); b.fwd(V, 3); V.y = 0.2; b.env.fx.dust(V, 50, 10); }]],
  host: [[0.95, (b) => {
    let i = 0;
    for (const p of b.alivePlayers()) {
      b.emit({ k: 'erupt', x: +p.x.toFixed(2), z: +p.z.toFixed(2), r: 3.3, d: 1.15, dmg: 30 });
      for (let n = 0; n < 4; n++) { const a = rand(TAU), r = rand(4, 11); b.emit({ k: 'erupt', x: +(p.x + Math.cos(a) * r).toFixed(2), z: +(p.z + Math.sin(a) * r).toFixed(2), r: 3.3, d: 1.3 + (i++) * 0.13, dmg: 30 }); }
    }
    for (let n = 0; n < 8; n++) { const a = (n / 8) * TAU + b.yaw; b.emit({ k: 'erupt', x: +(b.x + Math.cos(a) * 7.5).toFixed(2), z: +(b.z + Math.sin(a) * 7.5).toFixed(2), r: 3.0, d: 1.0 + n * 0.07, dmg: 30 }); }
  }]],
  armor: true,
};

A.flinch = {
  dur: 1.35,
  pose(b, t, P) { const k = easeOut(seg(t, 0, 0.18)) * (1 - smooth(seg(t, 0.7, 1.3))), s = b.ap[0] || 1; P.neckPitch = -0.32 - 0.5 * k; P.neckYaw = 0.7 * k * s; P.headRoll = 0.4 * k * s; P.bodyYaw = 0.15 * k * s; P.bodyZ = -0.7 * k; P.jaw = 0.6 * k; P.bodyY = -0.2 * k; },
  cues: [[0.0, (b) => b.env.audio.play('snarl', 1.1, b.distLocal())]],
};

A.topple = { // 転倒：頭が地面まで下りる最大のチャンス
  dur: 6.2,
  pose(b, t, P) {
    const s = b.ap[0] || 1, f = easeIn(seg(t, 0, 0.55)), up = smooth(seg(t, 5.2, 6.2)), k = f * (1 - up), th = t > 0.6 && t < 5.1 ? 1 : 0;
    P.rootRoll = s * 1.32 * k; P.bodyY = -1.45 * k; P.neckPitch = lerp(-0.32, 0.1, k); P.neckYaw = -s * 0.5 * k; P.headRoll = -s * 0.6 * k; P.jaw = 0.25 + 0.2 * Math.sin(t * 7) * th;
    const w = Math.sin(t * 6.5) * th * 0.5;
    P.fl = w; P.fr = -w * 0.8; P.bl = -w; P.br = w * 0.7; P.flL = P.frL = P.blL = P.brL = 0.5 * k; P.tailYaw = Math.sin(t * 3) * 0.3 * th; P.tailWave = 0.3;
  },
  cues: [[0.0, (b) => b.env.audio.play('snarl', 1.2, b.distLocal())], [0.52, (b) => { b.env.audio.play('slam', 1.2, b.distLocal()); b.env.shake(0.9, b.x, b.z, 50); V.set(b.x, 0.3, b.z); b.env.fx.dust(V, 60, 11); }], [5.2, (b) => b.env.audio.play('snarl', 0.9, b.distLocal())]],
  armor: true,
};

A.stunned = {
  dur: 4.6,
  pose(b, t, P) { const k = smooth(seg(t, 0, 0.5)) * (1 - smooth(seg(t, 3.9, 4.6))); P.neckPitch = lerp(-0.32, 0.55, k); P.headPitch = lerp(0.34, 0.3, k); P.neckYaw = Math.sin(t * 2.2) * 0.45 * k; P.headRoll = Math.sin(t * 2.2 + 1) * 0.3 * k; P.bodyY = -0.7 * k; P.jaw = 0.35 * k; P.bodyRoll = Math.sin(t * 1.6) * 0.06 * k; P.tailWave = 0.4; },
  cues: [[0.0, (b) => b.env.audio.play('snarl', 1.2, b.distLocal())]],
  armor: true,
};

A.death = {
  dur: 1e9,
  pose(b, t, P) {
    const st = seg(t, 0, 1.6), f = easeIn(seg(t, 1.6, 2.6));
    P.neckPitch = lerp(-0.32, -0.9, smooth(st)) * (1 - f) + 0.2 * f; P.jaw = 0.8 * (1 - f * 0.6); P.headRoll = Math.sin(t * 20) * 0.04 * (1 - f);
    P.bodyY = 0.3 * smooth(st) * (1 - f) - 1.5 * f; P.rootRoll = 1.25 * f; P.bodyPitch = -0.25 * smooth(st) * (1 - f);
    P.flL = P.frL = P.blL = P.brL = 0.4 * f; P.tailWave = 1 - f; P.glow = (1 - f) * (0.5 + 0.5 * Math.sin(t * 30)) - f * 1.2; P.neckYaw = 0.4 * f;
  },
  cues: [[0.0, (b) => b.env.audio.play('deathcry', 1.2, b.distLocal())], [2.5, (b) => { b.env.audio.play('slam', 1.5, b.distLocal()); b.env.shake(1.2, b.x, b.z, 80); V.set(b.x, 0.3, b.z); b.env.fx.dust(V, 90, 12); }]],
  armor: true,
};

// ---------------------------------------------------------------- 本体
export class Boss {
  constructor(scene, env) {
    this.scene = scene; this.env = env;
    buildModel(this);
    scene.add(this.root);
    this.P = { ...BASE_POSE }; this.fromP = { ...BASE_POSE }; this.tmpP = { ...BASE_POSE };
    this.reset(1);
  }

  reset(nPlayers) {
    this.x = 0; this.z = -6; this.y = 0; this.yaw = 0;
    this.maxHp = Math.round(BOSS.hp * BOSS.hpScale[clamp(nPlayers, 1, 4) - 1]); this.hp = this.maxHp;
    this.scale = BOSS.hpScale[clamp(nPlayers, 1, 4) - 1];
    this.phase = 1; this.speedMul = 1;
    this.action = 'idle'; this.t = 0; this.seq = 0; this.ap = [0, 0, 0, 0]; this.lastT = 0;
    this.cool = 1.5; this.lastAttack = ''; this.queue = [];
    this.headAcc = 0; this.legAcc = 0; this.tailAcc = 0; this.headTotal = 0; this.parryAcc = 0; this.flankT = 0; this.headN = 0; this.legN = 0;
    this.tailCut = false; this.hornBroken = false; this.dead = false; this.pendingRoar = false;
    this.aggro = {}; this.targetId = null; this.eruptCd = 0; this.active = false;
    this.walkPhase = 0; this.hitFlash = 0; this.sx = this.x; this.sz = this.z; this.syaw = 0; this.sy = 0;
    this.tailTip.visible = true; this.tailCutStub.visible = false; this.hornTip.visible = true;
    for (const s of this.spheres) s.on = true;
    if (this.severed) { this.scene.remove(this.severed); this.severed = null; }
    Object.assign(this.P, BASE_POSE); Object.assign(this.fromP, BASE_POSE);
    this._px = this.x; this._pz = this.z; this._pyaw = this.yaw; this._first = true; this._hostT = -1; this.walkAmp = 0;
    this.players = [];
    this.animate(0);
  }

  // ---- 補助
  distLocal() { const p = this.env.localPos(); return p ? Math.hypot(p.x - this.x, p.z - this.z) : 30; }
  fwd(out, d) { return out.set(this.x + Math.sin(this.yaw) * d, this.y, this.z + Math.cos(this.yaw) * d); }
  advance(d, free) {
    this.x += Math.sin(this.yaw) * d; this.z += Math.cos(this.yaw) * d;
    const r = Math.hypot(this.x, this.z), lim = ARENA_R - (free ? 2.2 : 3.5);
    if (r > lim) { this.x *= lim / r; this.z *= lim / r; }
  }
  pawFx() { this.fwd(V, 3); V.y = 0.15; this.env.fx.dust(V, 14, 6); this.env.audio.play('step', 0.7, this.distLocal()); }
  alivePlayers() { return this.players.filter((p) => p.alive); }
  targetPos() { return this.players.find((p) => p.id === this.targetId && p.alive) || this.alivePlayers()[0] || null; }
  emit(ev) { this.env.emit(ev); }

  start(name, ap) {
    const prev = A[this.action]; if (prev && prev.end) prev.end(this);
    Object.assign(this.fromP, this.P); this.fromP.spin = 0;
    this.action = name; this.t = 0; this.lastT = -1e-6; this.seq++; this._prevTailAng = null; this._hostT = -1;
    this.ap = ap ? [ap[0] || 0, ap[1] || 0, ap[2] || 0, ap[3] || 0] : [0, 0, 0, 0];
  }

  // ---- ホスト側 AI
  hostUpdate(dt, players) {
    this.players = players;
    if (!this.active) return;
    const act = A[this.action];
    this.t += dt;
    this.eruptCd -= dt;
    for (const k in this.aggro) this.aggro[k] *= Math.exp(-0.05 * dt);
    if (this.action === 'idle') { this.think(dt); return; }
    const tg = this.targetPos();
    if (act.track && this.t < act.track && tg) this.yaw = turnToward(this.yaw, Math.atan2(tg.x - this.x, tg.z - this.z), act.turn * this.speedMul * dt);
    const seq = this.seq;
    if (act.move) act.move(this, this.t, dt);
    if (seq !== this.seq) return; // move の中で別アクションへ移った
    if (act.host) for (const [ct, fn] of act.host) if (this._hostT < ct && this.t >= ct) fn(this);
    this._hostT = this.t;
    if (this.t >= act.dur) this.finish(act);
  }

  finish(act) {
    if (this.dead) return;
    if (act.next) { this._hostT = -1; return this.start(act.next); }
    if (this.pendingRoar) { this.pendingRoar = false; this._hostT = -1; return this.start('roar'); }
    if (this.queue.length) { const q = this.queue.shift(); this._hostT = -1; return this.start(q[0], q[1]); }
    this.cool = (this.phase === 1 ? rand(0.9, 1.5) : this.phase === 2 ? rand(0.55, 1.05) : rand(0.3, 0.75));
    this.pickTarget();
    this._hostT = -1;
    this.start('idle');
  }

  pickTarget() {
    const ps = this.alivePlayers(); if (!ps.length) { this.targetId = null; return; }
    let best = null, bs = -Infinity;
    for (const p of ps) {
      const d = Math.hypot(p.x - this.x, p.z - this.z);
      const s = (this.aggro[p.id] || 0) + 140 / (4 + d) + rand(0, 60) + (p.id === this.targetId ? -25 : 0);
      if (s > bs) { bs = s; best = p; }
    }
    this.targetId = best.id;
  }

  think(dt) {
    const tg = this.targetPos();
    if (!tg) { this.pickTarget(); return; }
    const dx = tg.x - this.x, dz = tg.z - this.z, d = Math.hypot(dx, dz), want = Math.atan2(dx, dz), da = angDiff(this.yaw, want);
    this.yaw = turnToward(this.yaw, want, BOSS.turn * this.speedMul * dt * (Math.abs(da) > 1.5 ? 1.5 : 1));
    if (d > 6.0 && Math.abs(da) < 1.0) this.advance(BOSS.walk * this.speedMul * dt * (d > 14 ? 1.5 : 1));
    if (Math.abs(da) > 1.1 && d < 8) this.flankT += dt; else this.flankT = Math.max(0, this.flankT - dt * 2);
    this.cool -= dt;
    if (this.cool > 0) return;
    // 後ろに誰かいるか
    let behind = false;
    for (const p of this.alivePlayers()) { const a = Math.abs(angDiff(this.yaw, Math.atan2(p.x - this.x, p.z - this.z))); if (a > 1.9 && Math.hypot(p.x - this.x, p.z - this.z) < (this.tailCut ? 7 : 10.5)) behind = true; }
    const ph = this.phase, o = [], ad = Math.abs(da);
    const push = (n, w, ap) => o.push({ n, w: w * (n === this.lastAttack ? 0.3 : 1), ap });
    const side = da > 0 ? 1 : -1;
    if (behind) push('tailspin', 5, [pick([1, -1])]);
    if (this.flankT > 1.3) push('tailspin', 6, [side]);
    if (d < 7 && ad < 0.95) { push('bite', 4); push('claw', 4, [side]); if (ph >= 2) push('combo', 4, [side]); push('tailspin', 1.2, [side]); if (ph >= 2) push('leap', 1); }
    if (d >= 7 && d < 22) { push('leap', 3); if (ad < 0.7) push('breath', d < 16 ? 3 : 1.5, [pick([1, -1])]); push('charge', d > 12 ? 3 : 1); if (ph >= 2) push('fireballs', 2.5); }
    if (d >= 22) { push('charge', 4); if (ph >= 2) push('fireballs', 3.5); push('leap', 1.5); }
    if (ph >= 3 && this.eruptCd <= 0) push('eruption', 3.5);
    if (!o.length) { if (ad > 1.4 && d < 9) push('tailspin', 1, [side]); else return; }
    const c = weightedPick(o);
    this.lastAttack = c.n;
    if (c.n === 'eruption') this.eruptCd = 18;
    this.flankT = 0;
    if (c.n === 'combo') { // 連続ひっかき→噛みつき
      this.queue.push(['claw', [-c.ap[0], 1]]);
      if (Math.random() < 0.6) this.queue.push(['bite']);
      return this.start('claw', c.ap);
    }
    this.start(c.n, c.ap);
  }

  // ホスト：ダメージを受ける。戻り値は全員へ配るイベントの配列
  applyHit(part, dmg, attackerId) {
    if (this.dead || !this.active) return;
    this.hp -= dmg;
    this.aggro[attackerId] = (this.aggro[attackerId] || 0) + dmg;
    const sc = this.scale, act = A[this.action], armored = act.armor || this.action === 'flinch';
    if (this.hp <= 0) { this.hp = 0; this.dead = true; this.queue.length = 0; this._hostT = -1; this.start('death'); this.emit({ k: 'dead' }); return; }
    const down = this.action === 'flinch' || this.action === 'topple' || this.action === 'stunned' || this.action === 'crash';
    if (part === 'head') {
      this.headTotal += dmg; if (!down) this.headAcc += dmg;
      const need = BOSS.headFlinch * sc * Math.pow(1.3, this.headN);
      if (!this.hornBroken && this.headTotal >= BOSS.hornBreak * sc) { this.hornBroken = true; this.emit({ k: 'break', p: 'horn', by: attackerId }); if (!down) this.headAcc = need; }
      if (this.headAcc >= need && !armored) { this.headAcc = 0; this.headN++; this.queue.length = 0; this.start('flinch', [pick([1, -1])]); }
    } else if (part === 'leg') {
      if (!down) this.legAcc += dmg;
      if (this.legAcc >= BOSS.legTopple * sc * Math.pow(1.25, this.legN) && !armored) { this.legAcc = 0; this.legN++; this.queue.length = 0; this.y = 0; this.start('topple', [pick([1, -1])]); this.emit({ k: 'topple', by: attackerId }); }
    } else if (part === 'tail') {
      this.tailAcc += dmg;
      if (!this.tailCut && this.tailAcc >= BOSS.tailCut * sc) { this.tailCut = true; this.emit({ k: 'break', p: 'tail', by: attackerId }); if (!armored) { this.queue.length = 0; this._hostT = -1; this.start('flinch', [1]); } }
    }
    const np = this.hp <= this.maxHp * 0.33 ? 3 : this.hp <= this.maxHp * 0.66 ? 2 : 1;
    if (np > this.phase) { this.phase = np; this.speedMul = np === 2 ? 1.12 : 1.22; this.pendingRoar = true; this.emit({ k: 'phase', p: np }); }
  }
  applyParry(attackerId, flinchOk) {
    if (this.dead) return;
    this.parryAcc++; this.aggro[attackerId] = (this.aggro[attackerId] || 0) + 80;
    const armored = A[this.action].armor;
    if (this.parryAcc >= BOSS.parryStun && !armored) { this.parryAcc = 0; this.queue.length = 0; this._hostT = -1; this.start('stunned'); this.emit({ k: 'stun', by: attackerId }); }
    else if (flinchOk && (this.action === 'bite' || this.action === 'claw')) { this.queue.length = 0; this._hostT = -1; this.start('flinch', [pick([1, -1])]); }
  }

  // ---- 通信
  snapshot() {
    return [+this.x.toFixed(2), +this.z.toFixed(2), +this.y.toFixed(2), +this.yaw.toFixed(3), ACTIONS.indexOf(this.action), this.seq, +this.t.toFixed(3),
      this.ap.map((v) => +(+v).toFixed(2)), Math.round(this.hp), this.phase, (this.tailCut ? 1 : 0) | (this.hornBroken ? 2 : 0) | (this.active ? 4 : 0) | (this.dead ? 8 : 0), this.maxHp];
  }
  applySnapshot(s) {
    this.sx = s[0]; this.sz = s[1]; this.sy = s[2]; this.syaw = s[3];
    const name = ACTIONS[s[4]];
    if (s[5] !== this.seq) { this.start(name, s[7]); this.seq = s[5]; this.t = s[6]; this.lastT = s[6] - 1e-6; if (this._first) { this.x = this.sx; this.z = this.sz; this.yaw = this.syaw; this.y = this.sy; this._first = false; } }
    else { if (Math.abs(this.t - s[6]) > 0.25) this.t = s[6]; this.ap = s[7]; }
    this.hp = s[8]; this.maxHp = s[11];
    if (s[9] !== this.phase) { this.phase = s[9]; }
    const fl = s[10];
    if ((fl & 1) && !this.tailCut) this.setTailCut(false);
    if ((fl & 2) && !this.hornBroken) this.setHornBroken(false);
    this.active = !!(fl & 4); this.dead = !!(fl & 8);
  }
  clientUpdate(dt) {
    this.t += dt;
    const k = this.action === 'charge' || this.action === 'leap' ? 22 : 12;
    this.x = damp(this.x, this.sx, k, dt); this.z = damp(this.z, this.sz, k, dt); this.y = damp(this.y, this.sy, 25, dt);
    this.yaw = dampAngle(this.yaw, this.syaw, 14, dt);
  }

  setTailCut(fx) {
    this.tailCut = true; this.tailTip.visible = false; this.tailCutStub.visible = true;
    for (const s of this.spheres) if (s.tip) s.on = false;
    // 切れた尾を地面に残す
    const tip = this.tailTip.clone(true); tip.visible = true;
    const wp = this.tailTip.getWorldPosition(new THREE.Vector3());
    const g = new THREE.Group(); g.add(tip); g.position.set(wp.x, 0.75, wp.z); g.rotation.set(0.1, this.yaw + this.P.spin + rand(-0.5, 0.5), 0.3);
    this.scene.add(g); this.severed = g;
    if (fx) { this.env.audio.play('crack', 1.3, this.distLocal()); this.env.fx.burst(wp, 60, { speed: 12, life: 0.9, size: 0.7, color: [1, 0.5, 0.1], color2: [1, 0.2, 0.05], gravity: 14 }); }
  }
  setHornBroken(fx) {
    this.hornBroken = true; this.hornTip.visible = false;
    if (fx) { const p = this.hornStub.getWorldPosition(new THREE.Vector3()); this.env.audio.play('crack', 1.3, this.distLocal()); this.env.fx.burst(p, 50, { speed: 11, life: 1.0, size: 0.5, color: [0.9, 0.85, 0.7], color2: [0.6, 0.55, 0.45], gravity: 16 }); }
  }

  // ---- 姿勢の計算（全員共通）
  animate(dt) {
    const act = A[this.action], P = this.tmpP, t = this.t;
    Object.assign(P, BASE_POSE);
    // 歩行サイクルは実際の移動量から
    const mdx = this.x - this._px, mdz = this.z - this._pz, moved = Math.hypot(mdx, mdz), turned = Math.abs(angDiff(this._pyaw, this.yaw));
    this._px = this.x; this._pz = this.z; this._pyaw = this.yaw;
    const sp = dt > 0 ? moved / dt : 0;
    const prevPhase = this.walkPhase;
    this.walkPhase += moved * (sp > 9 ? 0.5 : 0.78) + turned * 2.4;
    const amp = clamp(sp * 0.09 + (dt > 0 ? turned / dt : 0) * 0.16, 0, sp > 9 ? 0.85 : 0.55);
    this.walkAmp = damp(this.walkAmp || 0, amp, 10, dt);
    const wa = this.walkAmp, ph = this.walkPhase;
    if (wa > 0.02 && this.y < 0.1) {
      P.fl = Math.sin(ph) * wa; P.br = Math.sin(ph + 0.4) * wa; P.fr = Math.sin(ph + Math.PI) * wa; P.bl = Math.sin(ph + Math.PI + 0.4) * wa;
      P.flL = Math.max(0, Math.cos(ph)) * wa * 1.1; P.brL = Math.max(0, Math.cos(ph + 0.4)) * wa; P.frL = Math.max(0, Math.cos(ph + Math.PI)) * wa * 1.1; P.blL = Math.max(0, Math.cos(ph + Math.PI + 0.4)) * wa;
      P.bodyY += Math.sin(ph * 2) * 0.12 * wa; P.bodyRoll = Math.sin(ph) * 0.07 * wa; P.neckYaw = Math.sin(ph) * 0.1 * wa; P.tailYaw = -Math.sin(ph) * 0.2 * wa;
      // 足音
      if (dt > 0 && Math.floor(ph / Math.PI) !== Math.floor(prevPhase / Math.PI) && wa > 0.12) {
        const d = this.distLocal(); this.env.audio.play('step', 0.5 + wa * 0.7, d); this.env.shake(0.16 + wa * 0.3, this.x, this.z, 20);
        const leg = this.legs[Math.floor(ph / Math.PI) % 2 ? 'fl' : 'fr'].foot.getWorldPosition(V); V.y = 0.1; this.env.fx.dust(V, sp > 9 ? 14 : 6, sp > 9 ? 7 : 3);
      }
    }
    // 呼吸
    const tt = this.env.time();
    P.bodyY += Math.sin(tt * 1.6) * 0.05; P.neckPitch += Math.sin(tt * 1.6 + 0.6) * 0.025; P.jaw += Math.max(0, Math.sin(tt * 1.6)) * 0.04;
    act.pose(this, t, P);
    // 前の姿勢からなめらかに
    const k = smooth(sat(t / 0.2));
    for (const key in P) this.P[key] = key === 'spin' ? P.spin : lerp(this.fromP[key], P[key], k);
    // 演出の合図
    if (dt > 0) {
      if (act.cues) for (const [ct, fn] of act.cues) if (this.lastT < ct && t >= ct) fn(this);
      if (act.frame) act.frame(this, t, dt);
    }
    this.lastT = t;
    this.applyPose(dt, tt);
  }

  applyPose(dt, tt) {
    const P = this.P, r = this.root;
    r.position.set(this.x, this.y, this.z); r.rotation.set(P.rootPitch, this.yaw + P.spin, P.rootRoll, 'YXZ');
    this.body.position.set(0, 2.7 + P.bodyY, P.bodyZ); this.body.rotation.set(P.bodyPitch, P.bodyYaw, P.bodyRoll);
    this.neck0.rotation.set(P.neckPitch * 0.5, P.neckYaw * 0.5, 0); this.neck1.rotation.set(P.neckPitch * 0.5, P.neckYaw * 0.5, 0);
    this.head.rotation.set(P.headPitch, P.headYaw, P.headRoll); this.jaw.rotation.x = P.jaw;
    for (let i = 0; i < 6; i++) {
      const tl = this.tail[i];
      tl.rotation.y = P.tailYaw * (0.5 + i * 0.12) + Math.sin(tt * 1.4 - i * 0.7) * 0.09 * P.tailWave * (1 + i * 0.3);
      tl.rotation.x = (i === 0 ? -0.22 : 0.07) + P.tailPitch * (i < 3 ? 0.5 : 0.25) + Math.sin(tt * 1.1 - i * 0.5) * 0.02 * P.tailWave;
    }
    // 脚：しゃがみ量からひざの曲げを決めて、足裏が地面に残るようにする
    const drop = clamp(P.bodyY, -1.5, 0.6) * 0.85;
    for (const k of ['fl', 'fr', 'bl', 'br']) {
      const L = this.legs[k], lift = P[k + 'L'];
      const cosb = clamp((2.53 + drop) / 2.65, 0.3, 1);
      const bend = Math.acos(cosb) + lift * 0.55, sgn = L.front ? -1 : 1;
      L.g.position.y = 2.83 + drop;
      const up = -P[k] + sgn * bend;
      L.g.rotation.x = up; L.knee.rotation.x = -sgn * bend * 2; L.foot.rotation.x = -(up - sgn * bend * 2) * 0.8;
    }
    // 発光
    this.hitFlash = Math.max(0, this.hitFlash - dt * 9);
    const rage = this.phase - 1;
    const glow = 1.15 + rage * 0.8 + Math.sin(tt * 3.2) * 0.25 + P.glow * 2.6 + this.hitFlash * 2;
    this.mats.magma.emissiveIntensity = Math.max(0.05, this.dead ? glow * 0.4 : glow);
    this.mats.hide.emissive.setRGB(this.hitFlash * 0.5 + rage * 0.02, this.hitFlash * 0.2, this.hitFlash * 0.08);
    this.light.intensity = Math.max(0, (45 + rage * 40 + P.glow * 150) * (this.dead ? 0.2 : 1));
    this.mats.eye.color.setHex(this.dead ? 0x221a10 : rage >= 1 ? 0xff5030 : 0xffd870);
    // 判定球の位置を更新
    r.updateMatrixWorld(true);
    for (const s of this.spheres) s.pos.copy(s.off).applyMatrix4(s.node.matrixWorld);
  }

  // ---- 判定
  // プレイヤーの斬撃がどの部位に当たるか
  queryHit(origin, dir, reach, cone) {
    let best = null, bs = 1e9;
    for (const s of this.spheres) {
      if (!s.on) continue;
      V.copy(s.pos).sub(origin);
      const d = V.length(); if (d - s.r > reach) continue;
      const ang = Math.acos(clamp(V.dot(dir) / (d || 1e-6), -1, 1)), angR = d <= s.r ? Math.PI : Math.asin(s.r / d);
      const off = Math.max(0, ang - angR); if (off > cone) continue;
      const score = off * 3 + Math.max(0, d - s.r) * 0.06;
      if (score < bs) { bs = score; best = s; }
    }
    if (!best) return null;
    V.copy(best.pos).sub(origin);
    const along = clamp(V.dot(dir) - best.r * 0.75, 0.6, reach);
    const pt = new THREE.Vector3().copy(dir).multiplyScalar(along).add(origin);
    pt.lerp(best.pos, 0.35);
    return { part: best.part, point: pt };
  }
  // 体へのめり込み防止
  pushOut(p, radius) {
    if (this.y > 1.5) return;
    for (const s of this.spheres) {
      if (!s.solid) continue;
      const dx = p.x - s.pos.x, dz = p.z - s.pos.z, d = Math.hypot(dx, dz), min = s.solid + radius;
      if (d < min && d > 1e-4) { p.x = s.pos.x + dx / d * min; p.z = s.pos.z + dz / d * min; }
    }
  }
  // いま有効な攻撃判定のうち、位置 p に当たっているものを返す
  hitsOn(p, radius, out) {
    out.length = 0;
    if (!this.active || this.dead) return out;
    const act = A[this.action]; if (!act.hits) return out;
    const list = this._hl || (this._hl = []); list.length = 0;
    act.hits(this, this.t, list);
    for (const h of list) {
      let ok = false;
      const dx = p.x - h.x, dz = p.z - h.z, d = Math.hypot(dx, dz);
      if (h.kind === 'circle') ok = d < h.r + radius;
      else if (h.kind === 'sphere') ok = d < h.r + radius && Math.abs(1.0 - h.y) < h.r + 1.4;
      else if (h.kind === 'arc') ok = d < h.r + radius && Math.abs(angDiff(h.ang, Math.atan2(dx, dz))) < h.half;
      else if (h.kind === 'cone') ok = d < h.len && Math.abs(angDiff(h.ang, Math.atan2(dx, dz))) < h.half + Math.atan2(radius + 0.7, Math.max(d, 1));
      else if (h.kind === 'sweep') {
        if (d > h.r0 && d < h.r1 + radius) {
          const pa = Math.atan2(dx, dz), span = angDiff(h.a0, h.a1), rel = angDiff(h.a0, pa), m = 0.16;
          ok = span >= 0 ? rel > -m && rel < span + m : rel < m && rel > span - m;
        }
      }
      if (ok) { h.key = this.seq + ':' + h.id; h.fromX = this.x; h.fromZ = this.z; out.push(h); }
    }
    return out;
  }
}

// ---------------------------------------------------------------- 設置型の攻撃（衝撃波・火球・噴火）
export class Hazards {
  constructor(env) { this.env = env; this.list = []; this.n = 0; }
  clear() { this.list.length = 0; }
  spawn(ev) {
    const fx = this.env.fx, id = 'h' + (ev.id ?? this.n++);
    if (ev.k === 'ring') { fx.ring(ev.x, ev.z, 0, ev.sp, ev.r); fx.ring(ev.x, ev.z, -0.08, ev.sp, ev.r, 0xffc080); this.list.push({ ...ev, id, t: 0 }); }
    else if (ev.k === 'ball') {
      fx.ball(new THREE.Vector3(ev.fx, ev.fy, ev.fz), new THREE.Vector3(ev.x, 0.3, ev.z), ev.t); fx.marker(ev.x, ev.z, ev.r, ev.t);
      this.env.audio.play('fireball', 1, this.env.distTo(ev.fx, ev.fz));
      this.list.push({ ...ev, id, t: 0, d: ev.t });
    } else if (ev.k === 'erupt') { fx.marker(ev.x, ev.z, ev.r, ev.d); this.list.push({ ...ev, id, t: 0 }); }
  }
  // p: ローカルプレイヤーの位置。当たったら cb(hit)
  update(dt, p, radius, cb) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const h = this.list[i]; h.t += dt;
      const d = p ? Math.hypot(p.x - h.x, p.z - h.z) : 1e9;
      if (h.k === 'ring') {
        const R = h.t * h.sp;
        if (p && Math.abs(d - R) < 1.05 + radius && R > 3) cb({ key: h.id, dmg: h.dmg, kb: 7, fromX: h.x, fromZ: h.z });
        if (R >= h.r) this.list.splice(i, 1);
      } else if (h.t >= h.d) {
        this.env.fx.pillar(h.x, h.z, h.r);
        const dist = this.env.distTo(h.x, h.z);
        this.env.audio.play('explode', 1, dist); this.env.shake(0.5, h.x, h.z, 22);
        if (p && d < h.r + radius) cb({ key: h.id, dmg: h.dmg, kb: 9, fromX: h.x, fromZ: h.z, heavy: true, fire: true });
        this.list.splice(i, 1);
      }
    }
  }
}
