# IL CAMMINO 風 表現デモ — スクロールで辿る「旅の地図」ストーリーテリング

## 参照元サイト

- **サイト名**: The Tuscan Journey Begins（制作: MONOGRID／クライアント: Weekend Max Mara）
- **URL**: https://www.awwwards.com/sites/the-tuscan-journey-begins （Awwwards掲載ページ。本体サイトは常設ではないキャンペーンサイトのため、Awwwards側の紹介ページを参照元とします）
- **受賞・掲載**: Awwwards Nominee（Fashion / Illustration / Sound-Audio 各カテゴリに掲載）。制作会社のMONOGRID（イタリア・フィレンツェ／ミラノ拠点のクリエイティブスタジオ）はWeekend Max Maraの複数のWebキャンペーン（Trench Coat SS24、Holiday Editほか）でもAwwwards掲載歴があります。

> **⚠️ ネットワーク制約に関する重要な注記**
> このセッションの実行環境では、`awwwards.com`・サイト本体・`monogrid.com`・`tympanus.net`(Codrops)など、調査対象に関する一次情報へのアクセスがネットワークポリシーで一律ブロックされていました（`EGRESS_BLOCKED`）。そのためブラウザで実際の画面を開いて操作を確認することはできず、Web検索（検索結果のスニペット）で得られる範囲の情報のみを使っています。
> わかったのは、(1) Weekend Max Maraの「Pasticcino Bag」の世界観をイタリア（トスカーナ）の職人技をめぐる旅として描いた、MONOGRID制作のインタラクティブ・キャンペーンサイトであること、(2) 技術スタックとして **WebGL・GSAP・Vue.js** が使われていると紹介されていること、(3) Awwwardsのカテゴリ分類が「Fashion」「Illustration」「Sound-Audio」であり、"transforming Italian craftsmanship into an immersive digital experience"（イタリアの職人技を没入型のデジタル体験へと変換する）と評されていること、の3点です。実際の配色・具体的なレイアウト・カット割り・インタラクションの細部は未確認です。
> したがって本フォルダのコードは、**「旅／道のりをモチーフにしたスクロールストーリーテリング」というジャンルでよく使われるであろう表現技法**を、上記の断片的な情報と一般的な知識から推測し、ゼロから独自に設計・実装した**創作的な再現デモ**です。実サイトのソースコード・デザイン・画像・文言・ブランド名は一切取得・複製していません。デモ内では架空のブランド「**IL CAMMINO**」（イタリア語で「道・行程」の意）と架空の地名・エピソードを使用しており、実在の企業・人物・商品とは関係ありません。

## 評価されている理由・印象的だった点（検索でわかった範囲）

- Weekend Max Maraのバッグという「モノ」の紹介ではなく、**それが生まれる背景（職人技・土地・意匠の由来）を辿る「旅」として物語化**している点
- Fashion・Illustration・Sound-Audioと、複数のジャンルを横断した評価を受けている点から、**イラストレーション表現とサウンドを組み合わせたストーリーテリング**であることがうかがえる
- WebGL・GSAP・Vue.jsという構成は、この種のハイエンドなキャンペーンサイトで頻出する技術スタックである

このデモでは、上記から読み取れる核となる体験――「**スクロールすることが“旅を進めること”そのものになり、道のりの各地点で職人技のディテールを発見していく**」という構造に絞り、外部ライブラリなしのバニラJavaScript・CSS・インラインSVGだけで再現しています。

## 使われている技術・ライブラリの推測

検索結果から確認できた事実は次の3点のみです。

- **WebGL** — おそらくヒーロー部分やシーン切り替えの視覚効果に使用
- **GSAP** — スクロール連動アニメーション全般（ScrollTrigger相当）
- **Vue.js** — UIの状態管理（章の切り替え、ホットスポットの開閉など）

このデモでは、WebGLやGSAP・Vue.jsそのものは使わず、**生のSVG・CSS・バニラJavaScriptのみ**で、「旅の道のりを1本の線として可視化し、スクロールに連動して進んでいく」という体験の核を再現しています（学習目的で仕組みを理解しやすくするため、意図的に外部ライブラリへの依存をゼロにしています）。

## 再現コードの仕組みの解説

`index.html` 1ファイルにCSS・JavaScriptをすべてインラインで記述しています。IIFEの中に4つの独立した初期化関数があり、それぞれ単体でコピーして使えるように設計しています。

### 1. `initParallaxLayers()` — 背景イラストのパララックス

空・太陽・遠い丘・近い丘・糸杉という5枚の層に、それぞれ`data-speed`属性（0〜1）でスクロールに対する移動速度を割り当てています。

```js
layer.style.transform = "translateY(" + (window.scrollY * speed * -1) + "px)";
```

`speed`が小さい層（空=0.05）はほとんど動かず、大きい層（糸杉=0.5）は大きく動きます。手前のものほど速く流れる、という遠近感の基本原理をそのまま利用しています。

### 2. `initRouteMap()` — 画面に固定された「旅の地図」

画面右端に固定表示されるSVGパス（`<path id="routeTrackFg">`）が、旅の道のりそのものを表しています。ここでの工夫は2点です。

- **道のりの「進み具合」を、ページ全体のスクロール量ではなく、「停留地セクション群の中で画面中央がどこにあるか」で計算している**点です。ヒーローやフッターの高さは人によって調整したくなるものですが、それらを含めた単純なスクロール率を使うと、地図上の現在地と実際に読んでいる内容がずれてしまいます。

```js
function measureStopsRange(){
  var stops = document.querySelectorAll(".stop");
  var first = stops[0], last = stops[stops.length - 1];
  stopsTop = first.offsetTop;
  stopsRange = (last.offsetTop + last.offsetHeight) - stopsTop || 1;
}
function updateScrollFrac(){
  var viewportCenter = window.scrollY + window.innerHeight * 0.5;
  scrollFrac = Math.min(1, Math.max(0, (viewportCenter - stopsTop) / stopsRange));
}
```

- **`getTotalLength()` / `getPointAtLength()`** というSVGのメソッドを使い、`scrollFrac`(0〜1)をパス上の実際のXY座標に変換して、現在地マーカー（`<circle id="routeDot">`）をその座標に置いています。同時に`stroke-dashoffset`を`scrollFrac`に応じて動かすことで、「歩いた分だけ道が濃い線で描かれ、その先はうっすらとした下地の線のまま」という、旅の軌跡を可視化する表現にしています。

```js
fg.setAttribute("stroke-dashoffset", len * (1 - scrollFrac));
var pt = fg.getPointAtLength(scrollFrac * len);
dot.setAttribute("cx", pt.x);
dot.setAttribute("cy", pt.y);
```

### 3. `initSectionReveal()` — 停留地ごとのフェードインと「発見」モーダル

各停留地セクションは`IntersectionObserver`で画面に40%以上入ったタイミングで`.is-visible`クラスが付与され、CSSの`transition`で見出し・本文・ボタンが少し遅延をつけながら下から浮かび上がります（JS側はクラスの付け外しのみ担当し、実際の動きはCSSに任せる設計です）。

「工房を覗く」のようなボタンをクリックすると、`CRAFT_DETAILS`配列から対応するテキストを取り出し、共通のモーダルカードに差し込んで表示します。1つのモーダルDOMを使い回し、中身だけ書き換えるシンプルな実装です。

### 4. `initAmbientAudio()` — Web Audio APIで作る環境音

外部の音声ファイルを一切使わず、次の3つの音源だけで「静かな環境音」を合成しています。

- デチューンした2つの`sawtooth`オシレーター（周波数を`55Hz`と`55.6Hz`にずらすことで、うなり（ビート）による揺らぎを作る）
- `createBuffer()`で自前生成したホワイトノイズを`bandpass`フィルターに通した、風のような質感の音
- 全体を1つの`GainNode`（マスター音量）にまとめ、トグルボタンを押すたびに`linearRampToValueAtTime()`でなめらかにフェードイン・アウトさせる

ブラウザの自動再生制限に配慮し、`AudioContext`はユーザーがボタンをクリックした瞬間に初めて生成しています。

### 5. スクロール処理の一本化

パララックスとルートマップは、どちらも同じ`scrollFrac`（またはスクロール量）に依存するため、更新順序がずれると地図の現在地と本文の表示内容が食い違う原因になります。このデモでは、各`init`関数が更新処理を`frameCallbacks`配列に登録するだけにとどめ、実際の実行は`scroll`イベント発生時に`requestAnimationFrame`で間引かれる`onFrame()`が「まず`updateScrollFrac()`で進捗を更新 → 次に登録済みの全関数を順番に呼ぶ」という1本の流れに統一しています。

```js
function onFrame(){
  updateScrollFrac();
  frameCallbacks.forEach(function(fn){ fn(); });
}
```

## 使い方（コピーしてすぐ使う手順）

1. `index.html`をそのままブラウザで開くだけで動作します（外部ライブラリ・ビルド不要）。
2. 自分のサイトに移植する場合は、以下を単位ごとにコピーしてください。
   - **背景パララックス**: `.scene`内のHTML＋`initParallaxLayers()`。層を増減したい場合は`.layer`要素を追加し、`data-speed`を調整するだけです。
   - **ルートマップ**: `.route-panel`内のHTML（SVGパスの`d`属性は自由に描き直せます）＋`initRouteMap()`＋`measureStopsRange()`/`updateScrollFrac()`。旅の「停留地」にしたい要素に`.stop`クラスと`data-label`属性を付ければ、その数に応じて自動的にラベルが配置されます。
   - **発見モーダル**: `.modal-back`のHTML＋`CRAFT_DETAILS`配列＋`initSectionReveal()`内のモーダル部分。ボタンに`data-craft="配列のインデックス"`を指定するだけで内容を差し替えられます。
   - **環境音トグル**: `.sound-toggle`のHTML＋`initAmbientAudio()`。音色を変えたい場合はオシレーターの`type`・`frequency`やフィルターの`frequency`を調整してください。
3. セクション数（停留地の数）を増減する場合、`.stop`要素とそれに対応する`CRAFT_DETAILS`の要素数を揃えてください。ルートマップのラベル位置は自動的に再配置されます。

## 動作確認

Playwright(Chromiumのソフトウェアレンダリング)で、ヒーローから最終セクションまでスクロール位置を変えながら確認し、(1) スクロール進捗に応じてルートマップの現在地マーカーと実線区間が単調に進むこと、(2) 各停留地セクションが画面中央付近に来たタイミングでテキストがフェードインすること、(3) 「覗く」ボタンで工芸ディテールのモーダルが正しい内容で開閉すること、(4) 環境音トグルのクリックでエラーが出ないこと、コンソールエラーが出ないことを確認済みです。
