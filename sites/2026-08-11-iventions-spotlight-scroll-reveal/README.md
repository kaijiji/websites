# Iventions 風 表現デモ — スクロールで移動する「舞台照明」がプロジェクトを1つずつ照らし出すWebGL演出

## 参照元サイト

- **サイト名**: Iventions（大型イベント・スペース制作を手がける国際イベントエージェンシー）
- **URL**: https://iventions.com/
- **受賞歴**: Awwwards *Site of the Day* ＋ *Developer Award*（2025年11月4日）、CSS Design Awards *Website of the Month*（2025年10月）、CSS Design Awards *Website of the Year 2025* ファイナリスト。

> **⚠️ ネットワーク制約に関する重要な注記**
> このセッションの実行環境では、`iventions.com` 本体・`awwwards.com`・`cssdesignawards.com`・`hontran.dev` など、調査対象に関する一次情報へのアクセスがネットワークポリシーで一律ブロックされていました（`EGRESS_BLOCKED`）。そのためブラウザで実際の画面を開いて操作を確認することはできず、Web検索（検索結果のスニペット）で得られる範囲の情報のみを使っています。
> わかったのは、(1) Awwwards Site of the Day / Developer Award・CSS Design Awards Website of the Month等を受賞した実在のイベント制作会社のサイトであること、(2) サイトのコンセプトが「**step into the spotlight**」であり、"beams of light, always moving toward center stage" と表現される、ページ遷移のたびにスポットライトが舞台中央へ向かって移動し続ける演出であること、(3) 技術スタックとして **Next.js / React・headless WordPress・GSAP（ScrollTrigger含む）・Three.js / React Three Fiber** が使われ、「Three.jsのシーンが各プロジェクトを1つの“スポットライトが当たったインスタレーション”のように扱い、GSAPがそのリビールのテンポを演出する」という評（"a Three.js scene treats each project like a spotlit installation, with GSAP pacing the reveals so the page reads like a guided walk-through"）がある、という3点です。実際の配色・レイアウト・カット割り・具体的な案件内容は未確認です。
> したがって本フォルダのコードは、**「舞台照明のコンセプトをWebGLとスクロール連動で再現したイベント制作会社サイト」というジャンルでよく使われるであろう表現技法**を、上記の断片的な情報と一般的な知識から推測し、ゼロから独自に設計・実装した**創作的な再現デモ**です。実サイトのソースコード・デザイン・画像・文言・案件情報は一切取得・複製していません。デモ内では架空のイベント制作会社「**NORTHBEAM**」と架空の案件名（Aurora Summit / Glasshouse Gala / Meridian Games / Constellation Prize）を使用しており、実在の企業・人物・イベントとは関係ありません。

## 評価されている理由・印象的だった点（検索でわかった範囲）

- Awwwards Site of the Day・Developer Award、CSS Design Awards Website of the Month／Website of the Year 2025ファイナリストなど、複数の主要アワードで評価されている
- 「step into the spotlight」というブランドコンセプトを、実際の演出そのもの（ページ間を移動し続けるスポットライトの光）で体現している点
- 「WebGLを“スペクタクル”としてではなく“雰囲気(atmosphere)”として使っている」と評され、派手さよりも案件（プロジェクト）を主役にする控えめな照明表現である点
- Next.js・GSAP・Three.js／React Three Fiberという、この種の受賞サイトで頻出する技術構成を採用している点

このデモでは、上記から読み取れる核となる体験――「**画面のある高さに居座るスポットライトが、スクロールするたびに次の案件を照らし、他の案件は暗がりに沈む**」という一点に絞り、外部ライブラリなしの生WebGL(GLSL)とバニラJavaScript・CSSだけで再現しています。

## 使われている技術・ライブラリの推測

検索結果から確認できた事実は次の4点のみです。

- **Next.js / React** — フロントエンドのフレームワーク
- **headless WordPress** — コンテンツ管理用のCMS(表示側とは別)
- **GSAP（ScrollTriggerを含む）** — スクロール連動アニメーション全般
- **Three.js / React Three Fiber** — スポットライト演出を含む3D/WebGL表現

このデモでは、Three.jsやGSAPそのものは使わず、**生のWebGL(GLSL)とバニラJavaScriptのみ**で、「スクロール位置に応じて次のプロジェクトへ照明が移っていく」という体験の核を再現しています（学習目的で仕組みを理解しやすくするため、意図的に外部ライブラリへの依存をゼロにしています）。

## 再現コードの仕組みの解説

`index.html` 1ファイルにCSS・JavaScriptをすべてインラインで記述しています。中心となるのは `initSpotlightStage(canvas, sections)` という1つの関数です。

### 1. WebGLで描く「舞台照明」のビーム

フラグメントシェーダーの中で、次の3つの光を合成して1本のスポットライトを表現しています。

- **シャフト（光の筋）**: 画面上部の少し外側に「光源」を仮想的に置き、光源から現在のスポット位置(`uSpot`)へ向かう直線を考えます。各ピクセルからその直線までの垂直距離(`perp`)を計算し、光源に近いほど細く・スポットに近いほど太くなる円錐状に`smoothstep`で減衰させることで、舞台照明のような末広がりのビームを描いています。
- **グロー（先端の丸い光だまり）**: スポット位置からの単純な距離減衰(`smoothstep(300.0, 0.0, distance)`)で、光が当たっている場所そのものを丸く明るくしています。
- **ダストモート（空気中の微粒子）**: `hash()`関数でピクセル座標と時間から擬似乱数を作り、しきい値を超えた点だけをビームの中で光らせることで、劇場の照明でよく見る「光の筋の中に舞う塵」のような質感を加えています。

これらを`base色(ほぼ黒) + スポット色 × 光量`として最終的なピクセル色に合成し、キャンバス自体をページの背景として敷いています。

### 2. スクロール位置から「今どのプロジェクトが照らされているか」を決める

```js
var litY = window.innerHeight * 0.42; // 画面内の「照明ゾーン」の高さ(固定)
sections.forEach(function(s){
  var rect = s.el.getBoundingClientRect();
  var centerY = rect.top + rect.height / 2;
  var dist = Math.abs(centerY - litY);
  var lit = Math.max(0, 1 - dist / (window.innerHeight * 0.62));
  lit = lit * lit * (3 - 2 * lit); // smoothstepで滑らかに
  s.el.style.setProperty('--lit', lit);
});
```

スポットライト自体は画面内のほぼ固定された高さ（`litY`）に居座り続けます。動くのはスクロールによって流れていくDOM要素の方です。各`.project`セクションの画面内での中心Y座標を毎フレーム取得し、`litY`にどれだけ近いかを0〜1の`lit`値に変換して、CSSカスタムプロパティ`--lit`として書き込みます。CSS側では

```css
.card{
  filter: brightness(calc(0.35 + var(--lit) * 0.85)) saturate(calc(0.3 + var(--lit) * 0.9));
  opacity: calc(0.45 + var(--lit) * 0.55);
  transform: translateY(calc((1 - var(--lit)) * 18px));
}
```

としているため、`--lit`が0（照明ゾーンから遠い＝暗がり）のときは暗く・彩度が低く・わずかに沈み、`--lit`が1（照明ゾーンの中心）に近づくと明るく・鮮やかに・定位置まで浮かび上がります。**アニメーション自体はCSSの`filter`/`opacity`/`transform`に任せ、JSは`--lit`の数値を書き換えるだけ**という役割分担にしているのがポイントです。

### 3. 一番照らされているセクションに、スポットライトの色と位置を追従させる

毎フレーム、最も`litY`に近いセクション(`best`)を探し、そのセクションが`data-color`属性で指定する色(例: `"255,207,138"`)と、`data-align`属性で指定する画面内の左右位置(0〜1、0.32なら画面のやや左寄り)を「目標値」として取得します。実際に描画に使う値は

```js
current.x += (targetX - current.x) * 0.06;
current.r += (targetColor[0] - current.r) * 0.06;
```

のように、目標値へ毎フレーム6%ずつ近づける単純なlerp（線形補間）で更新しています。これにより、スクロールでアクティブなセクションが切り替わるたびに、スポットライトが瞬間移動せず「すっ」と滑らかに次の案件の位置・色へ移動していく、舞台照明の照明転換(クロスフェード)のような動きになります。

### 4. 起動時の「点灯」演出

ページ読み込み直後は`uIntensity`(光の強さ)を0からスタートし、経過時間に応じたイージング(`1 - (1-t)^3`)で1.4秒かけて1まで持ち上げています。これにより、暗転した舞台に照明がゆっくり灯っていくオープニング演出になっています。

### 5. WebGL非対応環境へのフォールバック

`getContext('webgl')`が失敗した場合は`fallbackLitLoop()`が代わりに動き、WebGL描画はせずに`--lit`の更新だけを続けます。スポットライトのビーム自体は表示されませんが、スクロールに応じてセクションの明暗が変わる体験の骨格だけは残るようにしています。

## 使い方（コピーしてすぐ使う手順）

1. `index.html`をそのままブラウザで開くだけで動作します（外部ライブラリ・ビルド不要）。
2. 自分のサイトに移植する場合は、以下の3点をコピーしてください。
   - `<canvas id="gl">`とその周辺CSS（`position:fixed; inset:0;`で背景として全画面に敷く）
   - `initSpotlightStage()`関数（末尾でDOMから`section.project`要素を集めて呼び出している部分ごと）
   - 照らしたい各セクションに`data-color="R,G,B"`（照明の色）と`data-align="0〜1"`（画面内の左右位置）属性を付ける
3. セクション側のCSSで、`--lit`カスタムプロパティ（0〜1で自動更新される）を`filter`/`opacity`/`transform`などに使えば、そのセクション独自の「照らされ方」を自由にデザインできます。
4. `litY`（`initSpotlightStage`内、画面高さの42%の位置）を変えると、スポットライトが居座る高さを変更できます。ヒーロー直後で強く光らせたい場合は数値を小さく、画面中央で光らせたい場合は0.5に近づけてください。

## 動作確認

Playwright(Chromiumのソフトウェアレンダリング)で、ヒーロー→4案件→フッターまでスクロールし、スクロール位置に応じてスポットライトのビームが上から下へ移動しながら各カードの明暗が切り替わること、コンソールエラーが出ないことを確認済みです。
