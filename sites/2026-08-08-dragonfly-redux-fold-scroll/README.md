# Dragonfly Redux 風 表現デモ — Lerpスムーススクロール × clip-pathフォールドリビール

## 参照元サイト

- **サイト名**: Dragonfly Redux(制作: Studio Freight)
- **URL**: https://www.awwwards.com/sites/dragonfly-redux
- **受賞歴**: Awwwards *Site of the Day*(2026年7月23日)。スコア7.39/10。オレンジ(`#FA4C14`)とブラック(`#000000`)の2色を軸にした配色で、ヒーローの動画・アニメーション・メニュー・チーム紹介・マウスインタラクション・フッターなど複数の要素を持つブランドサイトです。制作は、なめらかスクロールライブラリ「Lenis」の開発元としても知られるクリエイティブスタジオ Studio Freight。

> **本フォルダのコードは学習目的のオリジナル実装です。** 上記サイトの実際のソースコード(HTML/CSS/JS)・デザイン・画像・コピーは一切取得・複製していません。このセッションの実行環境では `awwwards.com` への直接アクセス(WebFetch)がネットワークポリシーでブロックされており(`EGRESS_BLOCKED`)、実サイトを直接閲覧してはいません。代わりに、検索結果に表示されたAwwwardsの紹介文の要約や、Studio Freight自身が別プロジェクト「Dragonfly」について公開しているケーススタディの要約(「スクロールに応じてclip-pathで“折り込み(fold)”のように新しいセクションを演出的にリビールし、GSAP ScrollTriggerのscrubでLenisの補間済みスクロール値と同期させて背景をフェードさせている」という説明)から読み取れる「使用技術・演出の仕組み」だけを手がかりに、見た目・文言・コードすべてをゼロから独自に設計・実装しています。ページ内のコピー(見出し・本文)はすべてこのデモ用に書き下ろしたオリジナルの説明文です。

## 評価されている理由・印象的だった点

検索結果から読み取れる範囲では、このサイトは次の点が評価されています。

- オレンジと黒だけに絞った潔い2色配色と、大きなタイポグラフィによる力強いビジュアル
- WebGL・3D表現とDOMアニメーションを違和感なく組み合わせている点
- 単なる「上から下へスクロール」ではなく、セクションが**舞台の緞帳(どんちょう)のように斜めの折り目を伴って開いていく**、演出性の高いスクロール体験
- Lenis(自社開発のスムーススクロールライブラリ)によって、WebGLとDOMのスクロール位置がフレーム単位でぴったり同期していること

このデモでは、上記のうち「①なめらかスクロール(スムーススクロールのlerp同期)」「②スクロール連動のclip-pathフォールドリビール」「③スクロール進捗による背景色クロスフェード」「④マグネティックボタン」「⑤カーソルに遅れて追従するドット」の5つの仕組みを、外部ライブラリなしのバニラJS/CSSで再現しています。

## 使われている技術・ライブラリの推測

検索結果の要約から確認できた情報として、以下が挙げられています。

- **Lenis** — Studio Freight自社製のスムーススクロールライブラリ。実スクロール値をlerpで滑らかにし、WebGLとDOMのスクロール位置をフレーム単位で同期させる
- **GSAP + ScrollTrigger** — `scrub`オプションでLenisの補間済みスクロール値とアニメーションのタイムラインを同期
- **clip-path** — セクション切り替え時の“折り込み”演出に使用(スクロールに応じて画像やセクションが斜めにマスクされながら現れる)
- **Three.js / react-three-fiber・Next.js・Vue.js** など、3D表現やSPA構築のためのフレームワーク群

このデモでは、Lenis・GSAP・Three.jsといった外部ライブラリを一切使わず、**素のJavaScript(`requestAnimationFrame`によるlerpループ)とCSSの`clip-path`だけ**で、それぞれが実現しているであろう体験の骨格を再現しています。

## 再現コードの仕組みの解説

`index.html` 1ファイルに CSS・JavaScript をすべてインラインで記述しています。実装は、他のプロジェクトにもそのままコピーできる小さな関数の集まりとして書かれています。

1. **`initSmoothScroll(contentEl, spacerEl, opts)` — Lenis風のなめらかスクロール**
   `#smooth-wrapper`(`position:fixed; overflow:hidden`の「窓」)の中に`#smooth-content`(実際のセクションを縦に並べた本体)を置き、別に`#scroll-spacer`という空のdivを用意して、その高さを`contentEl.scrollHeight`と同じにすることで本物のスクロールバー(スクロール可能領域)だけを作ります。
   スクロールイベントで得られる`window.scrollY`を目標値(`target`)とし、`requestAnimationFrame`のループの中で現在値(`current`)を`current += (target - current) * ease`という式で毎フレーム少しずつ近づけ、その`current`値を`#smooth-content`の`translate3d(0, -current px, 0)`に反映しています。これにより、指を止めてもすっと減速しながら止まる、慣性のあるスクロールになります。

2. **`initFoldReveal(panels, skewPercent)` — clip-pathによる“フォールド”リビール**
   各セクション(`.fold-panel`)の`getBoundingClientRect().top`を毎フレーム読み取り、画面下(`vh`)から画面上端(`0`)へ移動する量を`progress`(0〜1)として計算します。
   `progress`を`clip-path: polygon(0% topLeft%, 100% topRight%, 100% 100%, 0% 100%)`の`topLeft`/`topRight`にマッピングし、`topRight`に`skewPercent`分の“ずれ”を加えることで、左右の開くタイミングが少しズレた**斜めの折り目**が生まれます。`progress`が0のときは完全に閉じた線、1のときは通常の四角形(完全に開いた状態)になります。

3. **`initBackgroundCrossfade(bgEl, panels)` — スクロール連動の背景色クロスフェード**
   各パネルには`data-bg`属性で目標色(16進カラー)を持たせています。毎フレーム、画面中央に最も近いパネルを`getBoundingClientRect()`から特定し、そのパネルの`data-bg`色へ向けて背景レイヤー(`#bg-layer`)のRGB値をlerpで近づけています。セクションの境目でパツンと切り替わるのではなく、じわっと色が移り変わっていくのがポイントです。

4. **`initMagnetic(el, strength)` — マグネティックボタン**
   ボタン要素の`mousemove`イベントで、ボタン中心からのカーソルのズレ(x, y)を求め、そのズレに`strength`(0〜1程度)を掛けた分だけボタン自体を`transform: translate()`で動かします。カーソルがボタンから離れる(`mouseleave`)と`transform`をリセットして元の位置に戻します。

5. **`initCursorDot(dotEl)` — カーソルに遅れて追従するドット**
   マウス位置を目標値とし、`initSmoothScroll`と同じ考え方(lerp + `requestAnimationFrame`)でドット要素の位置を追従させています。`mix-blend-mode: difference`を使うことで、黒地でも赤(オレンジ)地でも視認できる反転色のドットになります。

### つまずきやすいポイント(実装時に直面した問題と対策)

- **ネットワーク制限で実サイトを直接見られなかった**: このセッションの実行環境では`awwwards.com`・`thefwa.com`への直接アクセスが`EGRESS_BLOCKED`でした。そのため検索結果に表示された要約文(受賞歴・使用色・別プロジェクトのケーススタディ紹介文)のみを根拠に設計しており、実サイトの正確なレイアウトやセクション構成、タイポグラフィの細部までは確認できていません。このデモは「公開情報から読み取れる範囲での解釈による再現」であり、実サイトの完全な再現ではないことにご留意ください。
- **`position:fixed`の中身に対する`getBoundingClientRect()`のズレ**: `#smooth-content`を`transform`で動かす方式にした場合でも、`getBoundingClientRect()`は`transform`込みの実際の画面上の位置を返してくれるため、`fold`の進捗計算はそのまま素直に動きました。ただし`#scroll-spacer`を`#smooth-content`と別要素にしているため、**スペーサーの高さをコンテンツの実際の高さと常に一致させる**(リサイズ時にも再計算する)ことを忘れると、スクロール可能量とコンテンツの実際の長さがズレてスクロールが最後まで届かなくなる/逆に空白が残る、という問題が起きやすい点に注意しました。
- **lerpの収束判定**: `current`と`target`の差が完全に0になることは浮動小数点演算上ほぼ無いため、`Math.abs(target - current) < 0.05`のようなしきい値で「十分近づいたら等しいとみなす」処理を入れないと、スクロールを止めたあとも`requestAnimationFrame`が意味のない再描画を延々と続けてしまいます(実害は小さいですが、無駄なCPU消費になります)。

## 使い方(コピーしてすぐ使う手順)

1. `index.html` を1ファイルごと自分のプロジェクトにコピーします(外部ライブラリ・画像・フォントへの依存は一切ありません)。
2. そのままダブルクリックで `file://` として開いても動作します。ローカルサーバー経由で見る場合は以下のようにします。

   ```bash
   cd sites/2026-08-08-dragonfly-redux-fold-scroll
   python3 -m http.server 8080
   # ブラウザで http://localhost:8080 を開く
   ```

3. セクション数を増減したい場合は、`<div id="smooth-content">`内の`<section class="fold-panel ...">`を追加・削除するだけで、JS側(`initFoldReveal`・`initBackgroundCrossfade`・`initProgressRail`)は`document.querySelectorAll('.fold-panel')`から自動的に再計算されるため、コードの変更は不要です。
4. 各セクションの背景色は`data-bg="#RRGGBB"`属性を書き換えるだけで変更できます。文字色を切り替えたい場合は`class="fold-panel tone-dark"`(白文字)か`class="fold-panel tone-flame"`(黒文字)を付け替えてください。
5. スクロールの「重さ」(慣性の強さ)を変えたい場合は、`initSmoothScroll(contentEl, spacerEl, { ease: 0.09 })`の`ease`の値を小さくするほど重く、大きくするほど軽快になります(0〜1の範囲、目安は0.05〜0.15)。
6. 折り目の斜め具合は`initFoldReveal(panels, 10)`の第2引数(`skewPercent`)で調整できます。0にすると斜めのない単純な上下ワイプになります。
7. マグネティックボタンの効き具合は`initMagnetic(el, 0.35)`の第2引数(`strength`)で調整できます。値を大きくするほどカーソルへの吸着が強くなります。
