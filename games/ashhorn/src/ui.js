// HUD とメニュー（DOM）
import { PLAYER, PLAYER_COLORS, STAMPS, CARTS, RANKS, MAX_PLAYERS, WEAPONS, WEAPON_IDS } from './config.js';
import { fmtTime, sat, store } from './util.js';

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export class UI {
  constructor(game) {
    this.g = game;
    this.screens = ['sTitle', 'sLobby', 'sHow', 'sSet', 'sPause', 'sResult', 'sMsg'];
    this.current = null; this.backTo = 'sTitle';
    this.bossLag = 1; this.flashT = 0; this.teamKey = '';
    this._bind();
  }

  _bind() {
    const g = this.g, click = (id, fn) => $(id).addEventListener('click', () => { g.audio.init(); g.audio.play('ui'); fn(); });
    $('name').value = store.get('ashhorn.name', '') || '狩人' + Math.floor(100 + Math.random() * 900);
    $('name').addEventListener('change', () => store.set('ashhorn.name', this.name()));
    click('bSolo', () => g.startSolo());
    click('bHost', () => g.hostRoom());
    click('bJoin', () => { const c = $('joinCode').value.trim().toUpperCase(); if (c.length < 4) return this.toast('部屋コードを入力してください'); g.joinRoom(c); });
    $('joinCode').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('bJoin').click(); });
    click('bHow', () => this.show('sHow', 'sTitle'));
    click('bSet', () => this.show('sSet', 'sTitle'));
    click('bPHow', () => this.show('sHow', 'sPause'));
    click('bPSet', () => this.show('sSet', 'sPause'));
    for (const b of document.querySelectorAll('[data-back]')) b.addEventListener('click', () => { g.audio.play('ui'); this.show(this.backTo); });
    click('bCopy', () => this.copy(g.shareUrl(), '招待URLをコピーしました'));
    click('bShare', () => { if (navigator.share) navigator.share({ title: '灰角 ASHHORN', text: '一緒に灰角竜を狩ろう！', url: g.shareUrl() }).catch(() => {}); else this.copy(g.shareUrl(), '招待URLをコピーしました'); });
    click('bStart', () => g.hostStart());
    click('bLeave', () => g.toTitle());
    click('bResume', () => g.resume());
    click('bQuit', () => g.toTitle());
    click('bAgain', () => g.again());
    click('bResQuit', () => g.toTitle());
    click('bResCopy', () => this.copy(this.resultText || '', '結果をコピーしました'));
    click('bMsgOk', () => g.toTitle());
    // タッチ専用ボタン
    const tap = (id, fn) => { const el = $(id); const h = (e) => { e.stopPropagation(); e.preventDefault(); fn(); }; el.addEventListener('touchstart', h, { passive: false }); el.addEventListener('click', h); };
    tap('tbPause', () => g.pause());
    tap('tbView', () => g.toggleView());
    tap('tbStamp', () => $('stampMenu').classList.toggle('hidden'));
    STAMPS.forEach((s, i) => { const b = document.createElement('button'); b.textContent = s; const h = (e) => { e.stopPropagation(); e.preventDefault(); g.sendStamp(i); $('stampMenu').classList.add('hidden'); }; b.addEventListener('touchstart', h, { passive: false }); b.addEventListener('click', h); $('stampMenu').appendChild(b); });
    // 設定
    const s = g.settings;
    const bindRange = (id, key, fmt, apply) => { const el = $(id), out = $(id + 'V'); el.value = s[key]; out.textContent = fmt(s[key]); el.addEventListener('input', () => { s[key] = +el.value; out.textContent = fmt(s[key]); apply(); g.saveSettings(); }); };
    bindRange('oSens', 'sens', (v) => v.toFixed(2), () => g.applySettings());
    bindRange('oVol', 'vol', (v) => Math.round(v * 100), () => g.applySettings());
    bindRange('oMus', 'music', (v) => Math.round(v * 100), () => g.applySettings());
    $('oInv').checked = s.invertY; $('oInv').addEventListener('change', () => { s.invertY = $('oInv').checked; g.applySettings(); g.saveSettings(); });
    $('oView').value = s.view; $('oView').addEventListener('change', () => { s.view = $('oView').value; g.player.tp = s.view === 'tp'; g.saveSettings(); });
    for (const id of ['wpnTitle', 'wpnLobby']) for (const w of WEAPON_IDS) { const b = document.createElement('button'); b.dataset.w = w; b.innerHTML = `${WEAPONS[w].name}<small>${WEAPONS[w].sub}</small>`; b.addEventListener('click', () => { g.audio.init(); g.audio.play('ui'); g.setWeapon(w); }); $(id).appendChild(b); }
    this.renderWeapons();
    $('oQual').value = s.quality; $('oQual').addEventListener('change', () => { s.quality = $('oQual').value; s.qualityAuto = false; g.applySettings(true); g.saveSettings(); });
    if (g.input.isTouch) { $('keysPc').classList.add('hidden'); $('keysTouch').classList.remove('hidden'); }
  }

  renderWeapons() {
    const cur = this.g.settings.weapon;
    for (const b of document.querySelectorAll('.wpn button')) b.classList.toggle('sel', b.dataset.w === cur);
    for (const id of ['wdescTitle', 'wdescLobby']) $(id).textContent = WEAPONS[cur].desc;
  }
  name() { return ($('name').value.trim() || '狩人').slice(0, 10); }

  show(id, backTo) {
    if (backTo) this.backTo = backTo;
    for (const s of this.screens) $(s).classList.toggle('on', s === id);
    this.current = id;
    if (id === 'sTitle') this.renderRecords();
    if (id === 'sSet') { $('oQual').value = this.g.settings.quality; $('oView').value = this.g.settings.view; }
  }
  hideMenus() { this.show(null); }
  fade(on) { $('fade').classList.toggle('on', on); }
  loaded() { const l = $('loading'); l.style.opacity = 0; setTimeout(() => l.remove(), 700); }

  toast(text, ms = 2600) {
    const t = $('toast'); t.textContent = text; t.classList.add('on');
    clearTimeout(this._tt); this._tt = setTimeout(() => t.classList.remove('on'), ms);
  }
  copy(text, okMsg) {
    const fallback = () => { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); this.toast(okMsg); } catch (e) { this.toast('コピーできませんでした'); } ta.remove(); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => this.toast(okMsg), fallback); else fallback();
  }
  message(title, body) { $('msgTitle').textContent = title; $('msgBody').textContent = body; this.show('sMsg'); }

  renderRecords() {
    const rec = store.get('ashhorn.records', {});
    const rows = [];
    for (let n = 1; n <= MAX_PLAYERS; n++) if (rec[n]) rows.push(`${n === 1 ? 'ソロ' : n + '人'} <b>${fmtTime(rec[n].t)}</b>（${rec[n].r}）`);
    $('records').innerHTML = rows.length ? '自己ベスト　' + rows.join('　') : '';
  }

  // ---- ロビー
  renderLobby(roster, isHost, code, myId) {
    $('code').textContent = code;
    $('shareUrl').textContent = this.g.shareUrl();
    let html = '';
    for (let i = 0; i < MAX_PLAYERS; i++) {
      const p = roster[i];
      html += p ? `<div class="slot"><i style="background:${PLAYER_COLORS[p.id % 4]}"></i>${esc(p.name)}<small style="color:var(--dim);font-weight:500">${(WEAPONS[p.w] || WEAPONS.great).name}</small>${p.id === 0 ? '<em>ホスト</em>' : p.id === myId ? '<em>あなた</em>' : ''}</div>` : '<div class="slot empty">募集中…</div>';
    }
    $('slots').innerHTML = html;
    $('bStart').classList.toggle('hidden', !isHost);
    $('lobbyNote').textContent = isHost ? '人数に応じて竜の体力が増えます。1人でも出発できます。' : 'ホストの出発を待っています…';
  }

  // ---- HUD
  hud(on) { $('hud').classList.toggle('on', on); $('touch').classList.toggle('on', on); document.body.classList.toggle('playing', on); if (!on) { $('boss').classList.remove('on'); $('deadMsg').classList.remove('on'); } }
  setMe(name, color) { $('meName').textContent = name; $('meDot').style.background = color; }
  setRoom(code) { $('roomTag').textContent = code ? '部屋 ' + code : 'ソロ'; }

  updateHud(dt, p, boss, time, carts, others) {
    $('hp').style.transform = `scaleX(${sat(p.hp / PLAYER.hp)})`; $('hpLag').style.transform = `scaleX(${sat(p.hpLag / PLAYER.hp)})`;
    $('hp').classList.toggle('low', p.hp < 30);
    $('st').style.transform = `scaleX(${sat(p.stamina / PLAYER.stamina)})`; $('st').classList.toggle('ex', p.exhausted);
    $('low').style.opacity = p.alive && p.hp < 30 ? (0.45 + Math.sin(performance.now() / 180) * 0.25) * (1 - p.hp / 30) + 0.2 : 0;
    $('potN').textContent = p.potions;
    const buffs = (p.buffT > 0 ? `<span>見切り ${Math.ceil(p.buffT)}</span>` : '') + (p.counterT > 0 ? '<span class="c">カウンター可</span>' : '');
    if (buffs !== this._buffs) { $('buffs').innerHTML = buffs; this._buffs = buffs; }
    // 溜めゲージ
    const fg = $('ringFg');
    if (p.state === 'charge') {
      const f = sat(p.st / p.chargeT[2]), over = p.st >= p.chargeOver;
      fg.style.strokeDashoffset = 163.4 * (1 - f); fg.style.stroke = over ? '#8a8a8a' : p.chargeLv >= 3 ? '#ff3a1a' : p.chargeLv >= 2 ? '#ff9a2a' : p.chargeLv >= 1 ? '#ffd24a' : '#fff';
      $('ringBg').setAttribute('opacity', 1);
    } else { fg.style.strokeDashoffset = 163.4; $('ringBg').setAttribute('opacity', 0); }
    // ボス
    const bf = sat(boss.hp / boss.maxHp);
    this.bossLag = this.bossLag > bf ? Math.max(bf, this.bossLag - dt * 0.12) : bf;
    $('bossHp').style.transform = `scaleX(${bf})`; $('bossLag').style.transform = `scaleX(${this.bossLag})`;
    $('boss').classList.toggle('on', boss.active);
    $('mHorn').classList.toggle('done', boss.hornBroken); $('mHorn').textContent = boss.hornBroken ? '角 破壊' : '角';
    $('mTail').classList.toggle('done', boss.tailCut); $('mTail').textContent = boss.tailCut ? '尾 切断' : '尾';
    $('mRage').classList.toggle('hidden', boss.phase < 2); $('mRage').classList.add('rage'); $('mRage').textContent = boss.phase >= 3 ? '激昂・極' : '激昂';
    $('timer').textContent = fmtTime(time);
    $('carts').innerHTML = `残り <b>${'◆'.repeat(Math.max(0, carts))}${'◇'.repeat(Math.max(0, CARTS - carts))}</b>`;
    // 仲間
    const key = others.map((o) => o.id + o.name).join('|');
    if (key !== this.teamKey) {
      this.teamKey = key;
      $('team').innerHTML = others.map((o) => `<div id="tm${o.id}"><div class="pname"><i style="background:${o.color}"></i>${esc(o.name)}</div><div class="bar"><b></b></div></div>`).join('');
    }
    for (const o of others) { const el = $('tm' + o.id); if (!el) continue; el.classList.toggle('dead', !o.alive); el.querySelector('b').style.transform = `scaleX(${sat(o.hp / PLAYER.hp)})`; }
    // ボスの方向
    const ar = $('arrow');
    const da = Math.atan2(Math.sin(Math.atan2(boss.x - p.x, boss.z - p.z) - p.yaw), Math.cos(Math.atan2(boss.x - p.x, boss.z - p.z) - p.yaw));
    if (boss.active && !boss.dead && Math.abs(da) > 0.95 && p.alive) { ar.className = da > 0 ? 'l' : 'r'; ar.textContent = da > 0 ? '◀' : '▶'; } else ar.className = '';
    // 画面フラッシュの減衰
    if (this.flashT > 0) { this.flashT -= dt; $('flash').style.opacity = Math.max(0, this.flashT / this.flashDur) * this.flashMax; }
    // 力尽き表示
    $('deadMsg').classList.toggle('on', p.state === 'dead');
    if (p.state === 'dead') $('deadSub').textContent = this.g.ended ? '' : p.respawnT > 0 ? `キャンプから復帰まで ${Math.ceil(p.respawnT)}` : '';
  }

  flash(kind) {
    const f = $('flash');
    const map = { hurt: ['radial-gradient(ellipse at center,rgba(255,40,20,.25) 0%,rgba(255,20,10,.85) 100%)', 0.9, 0.5], just: ['radial-gradient(ellipse at center,transparent 30%,rgba(255,220,120,.8) 100%)', 0.9, 0.5],
      parry: ['radial-gradient(ellipse at center,rgba(160,220,255,.5) 0%,rgba(120,200,255,.2) 100%)', 0.9, 0.3], heal: ['radial-gradient(ellipse at center,transparent 40%,rgba(90,230,120,.6) 100%)', 0.8, 0.7],
      charge: ['radial-gradient(ellipse at center,transparent 55%,rgba(255,160,60,.5) 100%)', 0.7, 0.25], impact: ['rgba(255,240,220,.35)', 1, 0.18] };
    const m = map[kind]; if (!m) return;
    f.style.background = m[0]; this.flashMax = m[1]; this.flashDur = m[2]; this.flashT = m[2]; f.style.opacity = m[1];
  }
  popup(text, cls) {
    const el = document.createElement('div'); el.className = 'pop ' + (cls || ''); el.textContent = text;
    const box = $('popups'); box.appendChild(el); while (box.children.length > 3) box.firstChild.remove();
    setTimeout(() => el.remove(), 980);
  }
  feed(text, cls) {
    const el = document.createElement('div'); el.className = 'feed ' + (cls || ''); el.textContent = text;
    const box = $('feed'); box.appendChild(el); while (box.children.length > 5) box.firstChild.remove();
    setTimeout(() => el.remove(), 4300);
  }
  banner(text, sub) { const b = $('banner'); b.innerHTML = esc(text) + (sub ? `<small>${esc(sub)}</small>` : ''); b.classList.remove('show'); void b.offsetWidth; b.classList.add('show'); }
  stick(on, x, y, dx, dy) { const b = $('stickBase'); b.classList.toggle('on', on); if (on) { b.style.left = x + 'px'; b.style.top = y + 'px'; $('stickKnob').style.transform = `translate(${dx}px,${dy}px)`; } }

  // ---- リザルト
  showResult(res, isHost, myId) {
    const win = res.win;
    $('resTitle').textContent = win ? '討伐完了' : 'クエスト失敗'; $('resTitle').className = win ? 'win' : 'lose';
    $('resRank').textContent = win ? res.rank : '—'; $('resTime').textContent = fmtTime(res.time);
    let note = win ? '' : res.reason || '';
    if (win && res.best) note = '自己ベスト更新！';
    $('resNote').textContent = note;
    const total = res.rows.reduce((a, r) => a + r.dmg, 0) || 1;
    $('resRows').innerHTML = res.rows.map((r) => {
      const c = PLAYER_COLORS[r.id % 4];
      return `<tr><td><div class="n"><i style="background:${c}"></i>${esc(r.name)}${r.id === myId ? '（あなた）' : ''}${(r.aw || []).map((a) => `<span class="aw">${a}</span>`).join('')}</div><div class="dbar"><b style="width:${(r.dmg / total * 100).toFixed(1)}%;background:${c}"></b></div></td>` +
        `<td>${r.dmg}<br><small style="color:var(--dim)">${Math.round(r.dmg / total * 100)}%</small></td><td>${r.weak}</td><td>${r.just}</td><td>${r.parry}</td><td>${Math.round(r.taken)}</td><td>${r.downs}</td></tr>`;
    }).join('');
    $('bAgain').classList.toggle('hidden', !isHost);
    $('resWait').textContent = isHost ? '' : 'ホストが「もう一度」を押すと再出発します。';
    const n = res.rows.length;
    this.resultText = win ? `【灰角 ASHHORN】灰角竜グラヴァルドを討伐！ ${fmtTime(res.time)} ランク${res.rank}（${n === 1 ? 'ソロ' : n + '人'}）\n${location.origin}${location.pathname}` : `【灰角 ASHHORN】灰角竜グラヴァルドに敗北…（${n === 1 ? 'ソロ' : n + '人'}）\n${location.origin}${location.pathname}`;
    this.show('sResult');
  }
}

export function rankOf(time) { for (const r of RANKS) if (time <= r.t) return r.r; return 'C'; }
