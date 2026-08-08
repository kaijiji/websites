# websites

優れたWebデザイン・独創的な表現(3Dグラフィックス、スクロール連動アニメーション、ゲームのようなインターフェース、カスタムカーソルなど)を持つ実在のサイトを分析し、学習用に再現したデモコードと日本語の解説をまとめたリポジトリです。

Awwwards・CSS Design Awards・FWA などで評価されたサイトを1つずつ取り上げ、`sites/` 以下にフォルダを作成しています。各フォルダには以下が含まれます。

- 表現技法をオリジナルで再現した動くデモコード（対象サイトのソースコードはコピーしていません）
- 初心者にもわかりやすい日本語の解説 README.md

## 収録サイト一覧

| 日付 | サイト名 | 参照元URL | 主な表現技法 | フォルダ |
| --- | --- | --- | --- | --- |
| 2026-08-01 | 2xA(制作: 2xA studio) | https://2xa.studio/ | #0F0F0F/#FDFDFD の2色構成・マウス位置に吸着するマグネティックカーソル・カーソルとの距離に応じて格子点がばね物理で反発するグリッド・ディストーション・継ぎ目のない無限マーキーを持つコード駆動デザインスタジオ自身のポートフォリオサイト | [sites/2026-08-01-2xa-studio-code-grid-cursor](sites/2026-08-01-2xa-studio-code-grid-cursor) |
| 2026-08-07 | Bruno Simon — Portfolio | https://bruno-simon.com | WebGL(Three.js) + 物理演算(cannon-es)による3Dドライビング・ポートフォリオ | [sites/2026-08-07-bruno-simon-portfolio](sites/2026-08-07-bruno-simon-portfolio) |
| 2026-08-07 | Lacoste — Ace Breaker | https://members-play.lacoste.com/ace-breaker-rg/ | WebGL(Three.js)による3Dブロック崩しのブラウザゲーム演出(パーティクル・カメラシェイク・コンボ) | [sites/2026-08-07-lacoste-ace-breaker](sites/2026-08-07-lacoste-ace-breaker) |
| 2026-08-07 | Serotoninn | https://serotoninn.com/ | キネティックタイポグラフィ・カスタムカーソル・ピン留め横スクロールギャラリー・フィルムグレイン演出を持つファッションブランドサイト | [sites/2026-08-07-serotoninn-brand-universe](sites/2026-08-07-serotoninn-brand-universe) |
| 2026-08-08 | Alethia | https://www.alethia.earth/ | 2トーン配色・スクロール連動のシグナル波形可視化・段階点灯する検証タイムライン・カウントアップ統計を持つ環境インテリジェンス・プラットフォームサイト | [sites/2026-08-08-alethia-signal-storytelling](sites/2026-08-08-alethia-signal-storytelling) |
| 2026-08-08 | Noomo Showcase | https://showcase.noomoagency.com/ | プロジェクト一覧ホバーでカーソルに追従する3Dワイヤーフレームプレビュー(WebGL/Three.js)・慣性スムーススクロール・分割テキストリベール・グラスモーフィズムカードを持つエージェンシーのショーケースサイト | [sites/2026-08-08-noomo-showcase-3d-hover](sites/2026-08-08-noomo-showcase-3d-hover) |
| 2026-08-08 | Hearst Exhibit 2026 | https://www.hollywoodexhibit2026.com/ | スクロール位置に応じて写真がグレースケールからカラーへWebGLシェーダーでリビールされ、クリックでFLIP法によりそのまま拡大表示されるハリウッド写真展のギャラリーサイト | [sites/2026-08-08-hearst-exhibit-scroll-gallery](sites/2026-08-08-hearst-exhibit-scroll-gallery) |
| 2026-08-08 | Hubtown(制作: Unseen Studio) | https://hubtown.co.in/ | Three.jsによる単一の3Dモノリスオブジェクトに慣性のある回転・カーソル追従のリベールライティング・擬似床反射を持たせ、スクロール連動カメラワークで没入体験から探索型UIへ切り替える不動産デベロッパーのコーポレートサイト | [sites/2026-08-08-hubtown-monolith-reveal](sites/2026-08-08-hubtown-monolith-reveal) |
| 2026-08-08 | ITom — Tomasz "ITom" Szmajda Portfolio | https://itomdev.com/ | 手描きスケッチ風の平面ジオメトリに、近づくと絵の具で塗られるように着色するカスタムGLSLシェーダー(PaintRevealMaterial相当)を使い、紙が破れて中に入り込むように奥へ歩いて進む3Dスケッチ回廊を持つクリエイティブデベロッパーのポートフォリオサイト | [sites/2026-08-08-itom-paint-reveal-corridor](sites/2026-08-08-itom-paint-reveal-corridor) |
| 2026-08-08 | No Art | https://www.noartmusic.com/ | レコードプレイヤー風のコーンフロースライダーで楽曲を選ぶレーベルページと、GSAPで生き生きと動くフェスティバル写真ギャラリーを持つ音楽レーベル/フェスティバルのサイト | [sites/2026-08-08-no-art-record-player-slider](sites/2026-08-08-no-art-record-player-slider) |
| 2026-08-08 | Artem Shcherbakov — Portfolio | https://artemartemartem.com/ | 作品画像へのカスタムWebGLディストーション(ホバー時の水面のような揺れ)・文字を1文字ずつ動かして登場させるキネティックタイポグラフィ・画面をワイプして切り替えるシームレスなページトランジションを持つCGI/VFXディレクターのポートフォリオサイト | [sites/2026-08-08-artem-shcherbakov-vfx-portfolio](sites/2026-08-08-artem-shcherbakov-vfx-portfolio) |
| 2026-08-08 | Cartier Watches & Wonders 2026(制作: Immersive Garden) | https://www.awwwards.com/sites/cartier-watches-wonders-2026 | Three.jsによる6つの3D展示室(アルコーブ)をスクロールで巡る演出。慣性スクロールでの部屋間カメラ移動・GLSLシェーダーによる水鏡フロアと波紋・ホバー/クリックで反応する隠しジェスチャーを持つラグジュアリーブランドのイベントサイト | [sites/2026-08-08-cartier-watches-wonders-alcoves](sites/2026-08-08-cartier-watches-wonders-alcoves) |
| 2026-08-08 | Son Daven(制作: The First The Last) | https://sondaven.com/ | シネマティックなプリローダー・ピン留めスクロールで進む章立てストーリーテリング・長押しで夏景色から冬景色へ切り替わるホールド式ビフォーアフター比較・データ駆動のロケーションカードを持つカルパティア山脈のデザインリゾートホテルのブランドサイト | [sites/2026-08-08-son-daven-hold-compare-story](sites/2026-08-08-son-daven-hold-compare-story) |
| 2026-08-08 | TRIONN | https://trionn.com/ | パーティクルではなくFBM+ドメインワーピングの1枚のフラグメントシェーダーで描く霧/煙のヒーロー演出・GSAP ScrollTrigger相当のピン留めスクラブセクション・SplitText風の文字単位テキストリビール・Lenis風のなめらかなスクロール・カーソル追従のマグネティックカード・Web Audioによるアンビエントサウンドを持つAI-poweredクリエイティブテクノロジースタジオのサイト | [sites/2026-08-08-trionn-shader-fog-scroll](sites/2026-08-08-trionn-shader-fog-scroll) |
| 2026-08-08 | Mat Voyce(制作: Uncommon Studio) | https://www.awwwards.com/sites/mat-voyce | スクロール速度をバネ物理で受け止め、WebGLシェーダーで大型タイポグラフィを伸縮・スナップバックさせるキネティックタイプ演出・ホバーでラベル付きに変化するカスタムカーソル・Personal/Commercial/Collabsをスライドするピルで切り替えるタブ付きワークグリッドを持つタイプデザイナー/アニメーターのポートフォリオサイト | [sites/2026-08-08-mat-voyce-kinetic-type-scroll](sites/2026-08-08-mat-voyce-kinetic-type-scroll) |
| 2026-08-08 | 20 Years Inspired by People(制作: /nk.studio) | https://inspiring.nk.studio/ | GSAP SplitText相当の文字単位の見出しリビール・GSAP DrawSVGPlugin相当のスクロール連動SVGラインドロー・2色構成の余白豊かなエディトリアルレイアウトを持つデザインスタジオ設立20周年のストーリーアーカイブサイト | [sites/2026-08-08-nk-studio-20-years-inspired](sites/2026-08-08-nk-studio-20-years-inspired) |
| 2026-08-08 | Susurrus(制作: Xianyao Wei) | https://susurrus.vercel.app/ | Three.js/WebGLの3DシーンにKuwaharaフィルタ(黒澤フィルタ)を唯一のポストプロセッシングパスとしてかけ、水彩画のような質感に変換するNPR(非写実的レンダリング)表現を持つ、Awwwards Honorable Mention受賞の実験的3Dワールド | [sites/2026-08-08-susurrus-watercolor-kuwahara](sites/2026-08-08-susurrus-watercolor-kuwahara) |
| 2026-08-08 | Kin(制作: By-Kin) | https://www.by-kin.com/ | lerpベースの慣性を持つ重みのあるスムーススクロール・ヘッダーを再生成せず1枚の連続した面のようにコンテンツだけをフェード+スライド切替するページ遷移・clip-pathによる下から上への画像マスクリビール・単語単位のスタッガー付きテキストリビールを持つ、Awwwards Site of the Day/Developer Award/FWA/CSS Design Awards Web of the Day受賞の英国クリエイティブスタジオのポートフォリオサイト | [sites/2026-08-08-by-kin-studio-editorial-motion](sites/2026-08-08-by-kin-studio-editorial-motion) |
| 2026-08-08 | Mathis Biabiany — Portfolio | https://www.mathis-biabiany.fr/ | 図形(画像)をピクセル単位でパーティクルへ分解し、渦を巻くカラフルなトンネルを通り抜けて次の図形へモーフィングする演出(頂点シェーダーでの位置補間+加算合成の発光パーティクル)を持つ、Awwwards/The FWA Site of the Day受賞歴を持つクリエイティブテクノロジストのポートフォリオサイト | [sites/2026-08-08-mathis-biabiany-particle-tunnel](sites/2026-08-08-mathis-biabiany-particle-tunnel) |
