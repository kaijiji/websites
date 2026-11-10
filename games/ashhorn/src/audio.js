// 効果音とBGMはすべて Web Audio で合成する（音声ファイルなし）
import { clamp } from './util.js';

export class AudioSys {
  constructor() {
    this.ctx = null;
    this.volume = 0.8;
    this.musicVol = 0.55;
    this.intensity = 0;
    this._timer = null;
    this._step = 0;
    this._nextT = 0;
    this._breath = null;
  }

  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = (this.ctx = new AC());
    this.master = ctx.createGain();
    this.master.gain.value = this.volume;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 5; comp.attack.value = 0.004; comp.release.value = 0.2;
    this.master.connect(comp); comp.connect(ctx.destination);
    this.sfx = ctx.createGain(); this.sfx.connect(this.master);
    this.music = ctx.createGain(); this.music.gain.value = this.musicVol; this.music.connect(this.master);
    // ノイズ素材
    const len = ctx.sampleRate * 2;
    this.noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    // 歪み
    this.shaper = (amount) => {
      const ws = ctx.createWaveShaper();
      const n = 256, curve = new Float32Array(n);
      for (let i = 0; i < n; i++) { const x = (i / (n - 1)) * 2 - 1; curve[i] = Math.tanh(x * amount); }
      ws.curve = curve; return ws;
    };
    // 簡易リバーブ（ノイズ減衰のインパルス）
    const irLen = ctx.sampleRate * 1.8;
    const ir = ctx.createBuffer(2, irLen, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const ch = ir.getChannelData(c);
      for (let i = 0; i < irLen; i++) ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irLen, 2.6);
    }
    this.reverb = ctx.createConvolver(); this.reverb.buffer = ir;
    const rg = ctx.createGain(); rg.gain.value = 0.28;
    this.reverb.connect(rg); rg.connect(this.master);
  }

  setVolume(v) { this.volume = v; if (this.master) this.master.gain.value = v; }

  // ---- 基本パーツ ----
  _noise(t, dur, type, f0, f1, q, peak, attack = 0.005, dest = this.sfx, wet = 0) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource(); src.buffer = this.noiseBuf; src.loop = true;
    src.playbackRate.value = 0.7 + Math.random() * 0.6;
    const f = ctx.createBiquadFilter(); f.type = type; f.Q.value = q;
    f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f); f.connect(g); g.connect(dest);
    if (wet) { const w = ctx.createGain(); w.gain.value = wet; g.connect(w); w.connect(this.reverb); }
    src.start(t, Math.random()); src.stop(t + dur + 0.05);
  }
  _osc(t, type, f0, f1, dur, peak, attack = 0.005, dest = this.sfx, wet = 0) {
    const ctx = this.ctx;
    const o = ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest);
    if (wet) { const w = ctx.createGain(); w.gain.value = wet; g.connect(w); w.connect(this.reverb); }
    o.start(t); o.stop(t + dur + 0.05);
  }

  // dist: 音源までの距離 [m]（遠いほど小さく）
  play(name, vol = 1, dist = 0, rate = 1) {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const v = vol * clamp(1 / (1 + dist * dist / 500), 0.06, 1);
    const t = this.ctx.currentTime + 0.005;
    const N = this._noise.bind(this), O = this._osc.bind(this);
    switch (name) {
      case 'swing': N(t, 0.2, 'bandpass', 500, 2600, 1.2, 0.35 * v, 0.05); break;
      case 'swingHeavy': N(t, 0.34, 'bandpass', 260, 2000, 1.0, 0.55 * v, 0.1); O(t, 'sine', 120, 50, 0.3, 0.2 * v); break;
      case 'hit':
        N(t, 0.16, 'lowpass', 3800, 400, 0.8, 0.8 * v, 0.002, this.sfx, 0.3);
        O(t, 'sine', 170, 55, 0.2, 0.7 * v); O(t, 'triangle', 900, 300, 0.07, 0.22 * v); break;
      case 'hitHeavy':
        N(t, 0.32, 'lowpass', 5200, 260, 0.8, 1.0 * v, 0.002, this.sfx, 0.5);
        O(t, 'sine', 140, 36, 0.45, 1.0 * v); O(t, 'square', 520, 120, 0.12, 0.2 * v);
        N(t + 0.03, 0.5, 'bandpass', 2400, 700, 3, 0.25 * v, 0.01, this.sfx, 0.6); break;
      case 'tick': O(t, 'triangle', 900 * rate, 600 * rate, 0.07, 0.3 * v); N(t, 0.05, 'bandpass', 2500 * rate, 1500, 2, 0.32 * v, 0.002); O(t, 'sine', 170, 80, 0.08, 0.3 * v); break;
      case 'weak': O(t, 'triangle', 1500, 2300, 0.14, 0.22 * v, 0.004, this.sfx, 0.5); O(t + 0.05, 'sine', 2300, 3100, 0.2, 0.14 * v, 0.004, this.sfx, 0.5); break;
      case 'bounce': O(t, 'square', 2100, 1500, 0.12, 0.2 * v, 0.001, this.sfx, 0.5); O(t, 'triangle', 3300, 2800, 0.25, 0.18 * v, 0.001, this.sfx, 0.6); N(t, 0.08, 'highpass', 4000, 6000, 1, 0.3 * v); break;
      case 'dodge': N(t, 0.26, 'bandpass', 900, 300, 0.8, 0.3 * v, 0.06); break;
      case 'just': O(t, 'sine', 880, 1760, 0.35, 0.3 * v, 0.01, this.sfx, 0.8); O(t + 0.06, 'sine', 1320, 2640, 0.4, 0.22 * v, 0.01, this.sfx, 0.8); N(t, 0.5, 'highpass', 5000, 9000, 1, 0.12 * v, 0.1); break;
      case 'guard': O(t, 'square', 320, 180, 0.12, 0.3 * v); N(t, 0.14, 'bandpass', 2400, 1200, 2, 0.5 * v, 0.002, this.sfx, 0.3); O(t, 'sine', 110, 60, 0.2, 0.5 * v); break;
      case 'parry':
        O(t, 'triangle', 2400, 2350, 0.6, 0.35 * v, 0.001, this.sfx, 0.9); O(t, 'sine', 3600, 3550, 0.5, 0.22 * v, 0.001, this.sfx, 0.9);
        N(t, 0.1, 'highpass', 5000, 8000, 1, 0.5 * v); O(t, 'sine', 160, 60, 0.25, 0.6 * v); break;
      case 'hurt': O(t, 'sine', 200, 60, 0.3, 0.9 * v); N(t, 0.22, 'lowpass', 1800, 300, 1, 0.7 * v, 0.003); break;
      case 'down': O(t, 'sawtooth', 220, 55, 0.9, 0.3 * v, 0.01, this.sfx, 0.5); O(t, 'sine', 110, 40, 1.0, 0.6 * v); break;
      case 'charge1': O(t, 'sine', 520, 700, 0.16, 0.2 * v, 0.01, this.sfx, 0.4); break;
      case 'charge2': O(t, 'sine', 700, 940, 0.18, 0.24 * v, 0.01, this.sfx, 0.4); break;
      case 'charge3': O(t, 'sine', 940, 1400, 0.3, 0.3 * v, 0.01, this.sfx, 0.6); O(t, 'triangle', 1880, 2800, 0.3, 0.14 * v, 0.01, this.sfx, 0.6); break;
      case 'potion': for (let i = 0; i < 3; i++) O(t + i * 0.28, 'sine', 300 + i * 30, 180, 0.14, 0.25 * v); break;
      case 'heal': O(t, 'sine', 660, 990, 0.5, 0.2 * v, 0.05, this.sfx, 0.7); O(t + 0.12, 'sine', 990, 1320, 0.5, 0.16 * v, 0.05, this.sfx, 0.7); break;
      case 'step': O(t, 'sine', 62, 30, 0.34, 1.0 * v, 0.004, this.sfx, 0.3); N(t, 0.3, 'lowpass', 500, 80, 0.7, 0.7 * v, 0.004, this.sfx, 0.3); break;
      case 'slam':
        O(t, 'sine', 80, 24, 1.1, 1.4 * v, 0.003, this.sfx, 0.5); N(t, 0.9, 'lowpass', 2400, 90, 0.7, 1.2 * v, 0.003, this.sfx, 0.6);
        N(t + 0.05, 1.4, 'bandpass', 500, 200, 0.8, 0.4 * v, 0.1, this.sfx, 0.6); break;
      case 'explode': O(t, 'sine', 110, 30, 0.7, 1.1 * v, 0.003); N(t, 0.7, 'lowpass', 3600, 120, 0.7, 1.0 * v, 0.003, this.sfx, 0.5); break;
      case 'fireball': N(t, 0.5, 'bandpass', 300, 1200, 1.2, 0.45 * v, 0.1); O(t, 'sawtooth', 90, 160, 0.4, 0.12 * v, 0.05); break;
      case 'warn': O(t, 'square', 660, 660, 0.09, 0.1 * v); O(t + 0.13, 'square', 660, 660, 0.09, 0.1 * v); break;
      case 'crack': N(t, 0.5, 'bandpass', 1800, 500, 2, 0.8 * v, 0.002, this.sfx, 0.6); O(t, 'square', 260, 70, 0.3, 0.4 * v); O(t + 0.04, 'triangle', 1900, 900, 0.3, 0.2 * v, 0.002, this.sfx, 0.6); break;
      case 'snarl': this._roar(t, 0.7, 0.5 * v, 130); break;
      case 'roar': this._roar(t, 2.4, 1.0 * v, 105); break;
      case 'deathcry': this._roar(t, 3.4, 1.0 * v, 120, true); break;
      case 'ui': O(t, 'sine', 880, 1100, 0.07, 0.15 * v); break;
      case 'uiBig': O(t, 'sine', 440, 660, 0.12, 0.2 * v, 0.005, this.sfx, 0.5); O(t + 0.08, 'sine', 660, 880, 0.2, 0.2 * v, 0.005, this.sfx, 0.5); break;
      case 'stamp': O(t, 'triangle', 1200, 1500, 0.08, 0.15 * v); O(t + 0.09, 'triangle', 1500, 1800, 0.1, 0.12 * v); break;
      case 'horn': // クエスト開始の角笛
        for (const [f, d0] of [[146.8, 0], [220, 0.5], [293.7, 1.0]]) { O(t + d0, 'sawtooth', f, f * 1.01, 1.2, 0.16 * v, 0.2, this.sfx, 0.9); O(t + d0, 'sine', f / 2, f / 2, 1.2, 0.2 * v, 0.2, this.sfx, 0.6); }
        break;
      case 'victory': {
        const seq = [293.7, 370, 440, 587.3, 440, 587.3, 740];
        seq.forEach((f, i) => { const tt = t + i * 0.16 + (i > 4 ? 0.2 : 0); O(tt, 'sawtooth', f, f, i === 6 ? 1.8 : 0.3, 0.14 * v, 0.02, this.sfx, 0.8); O(tt, 'triangle', f * 2, f * 2, i === 6 ? 1.8 : 0.3, 0.08 * v, 0.02, this.sfx, 0.8); });
        O(t + 1.2, 'sine', 73.4, 73.4, 2, 0.5 * v, 0.05); break;
      }
      case 'fail': [220, 207.6, 174.6, 146.8].forEach((f, i) => { O(t + i * 0.4, 'sawtooth', f, f * 0.97, 0.9, 0.14 * v, 0.05, this.sfx, 0.8); }); O(t, 'sine', 55, 40, 2.4, 0.5 * v, 0.1); break;
    }
  }

  _roar(t, dur, v, base, falling = false) {
    const ctx = this.ctx;
    const out = ctx.createGain();
    out.gain.setValueAtTime(0.0001, t); out.gain.linearRampToValueAtTime(v, t + 0.12);
    out.gain.setValueAtTime(v, t + dur * 0.7); out.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const ws = this.shaper(6);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 0.9;
    bp.frequency.setValueAtTime(500, t); bp.frequency.linearRampToValueAtTime(1100, t + dur * 0.25); bp.frequency.exponentialRampToValueAtTime(280, t + dur);
    const am = ctx.createGain(); am.gain.value = 0.6;
    const lfo = ctx.createOscillator(); lfo.type = 'sawtooth'; lfo.frequency.setValueAtTime(34, t); lfo.frequency.linearRampToValueAtTime(22, t + dur);
    const lg = ctx.createGain(); lg.gain.value = 0.4; lfo.connect(lg); lg.connect(am.gain);
    for (const det of [1, 1.498, 2.02, 0.5]) {
      const o = ctx.createOscillator(); o.type = 'sawtooth';
      o.frequency.setValueAtTime(base * det * 0.8, t); o.frequency.linearRampToValueAtTime(base * det * 1.25, t + dur * 0.2);
      o.frequency.exponentialRampToValueAtTime(base * det * (falling ? 0.35 : 0.62), t + dur);
      const g = ctx.createGain(); g.gain.value = 0.3; o.connect(g); g.connect(am); o.start(t); o.stop(t + dur + 0.1);
    }
    const n = ctx.createBufferSource(); n.buffer = this.noiseBuf; n.loop = true; const ng = ctx.createGain(); ng.gain.value = 0.5; n.connect(ng); ng.connect(am); n.start(t); n.stop(t + dur + 0.1);
    am.connect(ws); ws.connect(bp); bp.connect(out); out.connect(this.sfx);
    const w = ctx.createGain(); w.gain.value = 0.7; out.connect(w); w.connect(this.reverb);
    lfo.start(t); lfo.stop(t + dur + 0.1);
    this._osc(t, 'sine', 70, 38, dur, 0.9 * v, 0.1);
  }

  // 火炎ブレスの持続音
  breath(on, vol = 1) {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    if (on && !this._breath) {
      const src = ctx.createBufferSource(); src.buffer = this.noiseBuf; src.loop = true;
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 420; f.Q.value = 0.5;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.9 * vol, t + 0.15);
      src.connect(f); f.connect(g); g.connect(this.sfx); src.start();
      this._breath = { src, g };
    } else if (on && this._breath) {
      this._breath.g.gain.setTargetAtTime(0.9 * vol, t, 0.1);
    } else if (!on && this._breath) {
      const b = this._breath; this._breath = null;
      b.g.gain.cancelScheduledValues(t); b.g.gain.setTargetAtTime(0.0001, t, 0.12); b.src.stop(t + 0.6);
    }
  }

  // ---- BGM: 太鼓と低弦のオスティナート ----
  startMusic() {
    if (!this.ctx || this._timer) return;
    this._step = 0; this._nextT = this.ctx.currentTime + 0.1;
    this._timer = setInterval(() => this._schedule(), 60);
  }
  stopMusic() { if (this._timer) { clearInterval(this._timer); this._timer = null; } }
  setIntensity(i) { this.intensity = i; }

  _schedule() {
    const ctx = this.ctx; if (!ctx || ctx.state !== 'running') return;
    const bpm = 132 + this.intensity * 10, s16 = 60 / bpm / 4;
    while (this._nextT < ctx.currentTime + 0.25) {
      this._playStep(this._step, this._nextT, s16);
      this._nextT += s16; this._step = (this._step + 1) % 128;
    }
  }
  _playStep(step, t, s16) {
    const I = this.intensity, m = this.music, s = step % 16, bar = (step / 16) | 0;
    const root = [73.42, 73.42, 58.27, 65.41, 73.42, 73.42, 87.31, 55][bar]; // D D Bb C D D F A
    const O = (type, f0, f1, dur, peak, atk = 0.005, wet = 0) => this._osc(t, type, f0, f1, dur, peak, atk, m, wet);
    const N = (dur, type, f0, f1, q, peak, wet = 0) => this._noise(t, dur, type, f0, f1, q, peak, 0.003, m, wet);
    // 大太鼓
    const kick = I >= 2 ? [0, 3, 6, 8, 10, 11, 14] : I >= 1 ? [0, 3, 6, 8, 11, 14] : [0, 6, 8, 14];
    if (kick.includes(s)) { O('sine', 110, 38, 0.3, 0.9); N(0.08, 'lowpass', 900, 200, 1, 0.3); }
    // 締太鼓
    const tom = I >= 1 ? [2, 5, 7, 12, 13, 15] : [4, 12];
    if (tom.includes(s)) { O('sine', 210, 120, 0.14, 0.35, 0.003, 0.3); N(0.05, 'bandpass', 1500, 900, 2, 0.16, 0.3); }
    // 金物
    if (I >= 1 && s % 2 === 0) N(0.04, 'highpass', 7000, 9000, 1, s % 4 === 2 ? 0.1 : 0.05);
    if (I >= 2 && s % 2 === 1) N(0.03, 'highpass', 8000, 9000, 1, 0.04);
    // 低弦オスティナート
    const ost = [1, 0, 1, 1.5, 1, 0, 1.2, 1, 1, 0, 1, 1.5, 2, 0, 1.5, 1.2][s];
    if (ost && (I >= 1 || s % 4 === 0)) { O('sawtooth', root * ost, root * ost, s16 * 1.6, 0.16, 0.01, 0.3); O('sine', root * ost / 2, root * ost / 2, s16 * 1.6, 0.2); }
    // 持続和音
    if (s === 0) {
      for (const k of [1, 1.5, 2, 2.4]) O('sawtooth', root * 2 * k, root * 2 * k * 1.003, s16 * 16, 0.028 + I * 0.008, 0.4, 0.8);
    }
    // 金管の旋律（激昂時）
    if (I >= 2) {
      const mel = { 0: 4, 6: 4.5, 8: 4.8, 12: 6, 14: 5.4 }[s];
      if (mel && bar % 2 === 0) { O('sawtooth', root * mel, root * mel, s16 * 3.5, 0.07, 0.03, 0.8); O('square', root * mel / 2, root * mel / 2, s16 * 3.5, 0.04, 0.03, 0.6); }
      const mel2 = { 0: 6, 4: 5.4, 8: 4.8, 10: 4.5, 12: 4 }[s];
      if (mel2 && bar % 2 === 1) { O('sawtooth', root * mel2, root * mel2, s16 * 3.5, 0.07, 0.03, 0.8); }
    }
  }
}
