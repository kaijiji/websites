# 灰角 ASHHORN

一人称視点・最大4人の協力狩猟アクション。URLを送るだけで一緒に遊べます（PeerJS / WebRTC のP2P通信、サーバー不要）。

- 遊ぶ: `index.html` を開く（GitHub Pages では `/games/ashhorn/`）
- 作り直す: `npm install` → `npm run build`（`src/` を `game.js` にまとめます）
- 数値調整: `src/config.js`（体力・攻撃力・ランク基準など）

| ファイル | 内容 |
|---|---|
| `src/main.js` | 進行（タイトル→集会所→狩猟→リザルト）と通信の取りまとめ |
| `src/boss.js` | 竜のモデル・動き・AI・攻撃判定 |
| `src/player.js` | 自分の操作と武器、他プレイヤーの見た目 |
| `src/world.js` / `src/fx.js` | 闘技場の描画、エフェクト |
| `src/net.js` | 部屋の作成・参加 |
| `src/audio.js` | 効果音とBGM（すべて合成） |
