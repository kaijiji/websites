# Spectral Field（Rob FWA）— 音声反応ジェネラティブアートの再現

## サイト名とURL

- **サイト名**: Spectral Field（制作: Rob FWA）
- **URL**: https://www.robfwa.com/
- **参照元での評価**: CSS Design Awards「Website of the Day」（2026年8月2日）受賞

## 評価されている理由・印象的だった点

Spectral Field は、ユーザーが手元の音声ファイル（MP3 / WAV / FLAC）をブラウザにドロップするだけで、その曲だけの一点物のジェネラティブアートを生成するという体験が特徴のサイトです。

- 音声はサーバーに送信されず、**すべてブラウザ内（クライアントサイド）で解析・描画**が完結する
- 同じアルゴリズムでも**曲が違えば必ず違う絵になる**（音楽そのものが「筆」になっている）
- 生成された作品は PNG / SVG としてダウンロードでき、アートワークとして持ち帰れる
- UI はミニマルで、主役はあくまで「曲から生まれる絵」そのもの

「音を可視化する」だけでなく「音を素材に一点物のアートを作品として作り上げる」という体験設計が、単なるオーディオビジュアライザーとの違いとして高く評価されたと考えられます。

## 使われている技術・ライブラリの推測

公開情報や一般的な実装パターンから、以下の技術が使われていると推測されます（実際のソースコードは確認・複製していません）。

- **Web Audio API**（`AudioContext` / `AnalyserNode`）: FFT（高速フーリエ変換、解説によると FFT 2048）で音声を周波数成分に分解
- **Canvas 2D または WebGL**: 解析結果をリアルタイムに描画。加算合成（additive blending）による発光表現
- **File API / Drag & Drop API**: ローカルの音声ファイルをそのままブラウザで読み込む
- **決定論的な色・形状の生成ロジック**: ファイル名や音声の特徴量から一意なシード値を作り、曲ごとに異なる配色・構図を再現できるようにしていると推測される
- **Canvas書き出し**: `canvas.toDataURL()` 相当の仕組みでPNG/SVGの保存を実現

## 再現コードの仕組みの解説

このフォルダの `index.html` は、上記の「音声ファイルをドロップすると、その曲固有のジェネラティブアートが描かれる」というコンセプトを、**ゼロから独自実装**したデモです（元サイトのコードは一切参照・転載していません）。

### 1. 音声の解析（Web Audio API）

```js
audioEl = new Audio();
audioEl.src = URL.createObjectURL(file);
sourceNode = audioCtx.createMediaElementSource(audioEl);
analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;
sourceNode.connect(analyser);
analyser.connect(audioCtx.destination);
```

ドロップされた音声ファイルを `<audio>` 要素で読み込み、`AnalyserNode` を経由させることで、再生中の音声を毎フレーム周波数スペクトラム（`getByteFrequencyData`）として取得できます。

### 2. 曲ごとに一意なパレット

```js
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}
hueBase = hashString(file.name) % 360;
```

ファイル名を数値ハッシュに変換し、色相（Hue）のベース値として使うことで、「同じロジックでも曲（ファイル）が違えば必ず違う配色になる」という元サイトの体験を単純な方法で再現しています。

### 3. 円周上に並んだ粒子が音に反応する

あらかじめ円周上に480個の粒子を配置し、それぞれに周波数帯（低域〜中域）を1つずつ割り当てます。毎フレーム、割り当てられた帯域のエネルギーが強いほど、粒子は中心から遠くへ・明るく・大きく描かれます。

```js
const radius = innerR + value * outerR + p.jitter;
const x = cx + Math.cos(angle) * radius;
const y = cy + Math.sin(angle) * radius;
ctx.fillStyle = `hsla(${hue}, 85%, ${45 + value * 30}%, ${0.15 + value * 0.55})`;
```

### 4. 「描き足していく」軌跡表現

キャンバスを毎フレーム完全にクリアせず、ごく薄い黒（`rgba(5,6,10,0.10)`）で塗り重ねることで前フレームがうっすら残り、時間とともに絵が積み重なっていく生成的な軌跡になります。粒子自体は `globalCompositeOperation = 'lighter'`（加算合成）で描くことで、重なった部分が発光したように明るくなります。

### 5. 低域(ベース)によるゆっくりとした回転

低い周波数帯の平均エネルギーを取り出し、それに応じて全体の回転速度と中心の脈動をわずかに変化させることで、ビートに合わせて模様全体がゆっくり呼吸するように動きます。

## 使い方（コピーしてすぐ使う手順）

1. `index.html` を丸ごと自分のプロジェクトにコピーする（このデモは単一ファイルで完結しています）。
2. ブラウザで `index.html` を開く（音声ファイルの読み込みに `AudioContext` を使うため、ローカルで直接開いても動作しますが、file://制限が気になる場合は簡易サーバー経由で開いてください。例: `npx serve .` や `python3 -m http.server`）。
3. 画面上部のドロップゾーンに手元の音声ファイル（MP3/WAV/FLACなど）をドラッグ＆ドロップするか、「クリックしてファイルを選択」から選ぶ。
4. 再生が始まると同時に、曲に合わせたジェネラティブアートの描画が始まります。
5. 「再生 / 一時停止」ボタンで音声を制御、「PNGとして保存」ボタンでその瞬間の作品を画像として保存できます。
6. 自分のプロジェクトに組み込む場合は、`SpectralField` オブジェクト（`init(canvasEl)` / `loadFile(file)` / `togglePlay()` / `saveAsPng()`）をそのまま流用し、UI部分（ドロップゾーンやボタン）だけ自分のデザインに合わせて差し替えてください。

## 注意事項

- このデモは Spectral Field の**観察された表現コンセプト**を独自実装で再現した学習用コードであり、元サイトのHTML/CSS/JavaScriptを複製したものではありません。
- 実際にサイトを訪れる際は、参照元URL（https://www.robfwa.com/）をご確認ください。
