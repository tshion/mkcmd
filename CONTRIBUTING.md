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
1. 前項で作成されたPull Request を確認し、問題が無ければマージする
1. GitHub Actions の `Deploy` が自動実行されるので、しばらく待つ
1. GitHub Release が作成されていることを確認する
