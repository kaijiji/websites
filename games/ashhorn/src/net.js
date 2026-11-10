// PeerJS（WebRTC）によるP2P通信。部屋を作った人がホスト、他は全員ホストに接続する
import { Peer } from 'peerjs';

const PREFIX = 'ashhorn-v1-';
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const makeCode = () => Array.from({ length: 5 }, () => ALPHABET[(Math.random() * ALPHABET.length) | 0]).join('');

function peerOptions() {
  // 開発用: ?peerhost=localhost&peerport=9000 で自前のシグナリングサーバーを使う
  const q = new URLSearchParams(location.search);
  if (q.get('peerhost')) return { host: q.get('peerhost'), port: +(q.get('peerport') || 9000), path: '/', secure: false, debug: 1 };
  return { debug: 1 };
}

export class Net {
  constructor(h) {
    this.h = h;            // { onJoin(id), onLeave(id), onMessage(id, msg), onHostLost() }
    this.peer = null; this.isHost = false; this.code = '';
    this.conns = new Map(); // ホスト側: id → 接続
    this.hostConn = null;   // 参加側
    this.nextId = 1;
  }

  host(tries = 0) {
    return new Promise((resolve, reject) => {
      const code = makeCode();
      const peer = new Peer(PREFIX + code, peerOptions());
      let done = false;
      const to = setTimeout(() => { if (!done) { done = true; peer.destroy(); reject(new Error('接続サーバーに繋がりませんでした')); } }, 15000);
      peer.on('open', () => {
        if (done) return; done = true; clearTimeout(to);
        this.peer = peer; this.isHost = true; this.code = code;
        peer.on('connection', (conn) => this._accept(conn));
        peer.on('disconnected', () => { try { peer.reconnect(); } catch (e) { /* 既存の接続はそのまま使える */ } });
        resolve(code);
      });
      peer.on('error', (err) => {
        if (done) return;
        done = true; clearTimeout(to); peer.destroy();
        if (err.type === 'unavailable-id' && tries < 4) this.host(tries + 1).then(resolve, reject);
        else reject(new Error('部屋を作れませんでした（' + (err.type || err.message) + '）'));
      });
    });
  }

  _accept(conn) {
    conn.on('open', () => {
      const id = this.nextId++;
      conn._pid = id; conn._seen = performance.now();
      this.conns.set(id, conn);
      this.h.onJoin(id);
    });
    conn.on('data', (msg) => { if (conn._pid != null) { conn._seen = performance.now(); this.h.onMessage(conn._pid, msg); } });
    const leave = () => { if (conn._pid != null && this.conns.get(conn._pid) === conn) { this.conns.delete(conn._pid); this.h.onLeave(conn._pid); } };
    conn.on('close', leave); conn.on('error', leave);
  }

  join(code) {
    return new Promise((resolve, reject) => {
      const peer = new Peer(peerOptions());
      let done = false;
      const fail = (m) => { if (!done) { done = true; clearTimeout(to); peer.destroy(); reject(new Error(m)); } };
      const to = setTimeout(() => fail('部屋に接続できませんでした。コードを確認してください'), 20000);
      peer.on('open', () => {
        const conn = peer.connect(PREFIX + code.toUpperCase(), { reliable: true, serialization: 'json' });
        conn.on('open', () => {
          if (done) return; done = true; clearTimeout(to);
          this.peer = peer; this.isHost = false; this.code = code.toUpperCase(); this.hostConn = conn; this.lastSeen = performance.now();
          resolve();
        });
        conn.on('data', (msg) => { this.lastSeen = performance.now(); this.h.onMessage(0, msg); });
        const lost = () => { if (this.hostConn === conn) { this.hostConn = null; this.h.onHostLost(); } };
        conn.on('close', lost); conn.on('error', lost);
      });
      peer.on('error', (err) => {
        if (err.type === 'peer-unavailable') fail('その部屋は見つかりませんでした');
        else fail('接続エラー（' + (err.type || err.message) + '）');
      });
    });
  }

  send(msg) { if (this.hostConn && this.hostConn.open) this.hostConn.send(msg); }
  sendTo(id, msg) { const c = this.conns.get(id); if (c && c.open) c.send(msg); }
  broadcast(msg, except) { for (const [id, c] of this.conns) if (id !== except && c.open) c.send(msg); }
  kick(id) { const c = this.conns.get(id); if (c) { this.conns.delete(id); try { c.close(); } catch (e) { /* 既に切れている */ } } }

  // 無通信の相手を落とす。毎秒くらい呼ぶ
  checkAlive() {
    const now = performance.now();
    if (this.isHost) { for (const [id, c] of this.conns) if (now - c._seen > 9000) { this.conns.delete(id); try { c.close(); } catch (e) { /* 無視 */ } this.h.onLeave(id); } }
    else if (this.hostConn && now - this.lastSeen > 9000) { const c = this.hostConn; this.hostConn = null; try { c.close(); } catch (e) { /* 無視 */ } this.h.onHostLost(); }
  }

  close() {
    this.conns.clear(); this.hostConn = null;
    if (this.peer) { try { this.peer.destroy(); } catch (e) { /* 無視 */ } this.peer = null; }
    this.isHost = false; this.code = ''; this.nextId = 1;
  }
}
