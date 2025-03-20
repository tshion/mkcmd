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
### バージョン表記
リリース日 `yyyy/MM/dd` と1桁のビルド番号 `(build)` を用いて下記のように表記します。

形式 | 表記
--- | ---
文字列 | `yyyy.MM.dd(build)`
番号 | `100,000 * yyyy + 1,000 * MM + 10 * dd + (build)`

※開発環境は `0.0.0` で固定

### 開発、リリースの流れなど
[CONTRIBUTING](./CONTRIBUTING.md) を参照してください。
