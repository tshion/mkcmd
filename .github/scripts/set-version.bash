#!/bin/bash

# バージョン情報の設定
#
# $1 -> 設定するバージョン情報

npm version "$1" --allow-same-version --no-git-tag-version
