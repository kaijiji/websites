# Page Flip Reveal Demo — MERSI Architecture 風 表現デモ

## 参照元サイト

- **サイト名**: MERSI（建築スタジオ／制作: FLOT NOIR、クリエイティブディレクション: Clément Merouani、クリエイティブ開発: Thomas Carré）
- **URL**: https://www.mersi-architecture.com/
- **受賞歴**: Awwwards *Site of the Day*、The FWA *FOTD*、CSS Design Awards *WOTD*、GSAP *Site of the Week*、Communication Arts *Featured*。パリの建築スタジオ MERSI の実績サイトで、「建築の本(print)とインタラクティブなオブジェクトの間にある体験」をコンセプトに、Webflow(CMS/構造)＋Vite でバンドルしたカスタムJS(GSAP の ScrollTrigger・SplitText・Flip を使用)で構築されています。

> **本フォルダのコードは学習目的のオリジナル実装です。** 上記サイトの実際のHTML/CSS/JS・デザイン・画像・コピー(文章)は一切取得・複製していません。このセッションの実行環境では `mersi-architecture.com` や `awwwards.com`・`tympanus.net` への直接アクセス(WebFetch/curl)がネットワークポリシーでブロックされており(`EGRESS_BLOCKED`)、実サイトを直接閲覧してはいません。代わりに、検索(WebSearch)で得られたCodropsのメイキング記事「Between Print and Digital: The Making of MERSI's Website」やAwwwards/FWA/CSSDA掲載情報の要約から読み取れる「使用技術・演出の仕組み」(GSAP Flipによるページ遷移、SplitTextによる行単位テキストアニメーション、印刷物のような静かで上質なエディトリアルレイアウト、というキーワード)だけを手がかりに、見た目・掲載しているプロジェクト名や文章・コードのすべてをゼロから独自に設計・実装しています。掲載されているプロジェクト名(「Maison de Verre」等)や紹介文は、このデモのために書き下ろした架空のものです。

## 評価されている理由・印象的だった点

検索結果(Codropsのメイキング記事等)から読み取れる範囲では、このサイトは次の点が評価されています。

- 通常のページ遷移ではなく、**プロジェクトのカバー(表紙)がそのままめくれて、そのプロジェクトのケーススタディの中へ入っていく**という、本をめくるような感触のページトランジション
- GSAP の **Flip プラグイン**によって、要素の「今の位置・大きさ」から「次の位置・大きさ」への変化を自動計算し、滑らかに繋いでいること
- GSAP の **SplitText** による、見出しや本文の行・単語単位のテキストリビール
- 装飾を削ぎ落とした配色・タイポグラフィで「上質だが控えめ(quiet luxury)」な印象を作る、印刷物(建築の本)のようなエディトリアルレイアウト

このデモでは、上記のうち「①FLIP技法によるカード⇄全画面のページトランジション(紙が少し反るような3D回転付き)」「②行単位のテキストリビール(SplitText風)」「③カーソルに追従するホバーラベル」の3つの仕組みを、外部ライブラリなしのバニラJS/CSSで再現しています。

## 使われている技術・ライブラリの推測

検索結果の要約から確認できた情報として、以下が挙げられています。

- **Webflow** — サイトの構造・CMS(クライアント自身が更新できる部分)を担当
- **Vite** — カスタムJSレイヤーのバンドラー
- **GSAP** — `ScrollTrigger`(スクロール連動)、`SplitText`(テキスト分割・リビール)、`Flip`(状態間のシームレスな遷移)の3プラグインを使用
- **Netlify** — デプロイ先

このデモでは、GSAPを一切使わず、**素のJavaScriptで「FLIP」というテクニックそのもの(First・Last・Invert・Play)を手書き**し、GSAP SplitTextの「行を分割してマスクの中でせり上げる」という考え方も、あらかじめ改行位置を決めた文章を`<span>`でラップするだけの簡易版として再現しています。

## 再現コードの仕組みの解説

`index.html` 1ファイルに CSS・JavaScript をすべてインラインで記述しています。実装は、他のプロジェクトにもそのままコピーできる小さな関数の集まりとして書かれています。

1. **`openProject(index, cardEl)` / `closeProject()` — FLIP技法によるページトランジション**
   GSAPのFlipプラグインが内部でやっていることを、素のJSで次の4ステップに分けて実装しています。
   - **First**: クリックされたカード(`.project-card`)の`getBoundingClientRect()`を記録する。
   - **Last**: 全画面表示用の詳細ページ(`.detail-page`, `position:fixed; inset:0`)をDOMに追加し、そのレイアウトが確定した状態の`getBoundingClientRect()`を取得する(この時点で見た目はもう全画面になっている)。
   - **Invert**: 全画面の要素に対して、「Firstの見た目(カードの位置・大きさ)」に一致するような`translate()`・`scale()`を`transition:none`で即座に適用する。これで、DOM上はもう全画面レイアウトなのに、画面に見えている絵はまだカードのまま、という状態を作る。ここで`rotateY(8deg)`も混ぜることで「紙が少し反っている」ような開始姿勢を作っている。
   - **Play**: 次のフレーム(`requestAnimationFrame`)で`transition`を有効化し、`transform`を`translate(0,0) scale(1,1) rotateY(0deg)`(何もしていない状態)へアニメーションさせる。見た目上は「カードの位置・大きさから全画面へ、少し立体的に回転しながら育っていく」ページ遷移になる。
   - 閉じるときは逆に、現在の全画面の状態から、元のカードの現在位置(スクロールしていれば動いているのでその都度`getBoundingClientRect()`で再取得)へ向かう`transform`をアニメーションさせ、`transitionend`で要素を削除している。

2. **`buildLines(tag, lines)` / `revealLines(root)` / `hideLines(root)` — SplitText風の行単位テキストリビール**
   `buildLines`は、あらかじめ改行位置を決めた文字列配列(`['静けさの中に、', '建築の輪郭だけを残す。']`)を受け取り、1行ごとに「外側の`<span class="rl">`(`overflow:hidden`のマスク)」と「内側の`<span>`(実際にテキストを持つ、初期状態で`translateY(110%)`だけ下にずらされている)」の2重構造に変換します。
   `revealLines(root)`を呼ぶと、対象の`.rl`要素すべてに`in`クラスが付き、CSSの`transition-delay`(`--d`カスタムプロパティに`行番号 × 70ms`を設定済み)によって、上から順にタイミングをずらしながら内側の`<span>`が`translateY(0)`までせり上がってきます。マスクのおかげで、テキストが下から現れてくるように見えます。

3. **`initHoverLabel(labelEl, targets)` — カーソルに追従するホバーラベル**
   マウス座標を目標値(`mx, my`)とし、`requestAnimationFrame`のループの中でラベル要素の現在位置(`lx, ly`)を`lx += (mx - lx) * 0.18`という式で毎フレーム少しずつ近づけています(lerp)。カードにマウスが乗っている間だけ`.is-visible`クラスでラベルを表示・拡大し、離れると縮小して消えます。

### つまずきやすいポイント(実装時に直面した問題と対策)

- **ネットワーク制限で実サイトを直接見られなかった**: このセッションの実行環境では`mersi-architecture.com`・`awwwards.com`・`tympanus.net`への直接アクセスが`EGRESS_BLOCKED`でした。そのため検索結果に表示されたCodropsのメイキング記事の要約(使用技術・コンセプトの説明文)のみを根拠に設計しており、実サイトの正確なレイアウト・プロジェクト内容・タイポグラフィの細部までは確認できていません。このデモは「公開情報から読み取れる範囲での解釈による再現」であり、実サイトの完全な再現ではないことにご留意ください。掲載しているプロジェクト名・写真代わりの色ブロック・紹介文はすべてこのデモ用に創作したものです。
- **FLIPの`Last`を取得するタイミング**: 詳細ページをDOM追加した直後に`getBoundingClientRect()`を呼ばないと、まだレイアウトが確定していない(あるいは古い`transform`が残っている)状態の値を読んでしまい、`Invert`の計算がずれてカクつきます。追加 → 即座に`Last`計測 → `Invert`用のtransformを`transition:none`で適用 → 強制リフロー(`getBoundingClientRect()`を再度呼ぶ) → `requestAnimationFrame`で`transition`を有効化、という順序を厳守する必要があります。
- **`transform-origin`の指定漏れ**: `scale()`と`translate()`を組み合わせるFLIPでは、`transform-origin`が`center`(デフォルト)のままだと拡大・縮小の基準点がずれて位置がガタつきます。`top left`に固定し、`translate`の計算も要素の`left`/`top`基準(`getBoundingClientRect()`の値そのもの)で行うことで、スケールと移動が正しく噛み合います。
- **行リビールを早く始めすぎる**: `revealLines`をFLIPアニメーションの直後(0ms)に呼ぶと、ページがまだ小さい/回転している最中にテキストが動き出して不自然に見えます。FLIPアニメーションの`duration`(850ms)の半分程度(420ms)待ってから呼ぶことで、「開き終わる少し前からテキストが追いかけてくる」自然なタイミングになります。

## 使い方(コピーしてすぐ使う手順)

1. `index.html` を1ファイルごと自分のプロジェクトにコピーします(外部ライブラリ・画像・フォントへの依存は一切ありません)。
2. そのままダブルクリックで `file://` として開いても動作します。ローカルサーバー経由で見る場合は以下のようにします。

   ```bash
   cd sites/2026-08-08-mersi-architecture-page-flip
   python3 -m http.server 8080
   # ブラウザで http://localhost:8080 を開く
   ```

3. 掲載コンテンツを差し替えたい場合は、`PROJECTS`配列(`title`・`meta`・`lead`・`body`・`tint`)を書き換えるだけです。カードもグリッドもJSが自動生成するため、要素数を変えてもHTML側の編集は不要です。
4. 別の要素にFLIPページ遷移を使いたい場合は、`openProject`/`closeProject`の中の「First → Last → Invert → Play」の4ステップの流れをそのまま流用できます。対象を`.project-card`から任意の要素に変え、`buildDetail`相当の「開いた先のDOMを作る関数」を用意すれば動きます。
5. ページを開く姿勢の反り具合は、`openProject`内の`rotateY(8deg)`の角度を変えると調整できます。`0deg`にすると単純な拡大トランジションになります。
6. 行リビールの間隔は、`buildLines`内の`i * 70`(ミリ秒)を変更すると調整できます。値を大きくするほど、行が現れる間隔がゆっくりになります。
