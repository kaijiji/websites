# EXPERIMENT ARCHIVE — マグネットカーソル×ホバープレビュー×ドラッグストリーム 再現デモ

## 参照元サイト

- **サイト名**: Obys® Experiment Space(制作: [Obys](https://obys.agency/) — Awwwards *Studio of the Year 2023*、CSS Design Awards *Studio of the Year* 4回受賞(2020, 2021, 2023, 2024)のウクライナのデザイン・開発スタジオ)
- **URL**: https://experiment.obys.agency/
- **受賞歴**: Awwwards *Site of the Day*(2026年7月28日)。Awwwards掲載ページ: https://www.awwwards.com/sites/obys-r-experiment-space 、CSS Design Awards掲載ページ: https://www.cssdesignawards.com/sites/obys-experiment-space/49564/

> **本フォルダのコードは学習目的のオリジナル実装です。** 参照元サイトの実際のソースコード(HTML/CSS/JS)・画像・文言は一切取得・複製していません。このセッションのネットワーク環境では `experiment.obys.agency` 本体・`awwwards.com` 本体・`cssdesignawards.com` 本体への直接アクセスがネットワークポリシーでブロックされていたため、実サイトを直接閲覧してはいません。Web検索結果に表示された紹介文・レビューの要約(コンセプト・受賞歴・インタラクションの特徴、および同スタジオの他サイトで知られる「吸着してラベルが変わるマグネティックカーソル」といった代表的な演出傾向)だけを手がかりに、見た目・文言・コードすべてをゼロから独自に設計・実装しています。掲載している作品名・カラーはすべて架空のダミーです。

## 評価されている理由・印象的だった点

検索結果の要約によると、Obys® Experiment Spaceは「これまで外部に公開されてこなかった、Obysの未発表の作品・ボツ案・実験・別案をまとめたインタラクティブなアーカイブ」で、次のような点が紹介されています。

- 単なるポートフォリオではなく、**完成した制作物の裏にある「モーションテスト」「使われなかったコンセプト」「空間構成の実験」といった過程そのもの**を見せるアーカイブという企画自体がユニーク
- アーカイブが**構造化されたグリッド表示**と、**横に流れるストリーム表示**という異なる見せ方の間を、ナビゲーションや操作を通じて連続的に行き来できる、常に姿を変え続けるインターフェースとして設計されている
- Obys自体が、要素に吸着してなめらかな弾性(イーズ)で動く**マグネティックカーソル**を持ち味とするスタジオとして知られている

この再現デモでは、上記の中でも特に**「①要素に吸着してラベルが変わるマグネティックカーソル」「②アイテムにカーソルを乗せると浮遊サムネイルが追従するホバープレビュー」「③グリッドと横ストリームという2つのレイアウトの間をなめらかに行き来する切り替え」**という3つのインタラクションの骨格部分にフォーカスして再現しています。

## 使われている技術・ライブラリの推測

具体的なコードは確認できていませんが、この種の受賞歴のあるスタジオ系ポートフォリオ/アーカイブサイトでは、一般的に次のような技術要素が使われることが多いと考えられます。

- **GSAP(ScrollTrigger / Flip プラグインなど)** — レイアウト切り替え時の要素の滑らかな再配置アニメーション
- **カスタムカーソルの自前実装**(またはそれに類する軽量ライブラリ) — 要素ごとにラベルや大きさが変わるマグネティックカーソル
- **Lenis 等の慣性つきスムーススクロール** — ページ全体やストリーム部分の「重みのある」スクロール感
- **Next.js / Nuxt などのモダンフレームワーク + WebGLは最小限** — このサイトはWebGLの3D演出そのものよりも、タイポグラフィ・レイアウト・カーソル/ホバーの気持ちよさで魅せるタイプと推測されるため、演出の主役はDOM操作とCSS transformだと考えられる

このデモでは、**外部ライブラリを一切使わず、Vanilla JavaScriptの `requestAnimationFrame` ループとCSS transformだけ**で、上記の主要インタラクションを再現しています。「GSAPのような専用ライブラリがなくても、じわっと追従する・弾性を感じる動きの多くは数行のlerp(線形補間)計算で作れる」ことを体験してもらう狙いです。

## 再現コードの仕組みの解説

`index.html` 1ファイルにCSS・JavaScriptをすべてインラインで記述しています(外部ライブラリへの依存なし)。中心となるのは以下4つの、そのまま他のプロジェクトにコピーして使える関数です。

### 1. マグネティックカーソル — `createMagneticCursor(cursorEl, labelEl)`

```js
function onMove(e){
  pos.x = e.clientX; pos.y = e.clientY;
  const target = e.target.closest('[data-cursor-label]');
  if (target){
    const r = target.getBoundingClientRect();
    magnetTarget = { x:r.left + r.width/2, y:r.top + r.height/2 };
    ...
  } else {
    magnetTarget = null;
  }
}
// 毎フレーム: 吸着対象があればその中心へ、なければポインタ位置へ lerp で近づく
const goal = magnetTarget || pos;
render.x += (goal.x - render.x) * 0.22;
```

ポイントは「カーソルの見た目の座標」と「実際のマウス座標」を分離していることです。`data-cursor-label` 属性を持つ要素の上に乗ると、目標座標がマウス位置ではなく**その要素の中心**に切り替わります。この目標座標へ毎フレーム少しずつ近づける(lerp)ことで、カーソルが要素にふわっと吸い寄せられる「マグネット」効果になります。ラベル文字列も `data-cursor-label` の値からそのまま表示するので、ボタンには「SWITCH」、カードには「VIEW」というように要素ごとに切り替わります。

### 2. カーソル追従ホバープレビュー — `createHoverPreview(previewEl, swatchEl, itemsSelector, onEnterItem)`

```js
render.x += (pos.x - render.x) * 0.14; // マグネティックカーソルより係数を小さくして「一歩遅れる」
```

考え方はマグネティックカーソルと同じlerpですが、追従係数を`0.22`より小さい`0.14`にすることで、カーソルよりワンテンポ遅れて浮遊しているような質感を出しています。アイテムにマウスが乗った瞬間(`active`が`false→true`に変わった瞬間)だけ`onEnterItem`コールバックを呼び、プレビューの中身(色や画像)を差し替えます。

### 3. 慣性つきドラッグストリーム — `createDragStream(wrapperEl, trackEl)`

```js
function momentumLoop(){
  if (Math.abs(velocity) < 0.02) return;
  velocity *= 0.93;               // 摩擦による減衰
  x = clamp(x + velocity * 16);
  apply();
  requestAnimationFrame(momentumLoop);
}
```

ブラウザのネイティブな `overflow-x:scroll` を使わず、`translate3d(x, 0, 0)` の `x` という数値を自前で管理しています。ドラッグ中はポインタの移動量をそのまま`x`に反映し、指を離した瞬間の速度(`velocity`、px/ms)を記録しておいて、離した後は毎フレーム速度を`0.93`倍ずつ減衰させながら座標を進めます。これだけで「指を離した後もしばらく滑ってから止まる」モーメンタムスクロールになります。ホイール操作にも対応しており、`deltaY`を横方向の移動量として使うことで、通常の縦ホイールで横ストリームを操作できます。

### 4. FLIP法によるグリッド⇄ストリーム切り替え — `flipLayout(archiveEl, nextView)`

```js
const first = new Map(items.map(el => [el, el.getBoundingClientRect()])); // First: 変更前の位置を記録
archiveEl.classList.add(nextView);                                        // レイアウトを即座に切り替え
items.forEach(el => {
  const l = el.getBoundingClientRect();     // Last: 変更後の位置
  const dx = f.left - l.left, dy = f.top - l.top;
  const sx = f.width / l.width, sy = f.height / l.height;
  el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`; // Invert: 差分だけ逆に瞬間移動
  requestAnimationFrame(() => {
    el.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1)';
    el.style.transform = '';                // Play: transformを0に戻すアニメーションで自然に着地
  });
});
```

CSS Gridの4列レイアウトから横一列のFlexレイアウトへ、DOMの並び替えなしでいきなりクラスを切り替えると、要素は瞬間移動してしまいます。そこで**FLIP (First / Last / Invert / Play)** というテクニックを使い、「切り替え前の位置」と「切り替え後の位置」の差分を計算し、切り替え直後は`transform`で見た目上だけ元の位置に戻しておいてから(Invert)、transitionを付けて`transform`を`0`に戻す(Play)ことで、要素があたかも滑らかに移動しながら並び替わったように見せています。GSAPのFlipプラグインが内部で行っていることと同じ原理を、素のDOM APIだけで実装しています。

## 使い方(コピーしてすぐ使う手順)

1. `index.html` をそのまま自分のプロジェクトにコピーします(外部ライブラリ不要)。
2. `<script>` 先頭の `ITEMS` 配列を、自分のコンテンツ(タイトル・色・実際の画像URLなど)に差し替えます。`hue`をやめて`background-image: url(...)`に変更すれば実写真も使えます。

   ```js
   const ITEMS = [
     { no:'01', name:'作品タイトル', hue:12 },
     // ...
   ];
   ```

3. カーソルにラベルを出したい要素には、任意の場所に `data-cursor-label="表示したい文字"` を付けるだけで、`createMagneticCursor` が自動的に反応します(ボタン・リンク・カードなど何にでも使えます)。
4. ホバープレビューの中身を画像に差し替えたい場合は、`createHoverPreview` の第4引数 `onEnterItem(item, swatchEl)` の中で `swatchEl.style.backgroundImage` を設定してください。
5. グリッド以外のビュー(例えばリスト表示など)を増やしたい場合は、対応するCSSクラスを用意した上で `flipLayout(archiveEl, '新しいクラス名')` を呼ぶだけで、既存の要素がその新しい並びへ滑らかにアニメーションします。
6. タッチ端末では `matchMedia('(pointer:coarse)').matches` を見て、カスタムカーソル・ホバープレビューを自動的に無効化しています(スマートフォンでの誤動作防止)。挙動を変えたい場合はこの判定部分を調整してください。
