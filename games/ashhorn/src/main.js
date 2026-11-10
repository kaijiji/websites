// 灰角 ASHHORN — ゲーム全体の進行（タイトル→集会所→狩猟→リザルト）と通信の取りまとめ
import * as THREE from 'three';
import { World } from './world.js';
import { Fx } from './fx.js';
import { AudioSys } from './audio.js';
import { Input } from './input.js';
import { Boss, Hazards } from './boss.js';
import { Player, Avatar, ST } from './player.js';
import { Net } from './net.js';
import { UI, rankOf } from './ui.js';
import { PLAYER, PLAYER_COLORS, STAMPS, CARTS, QUEST_LIMIT, MAX_PLAYERS, BOSS, WEAPONS } from './config.js';
import { clamp, sat, store, damp } from './util.js';

const $ = (id) => document.getElementById(id);
const SNAP_DT = 1 / 15;

class Game {
  constructor() {
    const canvas = $('c');
    this.input = new Input(canvas, $('touch'));
    if (this.input.isTouch) document.body.classList.add('touch');
    const def = { sens: 1, invertY: false, vol: 0.8, music: 0.55, quality: this.input.isTouch ? 'mid' : 'high', qualityAuto: true, weapon: 'great', view: 'fp' };
    this.settings = Object.assign(def, store.get('ashhorn.settings', {}));
    if (!WEAPONS[this.settings.weapon]) this.settings.weapon = 'great';
    this.world = new World(canvas, this.settings.quality);
    this.audio = new AudioSys();
    this.fx = new Fx(this.world, $('dmgLayer'));
    this.state = 'title'; this.myId = 0; this.roster = []; this.avatars = new Map(); this.stats = {};
    this.time = 0; this.carts = CARTS; this.ended = false; this.paused = false; this.evId = 0; this.snapT = 0; this.statT = 0; this.introT = 0; this.slowT = 0; this.orbit = 0.6;
    this.breakBy = {}; this.rage = 0; this.endT = 0; this.fpsAcc = 0; this.fpsN = 0; this.aliveT = 0;

    const env = {
      audio: this.audio, fx: this.fx,
      shake: (a, x, z, range) => { const c = this.world.camera.position; this.world.addShake(a * sat(1.15 - Math.hypot(c.x - x, c.z - z) / range)); },
      localPos: () => this.world.camera.position,
      distTo: (x, z) => { const c = this.world.camera.position; return Math.hypot(c.x - x, c.z - z); },
      time: () => this.world.time,
      emit: (ev) => this.emit(ev),
    };
    this.boss = new Boss(this.world.scene, env);
    this.hazards = new Hazards(env);
    this.player = new Player(this.world, this.input, {
      audio: this.audio, fx: this.fx,
      popup: (t, c) => this.ui.popup(t, c), flash: (k) => this.ui.flash(k),
      dealHit: (part, dmg, pt, strong, weak, blunt, stun) => this.dealHit(part, dmg, pt, strong, weak, blunt, stun),
      parry: (h) => { if (this.isAuthority()) this.boss.applyParry(this.myId, !!h.parryFlinch); else this.net.send({ t: 'parry', f: h.parryFlinch ? 1 : 0 }); },
      onDown: () => { if (this.isAuthority()) this.playerDown(this.myId); else this.net.send({ t: 'down' }); },
      onJust: () => { if (this.mode === 'solo') this.slowT = 0.32; },
      onRespawn: () => this.ui.fade(false),
      canRespawn: () => !this.ended,
    });
    this.player.vm.visible = false; this.player.trail.visible = false;
    this.ui = new UI(this);
    this.net = new Net({
      onJoin: (id) => { if (this.roster.length >= MAX_PLAYERS) { this.net.sendTo(id, { t: 'full' }); setTimeout(() => this.net.kick(id), 500); } },
      onLeave: (id) => this.peerLeft(id),
      onMessage: (id, msg) => (this.net.isHost ? this.hostMsg(id, msg) : this.clientMsg(msg)),
      onHostLost: () => { if (this.state !== 'title') { this.cleanupHunt(); this.net.close(); this.state = 'title'; this.ui.message('通信が切れました', 'ホストとの接続が切れました。'); } },
    });
    this.input.onPauseRequest = (fromLock) => { if (fromLock && this.introT < 0.6) return; this.pause(); }; // 開始直後の視点ロック解除では止めない
    this.input.onStick = (on, x, y, dx, dy) => this.ui.stick(on, x, y, dx, dy);
    this.applySettings();
    this.fx.resize(innerHeight, this.world.renderer.getPixelRatio());
    addEventListener('resize', () => this.fx.resize(innerHeight, this.world.renderer.getPixelRatio()));
    addEventListener('pointerdown', () => this.audio.init(), { passive: true });
    addEventListener('pagehide', () => this.net.close()); // 退出をすぐ相手に伝える
    document.addEventListener('visibilitychange', () => { if (document.hidden && this.mode === 'solo' && this.state === 'hunt') this.pause(); });

    // 招待URLから来た場合
    const room = new URLSearchParams(location.search).get('room');
    this.ui.show('sTitle');
    if (room) { $('joinCode').value = room.toUpperCase().slice(0, 5); $('bJoin').classList.add('primary'); $('bHost').classList.remove('primary'); this.ui.toast('名前を決めて「参加」を押してください', 5000); }

    // ホストのタブが裏に回っても進行を止めないための予備タイマー
    try {
      const w = new Worker(URL.createObjectURL(new Blob(['setInterval(()=>postMessage(0),33)'], { type: 'text/javascript' })));
      w.onmessage = () => { if (document.hidden && this.net.isHost && this.state === 'hunt') this.frame(performance.now(), true); };
    } catch (e) { /* Worker が使えない環境ではそのまま */ }

    this.last = performance.now();
    const loop = (now) => { requestAnimationFrame(loop); this.frame(now, false); };
    requestAnimationFrame(loop);
    this.ui.loaded();
  }

  // ---- 設定
  applySettings(qualityChanged) {
    const s = this.settings;
    this.input.sens = s.sens; this.input.invertY = s.invertY;
    this.audio.setVolume(s.vol); this.audio.musicVol = s.music; if (this.audio.music) this.audio.music.gain.value = s.music;
    if (qualityChanged && s.quality !== this.world.qName) { this.world.setQuality(s.quality); this.fx.resize(innerHeight, this.world.renderer.getPixelRatio()); }
  }
  saveSettings() { store.set('ashhorn.settings', this.settings); }

  isAuthority() { return this.mode === 'solo' || this.net.isHost; }
  nameOf(id) { const p = this.roster.find((r) => r.id === id); return p ? p.name : '狩人'; }
  shareUrl() { return `${location.origin}${location.pathname}?room=${this.net.code}`; }

  // ---- 入口
  startSolo() {
    this.mode = 'solo'; this.myId = 0; this.roster = [{ id: 0, name: this.ui.name(), w: this.settings.weapon }];
    this.beginHunt(1);
  }
  async hostRoom() {
    this.ui.toast('部屋を準備中…', 8000);
    try {
      await this.net.host();
      this.mode = 'multi'; this.myId = 0; this.roster = [{ id: 0, name: this.ui.name(), w: this.settings.weapon }]; this.state = 'lobby';
      this.ui.renderLobby(this.roster, true, this.net.code, 0); this.ui.show('sLobby'); this.ui.toast('部屋ができました。URLを仲間に送ってください');
    } catch (e) { this.ui.toast(e.message, 5000); }
  }
  async joinRoom(code) {
    this.ui.toast('接続中…', 20000);
    try {
      await this.net.join(code);
      this.mode = 'multi'; this.state = 'lobby';
      this.net.send({ t: 'hello', name: this.ui.name(), w: this.settings.weapon });
      this.ui.toast('部屋に入りました');
    } catch (e) { this.net.close(); this.ui.toast(e.message, 5000); }
  }
  // 武器の変更（タイトル・集会所・リザルトで）
  setWeapon(id) {
    if (!WEAPONS[id] || this.state === 'hunt') return;
    this.settings.weapon = id; this.saveSettings(); this.ui.renderWeapons();
    const me = this.roster.find((r) => r.id === this.myId); if (me) me.w = id;
    if (this.mode === 'multi') { if (this.net.isHost) { this.net.broadcast({ t: 'roster', roster: this.roster }); this.rosterChanged(); } else this.net.send({ t: 'wpn', w: id }); }
  }
  toggleView() {
    if (this.state !== 'hunt') return;
    this.player.tp = !this.player.tp; this.settings.view = this.player.tp ? 'tp' : 'fp'; this.saveSettings();
    this.ui.toast(this.player.tp ? '三人称視点' : '一人称視点', 1200);
  }
  hostStart() { if (!this.net.isHost) return; this.net.broadcast({ t: 'start', n: this.roster.length }); this.beginHunt(this.roster.length); }
  again() { if (this.mode === 'solo') this.beginHunt(1); else this.hostStart(); }

  toTitle() {
    this.cleanupHunt(); this.net.close(); this.state = 'title'; this.mode = null;
    this.boss.reset(1); this.ui.show('sTitle');
  }
  cleanupHunt() {
    this.input.enabled = false; this.input.clear(); this.input.exitLock();
    for (const a of this.avatars.values()) a.dispose(); this.avatars.clear();
    if (this.selfAvatar) { this.selfAvatar.dispose(); this.selfAvatar = null; }
    this.hazards.clear(); this.fx.clear(); this.audio.stopMusic(); this.audio.breath(false);
    this.ui.hud(false); this.ui.fade(false); this.paused = false; this.ended = false;
    this.player.vm.visible = false; this.player.trail.visible = false;
    this.rage = 0;
  }

  // ---- 狩猟の開始
  beginHunt(n) {
    this.cleanupHunt();
    this.state = 'hunt'; this.time = 0; this.carts = CARTS; this.ended = false; this.introT = 0; this.huntN = n; this.stats = {}; this.breakBy = {}; this.endT = 0;
    this.boss.reset(n); this.rage = 0; this.audio.setIntensity(0);
    const idx = Math.max(0, this.roster.findIndex((r) => r.id === this.myId));
    const mine = this.roster[idx] || {};
    this.player.setWeapon(mine.w || this.settings.weapon); this.player.tp = this.settings.view === 'tp';
    this.player.reset(idx, this.roster.length); this.player.setColor(PLAYER_COLORS[this.myId % 4]);
    this.selfAvatar = new Avatar(this.world.scene, '', PLAYER_COLORS[this.myId % 4], this.player.weaponId); // 三人称用の自分の姿
    this.selfAvatar.label.visible = false; this.selfAvatar.k = 70; this.selfAvatar.g.visible = false;
    this.player.vm.visible = true; this.player.trail.visible = true;
    this.syncAvatars();
    this.ui.hideMenus(); this.ui.hud(true); this.ui.bossLag = 1;
    this.ui.setMe(this.nameOf(this.myId), PLAYER_COLORS[this.myId % 4]); this.ui.setRoom(this.mode === 'multi' ? this.net.code : '');
    $('feed').innerHTML = ''; $('popups').innerHTML = '';
    this.ui.banner('狩猟開始', BOSS.name);
    this.input.clear(); this.input.enabled = true; this.input.requestLock();
    this.audio.init(); this.audio.play('horn', 1);
    if (!this.input.isTouch) setTimeout(() => { if (this.state === 'hunt' && !this.input.locked && !this.input.lockFailed) this.ui.toast('画面をクリックすると視点を動かせます', 4000); }, 900);
  }

  syncAvatars() {
    if (this.state !== 'hunt') return;
    const ids = new Set(this.roster.map((r) => r.id));
    for (const [id, a] of this.avatars) if (!ids.has(id)) { a.dispose(); this.avatars.delete(id); }
    this.roster.forEach((r, i) => {
      if (r.id === this.myId) return;
      const ex = this.avatars.get(r.id);
      if (ex && ex.wid === (r.w || 'great')) return;
      if (ex) ex.dispose();
      const a = new Avatar(this.world.scene, r.name, PLAYER_COLORS[r.id % 4], r.w || 'great');
      const an = (i - (this.roster.length - 1) / 2) * 0.16; a.x = a.tx = Math.sin(an) * 28; a.z = a.tz = Math.cos(an) * 28;
      a.id = r.id; this.avatars.set(r.id, a);
    });
  }

  // ---- 一時停止
  pause() {
    if (this.state !== 'hunt' || this.paused || this.ended) return;
    this.paused = true; this.input.enabled = false; this.input.clear(); this.input.exitLock();
    $('pauseSub').textContent = this.mode === 'solo' ? '時間は止まっています。' : 'マルチプレイ中は時間が止まりません。';
    this.ui.show('sPause');
  }
  resume() {
    if (!this.paused) return;
    this.paused = false; this.ui.hideMenus(); this.input.clear(); this.input.enabled = true; this.input.requestLock();
  }

  // ---- イベント（ホストが発行し、全員が同じように適用する）
  emit(ev) {
    if (!this.isAuthority()) return;
    ev.id = this.evId++;
    this.applyEvent(ev);
    if (this.net.isHost) this.net.broadcast({ t: 'ev', e: ev });
  }
  applyEvent(ev) {
    const ui = this.ui, who = ev.by != null ? this.nameOf(ev.by) : '';
    switch (ev.k) {
      case 'ring': case 'ball': case 'erupt': this.hazards.spawn(ev); break;
      case 'break':
        if (ev.p === 'tail') { this.boss.setTailCut(true); ui.feed(`${who} が尻尾を切断！`); ui.popup('尻尾切断！', 'just'); }
        else { this.boss.setHornBroken(true); ui.feed(`${who} が角を破壊！`); ui.popup('角破壊！', 'just'); }
        this.breakBy[ev.p] = ev.by; this.world.addShake(0.5);
        break;
      case 'topple': ui.feed(`${who} が転倒させた！`); ui.popup('転倒！ 頭を狙え', 'just'); break;
      case 'stun': ui.feed(`${who} が気絶させた！`); ui.popup('気絶！', 'parry'); break;
      case 'phase': this.boss.phase = ev.p; this.audio.setIntensity(ev.p - 1); ui.banner(ev.p >= 3 ? '激昂・極' : '激昂', ev.p >= 3 ? '大地が噴き上がる' : '攻撃が激しくなる'); break;
      case 'dead': this.onBossDead(); break;
      case 'hit': {
        const p = new THREE.Vector3(ev.x, ev.y, ev.z), d = p.distanceTo(this.world.camera.position);
        this.fx.hitSpark(p, !!ev.s, !!ev.w); this.audio.play(ev.s ? 'hitHeavy' : 'hit', 0.7, d); this.fx.number(p, String(ev.d), 'other'); this.boss.hitFlash = 0.6;
        break;
      }
      case 'down': this.carts = ev.c; ui.feed(`${this.nameOf(ev.pid)} が力尽きた（残り${Math.max(0, ev.c)}）`); if (ev.pid !== this.myId) this.audio.play('down', 0.5); break;
      case 'stamp': ui.feed(`${this.nameOf(ev.pid)}：${STAMPS[ev.n] || ''}`, 'stamp'); this.audio.play('stamp', 1); break;
      case 'end': this.finish(ev); break;
    }
  }

  dealHit(part, dmg, pt, strong, weak, blunt, stun) {
    const m = { p: part, d: dmg, x: +pt.x.toFixed(2), y: +pt.y.toFixed(2), z: +pt.z.toFixed(2), s: strong ? 1 : 0, w: weak ? 1 : 0, b: blunt ? 1 : 0, sb: stun || 0 };
    if (this.isAuthority()) { this.boss.applyHit(part, dmg, this.myId, blunt, stun || 0); if (this.net.isHost) this.net.broadcast({ t: 'ev', e: { k: 'hit', ...m, by: this.myId } }); }
    else this.net.send({ t: 'hit', ...m });
  }
  sendStamp(n) { if (this.state !== 'hunt') return; if (this.isAuthority()) this.emit({ k: 'stamp', pid: this.myId, n }); else this.net.send({ t: 'stamp', n }); }
  playerDown(id) {
    if (this.ended) return;
    this.carts--; this.emit({ k: 'down', pid: id, c: this.carts });
    if (this.carts <= 0) this.end(false, '3回力尽きた');
  }

  onBossDead() {
    this.ended = true; this.hazards.clear(); this.audio.stopMusic(); this.audio.breath(false);
    this.world.addShake(0.8); this.ui.flash('impact'); this.player.invuln = 99;
    if (this.mode === 'solo') this.slowT = 1.3;
    if (this.isAuthority()) this.end(true);
  }
  // ホスト：結果をまとめて配る
  end(win, reason) {
    if (this.endT > 0) return;
    this.ended = true;
    this.endT = win ? 5.2 : 2.6; this.endRes = { win, reason, time: this.time };
  }
  sendResult() {
    const { win, reason, time } = this.endRes;
    this.stats[this.myId] = this.player.stats;
    const rows = this.roster.map((r) => { const s = this.stats[r.id] || {}; return { id: r.id, name: r.name, dmg: Math.round(s.dmg || 0), weak: s.weak || 0, just: s.just || 0, parry: s.parry || 0, taken: Math.round(s.taken || 0), downs: s.downs || 0, aw: [] }; });
    if (rows.length > 1) {
      const top = (k, min) => { const m = Math.max(...rows.map((r) => r[k])); return m >= min ? rows.filter((r) => r[k] === m) : []; };
      top('dmg', 1).forEach((r) => r.aw.push('MVP')); top('just', 3).forEach((r) => r.aw.push('見切りの達人')); top('parry', 2).forEach((r) => r.aw.push('鉄壁'));
    }
    for (const r of rows) { if (win && r.taken === 0) r.aw.push('無傷'); if (this.breakBy.tail === r.id) r.aw.push('尾断ち'); if (this.breakBy.horn === r.id) r.aw.push('角折り'); }
    rows.sort((a, b) => b.dmg - a.dmg);
    this.emit({ k: 'end', win, time: +time.toFixed(2), rank: win ? rankOf(time) : '-', rows, reason: reason || '' });
  }
  finish(res) {
    this.state = 'result'; this.ended = true;
    this.input.enabled = false; this.input.clear(); this.input.exitLock();
    this.audio.stopMusic(); this.audio.breath(false); this.audio.play(res.win ? 'victory' : 'fail', 1);
    this.ui.hud(false); this.player.vm.visible = false; this.player.trail.visible = false; this.hazards.clear();
    if (res.win) {
      const rec = store.get('ashhorn.records', {}), n = res.rows.length;
      if (!rec[n] || res.time < rec[n].t) { rec[n] = { t: res.time, r: res.rank }; store.set('ashhorn.records', rec); res.best = true; }
    }
    this.ui.showResult(res, this.isAuthority(), this.myId);
  }

  // ---- 通信（ホスト側）
  hostMsg(id, m) {
    switch (m.t) {
      case 'hello': {
        if (this.roster.find((r) => r.id === id) || this.roster.length >= MAX_PLAYERS) return;
        this.roster.push({ id, name: String(m.name || '狩人').slice(0, 10), w: WEAPONS[m.w] ? m.w : 'great' }); this.roster.sort((a, b) => a.id - b.id);
        this.net.sendTo(id, { t: 'welcome', id, roster: this.roster, state: this.state === 'hunt' ? 'hunt' : 'lobby', n: this.huntN });
        this.net.broadcast({ t: 'roster', roster: this.roster }, id);
        this.rosterChanged(); this.ui.toast(`${this.nameOf(id)} が参加しました`); this.audio.play('uiBig', 1);
        break;
      }
      case 'ps': { const a = this.avatars.get(id); if (a) a.apply(m.s); if (m.st) this.stats[id] = { dmg: m.st[0], weak: m.st[1], just: m.st[2], parry: m.st[3], taken: m.st[4], downs: m.st[5] }; break; }
      case 'hit': {
        if (this.state !== 'hunt' || this.ended) return;
        const d = clamp(+m.d || 0, 0, 900);
        this.boss.applyHit(m.p, d, id, !!m.b, clamp(+m.sb || 0, 0, 600));
        const e = { k: 'hit', x: m.x, y: m.y, z: m.z, s: m.s, w: m.w, d, by: id };
        this.applyEvent(e); this.net.broadcast({ t: 'ev', e }, id);
        break;
      }
      case 'wpn': { const r = this.roster.find((x) => x.id === id); if (r && WEAPONS[m.w] && this.state !== 'hunt') { r.w = m.w; this.net.broadcast({ t: 'roster', roster: this.roster }); this.rosterChanged(); } break; }
      case 'parry': if (this.state === 'hunt') this.boss.applyParry(id, !!m.f); break;
      case 'down': if (this.state === 'hunt') this.playerDown(id); break;
      case 'stamp': this.emit({ k: 'stamp', pid: id, n: m.n | 0 }); break;
    }
  }
  peerLeft(id) {
    const p = this.roster.find((r) => r.id === id); if (!p) return;
    this.roster = this.roster.filter((r) => r.id !== id);
    this.net.broadcast({ t: 'roster', roster: this.roster });
    this.ui.toast(`${p.name} が退出しました`); this.rosterChanged();
  }
  rosterChanged() {
    if (this.state === 'lobby') this.ui.renderLobby(this.roster, this.net.isHost, this.net.code, this.myId);
    this.syncAvatars(); this.ui.teamKey = '';
  }

  // ---- 通信（参加側）
  clientMsg(m) {
    switch (m.t) {
      case 'welcome':
        this.myId = m.id; this.roster = m.roster;
        if (m.state === 'hunt') { this.beginHunt(m.n || this.roster.length); this.boss._first = true; }
        else { this.state = 'lobby'; this.ui.renderLobby(this.roster, false, this.net.code, this.myId); this.ui.show('sLobby'); }
        break;
      case 'roster': this.roster = m.roster; this.rosterChanged(); break;
      case 'start': this.beginHunt(m.n); break;
      case 'full': this.net.close(); this.state = 'title'; this.ui.message('満員です', 'この部屋は4人で満員でした。'); break;
      case 'snap':
        if (this.state !== 'hunt') return;
        this.boss.applySnapshot(m.b); this.time = m.tm; this.carts = m.c;
        for (const s of m.p) { if (s[0] === this.myId) continue; const a = this.avatars.get(s[0]); if (a) a.apply(s[1]); }
        break;
      case 'ev': if (this.state === 'hunt' || m.e.k === 'end') this.applyEvent(m.e); break;
    }
  }

  // ---- 毎フレーム
  frame(now, background, forced) {
    if (this.manual && !forced) return; // テスト用：手動でコマ送りする
    let dt = Math.min(0.05, (now - this.last) / 1000);
    if (dt <= 0) return;
    this.last = now;
    const world = this.world, boss = this.boss, player = this.player;
    this.aliveT += dt; if (this.aliveT > 1) { this.aliveT = 0; if (this.mode === 'multi') this.net.checkAlive(); }

    if (this.state === 'hunt') {
      const frozen = this.paused && this.mode === 'solo';
      if (this.endT > 0 && !frozen && this.isAuthority()) { this.endT -= dt; if (this.endT <= 0) this.sendResult(); }
      if (this.slowT > 0) { this.slowT -= dt; dt *= 0.3; }
      if (!frozen && this.state === 'hunt') this.updateHunt(dt);
      else this.input.consumeLook();
    } else {
      // タイトル・集会所・リザルトでは竜のまわりをカメラが回る
      this.orbit += dt * 0.11;
      if (this.isAuthority() || this.state !== 'result') { if (boss.dead || this.state === 'result') boss.t += dt; }
      boss.animate(dt);
      let cx = boss.x + Math.sin(this.orbit) * 17, cz = boss.z + Math.cos(this.orbit) * 17;
      const cr = Math.hypot(cx, cz); if (cr > 36) { cx *= 36 / cr; cz *= 36 / cr; } // 外周の岩にめり込まない
      world.camera.position.set(cx, 2.4 + Math.sin(this.orbit * 0.7) * 0.8, cz);
      world.camera.lookAt(boss.x, 3.3, boss.z);
      if (world.camera.fov !== 62) { world.camera.fov = 62; world.camera.updateProjectionMatrix(); }
    }
    this.rage = damp(this.rage, this.state === 'hunt' ? (boss.phase - 1) / 2 : 0, 1.5, dt); world.rage = this.rage;
    this.fx.update(dt, world.camera);
    world.update(dt, world.camera.position);
    this.input.endFrame();
    if (!background) {
      world.render();
      // 重いときは自動で画質を落とす
      if (this.state === 'hunt' && this.settings.qualityAuto && !this.paused) {
        this.fpsAcc += (now - (this._pf || now)); this.fpsN++;
        if (this.fpsN >= 150) {
          const fps = 1000 / (this.fpsAcc / this.fpsN); this.fpsAcc = 0; this.fpsN = 0;
          if (fps < 27 && world.qName !== 'low') { this.settings.quality = world.qName === 'high' ? 'mid' : 'low'; this.applySettings(true); this.ui.toast('動作が重いため画質を下げました（設定で変更できます）', 4000); }
        }
      }
      this._pf = now;
    }
  }

  updateHunt(dt) {
    const boss = this.boss, player = this.player, input = this.input, auth = this.isAuthority();
    input.update(dt);
    this.introT += dt;
    for (let i = 0; i < 4; i++) if (input.pressed('stamp' + (i + 1))) this.sendStamp(i);
    if (input.pressed('view')) this.toggleView();
    player.update(dt, boss);
    const sa = this.selfAvatar;
    if (sa) { sa.g.visible = player.tp; if (player.tp) { sa.apply(player.netState()); sa.update(dt); } else { sa.x = sa.tx = player.x; sa.z = sa.tz = player.z; } }
    // 竜
    if (auth) {
      if (!boss.active && this.introT > 1.7 && !this.ended) { boss.active = true; boss.start('intro'); boss.pickTarget(); this.audio.startMusic(); }
      const list = [{ id: this.myId, x: player.x, z: player.z, alive: player.alive }];
      for (const a of this.avatars.values()) list.push({ id: a.id, x: a.x, z: a.z, alive: a.alive });
      boss.hostUpdate(dt, list);
      if (boss.active && !this.ended) { this.time += dt; if (this.time >= QUEST_LIMIT) this.end(false, '時間切れ'); }
    } else {
      boss.clientUpdate(dt);
      if (boss.active && !this._music) this.audio.startMusic();
    }
    this._music = boss.active;
    boss.animate(dt);
    // 自分への攻撃判定
    const canBeHit = player.alive && !this.ended;
    if (canBeHit) for (const h of boss.hitsOn(player, PLAYER.radius, player.hitsOut)) player.takeHit(h);
    this.hazards.update(dt, canBeHit ? player : null, PLAYER.radius, (h) => player.takeHit(h));
    for (const a of this.avatars.values()) a.update(dt);
    // 送信
    this.snapT += dt;
    if (this.mode === 'multi' && this.snapT >= SNAP_DT) {
      this.snapT = 0;
      if (this.net.isHost) {
        const ps = [[this.myId, player.netState()]];
        for (const a of this.avatars.values()) ps.push([a.id, [+a.tx.toFixed(2), +a.tz.toFixed(2), +a.tyaw.toFixed(2), a.pitch, (ST[a.state] ?? 0), +a.st.toFixed(2), a.hp, a.lv, a.adur]]);
        this.net.broadcast({ t: 'snap', b: boss.snapshot(), p: ps, tm: +this.time.toFixed(2), c: this.carts });
      } else {
        const m = { t: 'ps', s: player.netState() };
        this.statT += SNAP_DT; if (this.statT > 0.7) { this.statT = 0; const s = player.stats; m.st = [Math.round(s.dmg), s.weak, s.just, s.parry, Math.round(s.taken), s.downs]; }
        this.net.send(m);
      }
    }
    // HUD
    const others = [];
    for (const r of this.roster) { if (r.id === this.myId) continue; const a = this.avatars.get(r.id); if (a) others.push({ id: r.id, name: r.name, color: PLAYER_COLORS[r.id % 4], hp: a.hp, alive: a.alive }); }
    this.ui.updateHud(dt, player, boss, this.time, this.carts, others);
    if (player.state === 'dead' && player.st > 1.2 && !this.ended) this.ui.fade(player.respawnT < 0.9);
  }
}

window.__game = new Game();
