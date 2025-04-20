# mkcmd
> 個人的によく行う処理をコマンド化していくリポジトリ

コマンド | 用途
--- | ---
[`node analyze-code-complexity.js {filePath}`](./src/analyze-code-complexity.ts) | ソースコード中に含まれるインデント数の分析
[`node analyze-code-hotspot.js {gitDirPath} {outputDirPath} {after}`](./src/analyze-code-hotspot.ts)<br />(※`git`, `java`, `perl` 環境が必要) | Git の履歴からファイル毎の変更頻度とコード規模をCSV 出力する
[`node show-argument.js`](./src/show-arguments.ts) | コマンドライン引数を表示する
[`node update.js`](./src/update.ts) | 最新のコマンドに更新する


## 導入方法
### 初回
1. GitHub Release に添付されているZip ファイルをダウンロードする
1. ダウンロードしたファイルを任意の場所で解凍する
1. `.node-version` を確認し、必要なNode.js を整備する
1. (必要に応じて) コマンド実行に必要な環境を整備する

### 更新
1. `node update.js` を実行する


## 備考
### バージョン表記
リリース日 `YYYY/MM/DD` と1桁のビルド番号 `{build}` を用いて下記のように表記します。

形式 | 表記
--- | ---
文字列 | `YYYY.MM.DD{build}`
文字列<br />([node-semver](https://github.com/npm/node-semver)) | `Y.M.D{build}`
番号 | `100,000 * YYYY + 1,000 * MM + 10 * DD + {build}`

※開発環境は `0.0.0` で固定

### 開発、リリースの流れなど
[CONTRIBUTING](./CONTRIBUTING.md) を参照してください。
