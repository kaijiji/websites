// 汎用の数学ヘルパー
export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const sat = (v) => clamp(v, 0, 1);
export const smooth = (t) => { t = sat(t); return t * t * (3 - 2 * t); };
export const easeOut = (t) => { t = sat(t); return 1 - (1 - t) * (1 - t) * (1 - t); };
export const easeIn = (t) => { t = sat(t); return t * t * t; };
// フレームレート非依存の減衰補間
export const damp = (a, b, k, dt) => lerp(a, b, 1 - Math.exp(-k * dt));
export const TAU = Math.PI * 2;
export function angDiff(a, b) { // a→b の最短角度差 (-π..π)
  let d = (b - a) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
}
export const dampAngle = (a, b, k, dt) => a + angDiff(a, b) * (1 - Math.exp(-k * dt));
export function turnToward(a, b, maxStep) {
  const d = angDiff(a, b);
  return a + clamp(d, -maxStep, maxStep);
}
// t が [a,b] を進む割合 (0..1)
export const seg = (t, a, b) => sat((t - a) / (b - a));
export const rand = (a = 1, b) => (b === undefined ? Math.random() * a : a + Math.random() * (b - a));
export const pick = (arr) => arr[(Math.random() * arr.length) | 0];
export function fmtTime(sec) {
  sec = Math.max(0, sec);
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60), cs = Math.floor((sec * 100) % 100);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
}
export function weightedPick(items) { // [{w, ...}]
  let sum = 0;
  for (const it of items) sum += it.w;
  let r = Math.random() * sum;
  for (const it of items) { r -= it.w; if (r <= 0) return it; }
  return items[items.length - 1];
}
// 数値だけを持つオブジェクト同士の補間
export function lerpObj(out, a, b, t) {
  for (const k in b) out[k] = lerp(a[k] ?? b[k], b[k], t);
  return out;
}
export const store = {
  get(key, def) { try { const v = localStorage.getItem(key); return v == null ? def : JSON.parse(v); } catch (e) { return def; } },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* 保存できなくても続行 */ } },
};
