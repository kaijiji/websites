// キーボード＋マウス / タッチ / ゲームパッドを1つの入力状態にまとめる
import { clamp } from './util.js';

const KEYMAP = {
  KeyW: 'up', ArrowUp: 'up', KeyS: 'down', ArrowDown: 'down', KeyA: 'left', ArrowLeft: 'left', KeyD: 'right', ArrowRight: 'right',
  ShiftLeft: 'sprint', ShiftRight: 'sprint', Space: 'dodge', KeyE: 'potion', KeyR: 'special', KeyC: 'special', KeyQ: 'guard', KeyF: 'attack',
  KeyV: 'view', KeyT: 'lock', Digit1: 'stamp1', Digit2: 'stamp2', Digit3: 'stamp3', Digit4: 'stamp4', KeyP: 'pause', Tab: 'pause',
};

export class Input {
  constructor(canvas, touchRoot) {
    this.canvas = canvas;
    this.enabled = false;         // ゲーム中のみ true
    this.sens = 1; this.invertY = false;
    this.isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    this.locked = false; this.lockFailed = false;
    this.held = {}; this._pressed = {}; this._released = {};
    this._lookX = 0; this._lookY = 0;
    this.move = { x: 0, y: 0 };
    this.stick = { id: null, ox: 0, oy: 0, x: 0, y: 0 };
    this._touches = new Map();
    this._padPrev = {};
    this.onPauseRequest = null;
    this._bindKeys(); this._bindMouse(); this._bindTouch(touchRoot);
  }

  _set(name, down) {
    if (down) { if (!this.held[name]) this._pressed[name] = true; this.held[name] = true; }
    else { if (this.held[name]) this._released[name] = true; this.held[name] = false; }
  }
  pressed(n) { return !!this._pressed[n]; }
  released(n) { return !!this._released[n]; }
  consume(n) { this._pressed[n] = false; }
  endFrame() { this._pressed = {}; this._released = {}; }
  clear() { this.held = {}; this._pressed = {}; this._released = {}; this._lookX = this._lookY = 0; this.stick.id = null; this.stick.x = this.stick.y = 0; this._touches.clear(); }
  consumeLook() { const r = { x: this._lookX, y: this.invertY ? -this._lookY : this._lookY }; this._lookX = this._lookY = 0; return r; }

  _bindKeys() {
    addEventListener('keydown', (e) => {
      if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
      const k = KEYMAP[e.code]; if (!k) return;
      if (this.enabled) e.preventDefault();
      if (e.repeat) return;
      if (k === 'pause') { if (this.enabled && this.onPauseRequest) this.onPauseRequest(); return; }
      if (this.enabled) this._set(k, true);
    });
    addEventListener('keyup', (e) => { const k = KEYMAP[e.code]; if (k) this._set(k, false); });
    addEventListener('blur', () => { this.held = {}; });
  }

  _bindMouse() {
    const c = this.canvas;
    c.addEventListener('mousedown', (e) => {
      if (!this.enabled || this.isTouchActive) return;
      if (!this.locked && !this.lockFailed) { this.requestLock(); }
      if (e.button === 0) this._set('attack', true);
      if (e.button === 2) this._set('guard', true);
      if (e.button === 1) { this._pressed.lock = true; }
      e.preventDefault();
    });
    addEventListener('mouseup', (e) => {
      if (e.button === 0) this._set('attack', false);
      if (e.button === 2) this._set('guard', false);
    });
    c.addEventListener('contextmenu', (e) => e.preventDefault());
    addEventListener('mousemove', (e) => {
      if (!this.enabled) return;
      if (this.locked || this.lockFailed) {
        this._lookX += (e.movementX || 0) * 0.0023 * this.sens;
        this._lookY += (e.movementY || 0) * 0.0023 * this.sens;
      }
    });
    document.addEventListener('pointerlockchange', () => {
      const was = this.locked;
      this.locked = document.pointerLockElement === c;
      if (was && !this.locked && this.enabled && this.onPauseRequest) this.onPauseRequest(true);
    });
    document.addEventListener('pointerlockerror', () => { this.lockFailed = true; });
  }
  requestLock() {
    if (this.isTouch && !this.mouseSeen) return;
    try { const p = this.canvas.requestPointerLock && this.canvas.requestPointerLock(); if (p && p.catch) p.catch(() => { this.lockFailed = true; }); } catch (e) { this.lockFailed = true; }
  }
  exitLock() { if (document.pointerLockElement) document.exitPointerLock(); }

  _bindTouch(root) {
    if (!root) return;
    addEventListener('mousemove', () => { this.mouseSeen = true; }, { once: true });
    const btnOf = (el) => (el && el.closest ? el.closest('[data-btn]') : null);
    root.addEventListener('touchstart', (e) => {
      if (!this.enabled) return;
      e.preventDefault();
      for (const t of e.changedTouches) {
        const b = btnOf(t.target);
        if (b) {
          const name = b.dataset.btn; b.classList.add('on');
          this._touches.set(t.identifier, { kind: 'btn', name, el: b, x: t.clientX, y: t.clientY });
          this._set(name, true);
        } else if (t.clientX < innerWidth * 0.42 && this.stick.id === null) {
          this.stick.id = t.identifier; this.stick.ox = t.clientX; this.stick.oy = t.clientY; this.stick.x = this.stick.y = 0;
          this._touches.set(t.identifier, { kind: 'stick' });
          if (this.onStick) this.onStick(true, t.clientX, t.clientY, 0, 0);
        } else {
          this._touches.set(t.identifier, { kind: 'look', x: t.clientX, y: t.clientY });
        }
      }
    }, { passive: false });
    root.addEventListener('touchmove', (e) => {
      if (!this.enabled) return;
      e.preventDefault();
      for (const t of e.changedTouches) {
        const s = this._touches.get(t.identifier); if (!s) continue;
        if (s.kind === 'stick') {
          const R = 56; let dx = t.clientX - this.stick.ox, dy = t.clientY - this.stick.oy;
          const d = Math.hypot(dx, dy);
          if (d > R) { dx *= R / d; dy *= R / d; }
          this.stick.x = dx / R; this.stick.y = -dy / R;
          if (this.onStick) this.onStick(true, this.stick.ox, this.stick.oy, dx, dy);
        } else { // 視点（ボタンを押したままのドラッグでも回せる）
          this._lookX += (t.clientX - s.x) * 0.0052 * this.sens;
          this._lookY += (t.clientY - s.y) * 0.0052 * this.sens;
          s.x = t.clientX; s.y = t.clientY;
        }
      }
    }, { passive: false });
    const end = (e) => {
      for (const t of e.changedTouches) {
        const s = this._touches.get(t.identifier); if (!s) continue;
        if (s.kind === 'btn') { s.el.classList.remove('on'); this._set(s.name, false); }
        if (s.kind === 'stick') { this.stick.id = null; this.stick.x = this.stick.y = 0; if (this.onStick) this.onStick(false); }
        this._touches.delete(t.identifier);
      }
    };
    root.addEventListener('touchend', end); root.addEventListener('touchcancel', end);
  }

  _pollPad() {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    let gp = null;
    for (const p of pads) if (p && p.connected && p.axes.length >= 4) { gp = p; break; }
    if (!gp) return null;
    const dz = (v) => (Math.abs(v) < 0.16 ? 0 : (v - Math.sign(v) * 0.16) / 0.84);
    const b = (i) => !!(gp.buttons[i] && (gp.buttons[i].pressed || gp.buttons[i].value > 0.4));
    const map = { attack: b(7) || b(2), guard: b(6) || b(4), dodge: b(0) || b(1), potion: b(3), special: b(8) || (b(4) && b(5)), lock: b(11), sprint: b(5) || b(10), stamp1: b(12), stamp2: b(15), stamp3: b(13), stamp4: b(14) };
    for (const k in map) { if (map[k] !== !!this._padPrev[k]) { this._set(k, map[k]); this._padPrev[k] = map[k]; } }
    if (b(9) && !this._padPrev.start && this.onPauseRequest && this.enabled) this.onPauseRequest();
    this._padPrev.start = b(9);
    return { mx: dz(gp.axes[0]), my: -dz(gp.axes[1]), lx: dz(gp.axes[2]), ly: dz(gp.axes[3]) };
  }

  // 毎フレーム呼ぶ。移動ベクトルを確定させる
  update(dt) {
    let x = 0, y = 0;
    if (this.held.left) x -= 1; if (this.held.right) x += 1;
    if (this.held.up) y += 1; if (this.held.down) y -= 1;
    this.autoSprint = false;
    if (this.stick.id !== null) {
      x = this.stick.x; y = this.stick.y;
      if (Math.hypot(x, y) > 0.93 && y > 0.3) this.autoSprint = true;
    }
    const pad = this.enabled ? this._pollPad() : null;
    if (pad) {
      if (Math.abs(pad.mx) + Math.abs(pad.my) > 0) { x = pad.mx; y = pad.my; }
      this._lookX += pad.lx * 2.6 * dt * this.sens; this._lookY += pad.ly * 1.9 * dt * this.sens;
    }
    const m = Math.hypot(x, y);
    if (m > 1) { x /= m; y /= m; }
    this.move.x = clamp(x, -1, 1); this.move.y = clamp(y, -1, 1);
  }
}
