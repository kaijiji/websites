# PAINT REVEAL CORRIDOR — スケッチが色づく3D回廊 再現デモ

## 参照元サイト

- **サイト名**: ITom — Tomasz "ITom" Szmajda のインタラクティブ・スケッチポートフォリオ
- **URL**: https://itomdev.com/
- **受賞歴**: FWA *Site of the Day*(2026年4月25日)、GSAP *Site of the Day*。Awwwards では同氏の過去バージョンの作品が Honorable Mention を受賞しています。

> **本フォルダのコードは学習目的のオリジナル実装です。** 参照元サイトの実際のソースコード(HTML/CSS/JS)・3Dモデル・イラスト・写真・テキストコピーは一切取得・複製していません。また、このセッションのネットワーク環境では `itomdev.com` および Awwwards・FWA本体への直接アクセスがネットワークポリシーでブロックされていたため、実サイトを直接閲覧してはいません。検索結果に表示された紹介記事(Muzli、Awwwards等)の要約情報だけを手がかりに、見た目・演出の「仕組み」を理解した上で、コード・アートワーク・文言はすべてゼロから独自に設計・実装しています。作中のイラスト・構図はすべてこのデモ用に生成した抽象パターンのダミーです。

## 評価されている理由・印象的だった点

検索結果から確認できた紹介記事の要約によると、ITomのポートフォリオは次の点が評価されています。

- **単一の3Dモデルを使わない発想の転換** — フラットなジオメトリ(平面)に「手描きスケッチ風テクスチャ」を貼るだけで、複雑な3Dモデリングをせずに絵本のような世界観を作っている
- **`PaintRevealMaterial` という独自GLSLシェーダー** — 近づいたりホバーしたりすると、鉛筆スケッチが絵の具で塗られるように色づいていく、という名前の通りの演出
- **「歩いて進む」回廊構造** — スクロールでページを下に流すのではなく、紙が破れて中に入り込み、鉛筆で描かれた回廊を奥へ奥へと歩いていくような構成になっている
- **凝った複合カメラシステム** — 部屋ごとに演出が変わる(紙飛行機を飛ばして経歴を辿る、など)、単なる直線移動ではないカメラワーク
- 実装だけでなく **サウンドデザイン**(足音や環境音)も評価対象になっている

## 使われている技術・ライブラリの推測

検索結果の要約から、以下の技術的特徴が使われていると推測しました。

- **React Three Fiber(Three.js を Reactから宣言的に使うラッパー)** — シーングラフをコンポーネントとして組んでいると推測されます
- **カスタムGLSLシェーダー(`PaintRevealMaterial`)** — スケッチテクスチャと着色テクスチャの2枚を、何らかのマスク(距離・ホバー座標など)でブレンドしていると推測されます
- **GSAP** — カメラワークやシーン間の演出タイミング制御
- **Web Audio API** — 足音・環境音などのインタラクティブサウンド

このデモでは、React Three Fiberの代わりに **Three.js を直接、依存ライブラリなしのバニラJavaScriptから** 使っています。GSAPやReactが無くても「スクロール量→カメラ位置」「距離→シェーダーの塗り具合」といった処理は素のJavaScriptで十分書けることを実感できるようにするためです。

## 再現コードの仕組みの解説

`index.html` 1ファイルにHTML・CSS・JavaScriptをすべてインラインで記述し、3D描画のみ `vendor/three.module.min.js`(MITライセンスのThree.js本体)を読み込んでいます。大きく4つの仕組みに分かれており、それぞれ他プロジェクトにもそのままコピーできます。

### 1. 手描きスケッチ⇔着色版のアートワークを「その場で」生成する

対象サイトのイラストは一切使えないため、`buildComposition(seed)` で**シード値から毎回同じ抽象的な構図**(ブロブ状の図形と数本の走り線)を組み立て、その座標データを `drawSketchTexture()`(鉛筆風・クロスハッチ影付き)と `drawColorTexture()`(グラデーション着色版)の2つの関数で、それぞれ別々の `<canvas>` に描画しています。

```js
function seededRandom(seed) {
  let s = (seed % 2147483647 + 2147483647) % 2147483647 || 1;
  return function () {
    s = (s * 16807) % 2147483647; // 線形合同法
    return (s - 1) / 2147483646;  // 0〜1に正規化
  };
}
```

同じ `seed` から同じ乱数列を再現できるので、**スケッチ版と着色版で輪郭がぴったり一致する**という、この演出の肝になる部分を保証しています。生成した2枚の `<canvas>` は、そのまま `THREE.CanvasTexture` としてGPUに送っています。

### 2. `PaintRevealMaterial` 相当のシェーダー

`THREE.ShaderMaterial` に2枚のテクスチャ(`uSketch` / `uColor`)と、塗りの進み具合を表す `uReveal`(0〜1.3)を渡し、フラグメントシェーダー内で中心からの距離によってブレンドしています。

```glsl
vec2 center = vec2(0.5, 0.46);
float dist = distance(vUv, center);
float edgeNoise = (hash(floor(vUv * 48.0)) - 0.5) * 0.05; // 塗りムラ
float mask = smoothstep(0.02, -0.02, dist - uReveal + edgeNoise);
vec3 col = mix(sketch, color, mask);
```

`edgeNoise` を境界の判定に足すことで、真円ではなく絵筆で塗ったようなギザギザの輪郭になります。`uReveal` の値をJavaScript側からアニメーションさせるだけで、「じわっと塗り広がる」演出が実現できます。

### 3. 「歩いて進む」回廊とカメラのドリー移動

額を左右の壁に交互に(`side = i % 2 === 0 ? -1 : 1`)Z軸方向に並べ、カメラはZ軸方向にだけ移動する(ドリー)シンプルな構成です。ホイール量・ドラッグ量を `scrollTarget` に積算し、実際に描画で使う `camera.position.z` は毎フレーム `lerp` で追いかけさせています。

```js
scrollCurrent += (scrollTarget - scrollCurrent) * Math.min(1, dt * 4);
camera.position.z = 2 - scrollCurrent;
```

入力値を即座に反映せず「目標値に少しずつ近づける」だけで、GSAPのようなライブラリなしでも慣性のあるスムーズスクロールの質感が出せます。マウスのX/Y位置もカメラの向き・高さにわずかに反映しており(パララックス)、"見回している" 感覚を加えています。

### 4. 距離ベースのリベール判定

各額(`frames` 配列)は、カメラとのZ距離が `TRIGGER_DIST` 未満になった瞬間に `triggered = true` へ切り替わり、そこから `uReveal` の目標値が `1.3` になって塗りが進みます。一度塗られた額は戻りません(「歩いて近づいたら、そのまま塗られたまま」という体験を優先しました)。

```js
const dist = Math.abs(camera.position.z - f.z);
if (dist < TRIGGER_DIST) f.triggered = true;
const target = f.triggered ? 1.3 : 0;
f.revealed += (target - f.revealed) * Math.min(1, dt * 1.8);
```

カスタムカーソル(`#cursor`)も同じ仕組みで、近くの額がリベール中かどうかによって大きさが変わるようにしています。

## 使い方(コピーしてすぐ使う手順)

1. `index.html` と `vendor/three.module.min.js` を、自分のプロジェクトの好きな場所にそのままコピーします(フォルダ構成を保ってください)。
2. `FRAME_COUNT` / `SPACING` を変えると、回廊の長さと額の枚数を調整できます。
3. `buildComposition()` は完全に差し替え可能です。実際の作品画像を使いたい場合は、`drawSketchTexture` / `drawColorTexture` の代わりに、あらかじめ用意した「線画版」「着色版」の2枚の画像を `THREE.TextureLoader` で読み込むだけで、シェーダー部分(`PaintRevealMaterial` 相当)はそのまま使えます。
4. `TRIGGER_DIST` を小さくすると「もっと近づかないと塗られない」、大きくすると「遠くからでも塗られ始める」演出になります。
5. `file://` で直接開くとブラウザによっては `type="importmap"` や `type="module"` が制限される場合があるため、`npx serve` や `python3 -m http.server` などの簡易サーバー経由で開くことをおすすめします。

`vendor/three.module.min.js` は、npm公式レジストリで配布されているMITライセンスのオープンソースライブラリ(Three.js)をそのまま同梱したものです。対象サイトの著作物ではなく、誰でも自由に利用できるライブラリなので、自分のプロジェクトでもそのまま使えます。バージョンを更新したい場合は [three.js](https://www.npmjs.com/package/three) のnpmパッケージを取得し直してください。
