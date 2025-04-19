# CONTRIBUTING
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

## Getting Started
### Prerequisites
* bash
* git
* [Node.js](https://nodejs.org)
    * 開発 -> [.node-version](./.node-version)
    * 本番 -> [res/.node-version](./res/.node-version)
* [Visual Studio Code](https://code.visualstudio.com/)

### Installation
1. `npm ci`


## リリース方法
1. GitHub Actions の `Create a release pull request` を実行する
    * コードが未整形の場合、失敗するので注意
    * 自動テストに失敗しても作成されないので注意
1. 前項で作成されたPull Request を確認し、問題が無ければマージする
1. GitHub Actions の `Deploy` が自動実行されるので、しばらく待つ
1. GitHub Release が作成されていることを確認する


## 備考
### 環境変数
名前 | 概要
--- | ---
`DEBUG` | `true` を指定した場合、デバッグ設定を適用する
`TEST_MODE` | `true` を指定した場合、開発用の設定を適用する

### コマンドの追加手順
1. VSCode タスク `Add command code` を実行する
1. (必要に応じて) 記述位置やコードフォーマットを行う
1. `README.md` にコマンドの概要を追記する

### 本番のNode.js バージョン更新時に変更するファイル
* `.github/dependabot.yml` 内の `@types/node` バージョン
* `res/.node-version`
* `package.json` 内の `@types/node` バージョン
