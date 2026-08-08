# Önnu Jónu Son — Audiovisual Album Experience(再現デモ)

- **サイト名**: Önnu Jónu Son — *The Radio Won't Let Me Sleep*
- **参照元URL**: https://onnujonuson.com/
- **制作**: Robbin Cenijn(Nolie)による UI/UX デザイン、Aristide Benoist によるディレクション・開発(Ueno / Nolie)
- **受賞歴**: Awwwards Site of the Month、The FWA Site of the Month(参考: https://www.awwwards.com/sites/onnu-jonu-son 、 https://thefwa.com/cases/onnu-jonu-son ）

> ⚠️ このフォルダのコードは、対象サイトの HTML/CSS/JS・映像・楽曲・楽曲名をそのまま複製したものではありません。観察して理解した「表現の仕組み」を、ゼロから自分で書き直したオリジナルの学習用デモです。実写映像の代わりに Canvas で生成した抽象アニメーションを使っています。

## このサイトの何が評価されているか

Önnu Jónu Son はアイスランドのアーティスト(Ueno 創業者としても知られる Haraldur Thorleifsson の別名義)によるアルバム『The Radio Won't Let Me Sleep』のための「音楽 × 映像」体験サイトです。収録曲ひとつひとつに専用のショートフィルムが付いており、サイトはそれらを味わうための箱として設計されています。特に印象的なのは次の3点です。

1. **UIが映像の邪魔をしない**: ナビゲーションや曲名などのUIは既定では画面から消えており、マウスを動かした瞬間だけふわっと現れ、操作が止まるとまた静かに消えていきます(モバイルではタップで切り替え)。映像への没入を最優先した設計です。
2. **横スクロールするタイムライン**: 画面下部に全曲のミニプレビューが並んだ横スクロールの帯があり、これが「目次」兼「選局リモコン」として機能します。クリックすると再生中の曲(映像)が切り替わります。
3. **曲ごとに変わる配色**: 選んだ曲によってサイト全体のアクセントカラーや雰囲気が変化し、アルバムを聴き進めるごとに「サイトの表情」も変わっていきます。

## 使われている技術・ライブラリの推測

公開情報から判断する限り、次のような技術構成が考えられます(公式に技術スタックが明言されているわけではなく、一般的なこの種のサイトの実装傾向からの推測です)。

- HTML5 `<video>` によるフルスクリーン背景映像の再生・切り替え
- GSAP など JS アニメーションライブラリによるUIのフェードイン/アウト制御
- `pointermove` / `touchstart` などのイベントを使った「無操作検知(idle detection)」でUIの表示・非表示を切り替える仕組み
- CSS の `scroll-snap` や JS 制御による横スクロールタイムラインの実装
- 曲ごとの配色データをJSONなどで持ち、CSSカスタムプロパティ(`--accent` など)を書き換えて配色を一括で変える設計

## 再現デモの仕組み(`index.html`)

単一の HTML ファイルに CSS と JavaScript を全てインラインで含めた、依存ライブラリなしのミニマルな再現です。中心となる仕組みは次の3つです。

### 1. Canvasで「実写映像っぽさ」を代替する

実際のショートフィルムの代わりに、`makeFilm()` 関数が `<canvas>` 上へ毎フレーム、複数の移動するラジアルグラデーション(発光する丸いにじみ)を描画し、さらに極小のノイズ(グレイン)を重ねてシネマティックな質感を出しています。曲(トラック)ごとに異なる `hue`(色相)の値を渡すだけで、同じ描画ロジックのまま印象が大きく変わるようにしてあります。

### 2. UIの自動表示・非表示(コアとなる体験)

```js
function showUI(){
  document.body.classList.remove('ui-hidden');
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    document.body.classList.add('ui-hidden');
  }, IDLE_MS);
}
window.addEventListener('pointermove', showUI);
window.addEventListener('pointerdown', showUI);
window.addEventListener('touchstart', showUI, { passive: true });
```

マウスが動く・クリックする・タップする・キーを押す、いずれかが起きるたびに `showUI()` が呼ばれてUIを表示し、`IDLE_MS`(既定 2.6 秒)経っても何も起きなければ自動的に `ui-hidden` クラスを付与してフェードアウトします。CSS 側は `opacity` の `transition` だけで表現しているので、JS はタイマー管理に専念できるシンプルな構成です。

### 3. 横スクロールタイムライン + 曲切り替え

`TRACKS` 配列(曲名・色相のリスト)から `.track` ボタンを動的に生成し、`overflow-x: auto; scroll-snap-type: x proximity;` で横スクロール&スナップを実現しています。クリックすると:

- `targetHue` が更新され、背景の Canvas アニメーションの色相がなめらかに(線形補間で)そのターゲットへ近づいていく
- `--accent` という CSS カスタムプロパティが同じ色相で更新され、曲名テキストや進捗バーの色も連動して変わる
- 選択したトラックのサムネイルが `scrollIntoView` で中央に自動スクロールする

という3つが同時に起こり、「曲を選ぶとサイト全体の表情が変わる」体験を再現しています。

## 使い方(自分のプロジェクトへの組み込み方)

1. `index.html` をそのままコピーして使ってください(外部ライブラリへの依存はありません)。
2. ファイル内の `TRACKS` 配列を書き換えるだけで、曲数・タイトル・配色(`hue`、0〜360の色相値)を自由に変更できます。

   ```js
   const TRACKS = [
     { title: 'Horizon', hue: 18 },
     { title: 'Static',  hue: 200 },
     // ここに追加・編集
   ];
   ```

3. 実際の映像を使いたい場合は、`#film` の `<canvas>` を `<video autoplay muted loop playsinline>` に置き換え、トラック切り替え時に `src` を差し替える処理を `selectTrack()` 内に追加してください(Canvasアニメーションによる `draw()` 呼び出しは不要になります)。
4. UIが消えるまでの時間は `IDLE_MS`(ミリ秒)で調整できます。
5. 配色は `hsl(hue, 78%, 58%)` で計算しているので、`hue` を変えるだけでブランドカラーに寄せることも可能です。彩度・明度は `makeFilm()` 内と `--accent` の生成式の `78%, 58%` を書き換えて調整してください。
