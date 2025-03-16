# mkcmd
> 個人的によく行う処理をコマンド化していくリポジトリ

コマンド | 用途
--- | ---
[`node show-argument.js`](./src/show-arguments.ts) | コマンドライン引数を表示する
[`node update.js`](./src/update.ts) | 最新のコマンドに更新する


## 導入方法
### 初回
1. GitHub Release に添付されているZip ファイルをダウンロードする
1. ダウンロードしたファイルを任意の場所で解凍する
1. `.node-version` を確認し、必要なNode.js を整備する

### 更新
1. `node update.js` を実行する


## 備考
### 環境変数
名前 | 概要
--- | ---
`TEST_MODE` | `true` を指定した場合、開発用の設定を適用する

### 開発、リリースの流れなど
[CONTRIBUTING](./CONTRIBUTING.md) を参照してください。

### バージョンについて
リリース日を `yyyy.MM.dd` 形式にしたものが設定されます。

※開発環境は `0.0.0` で固定
