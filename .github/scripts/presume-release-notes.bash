#!/bin/bash

# まだリリースしていないGit タグのリリースノートの推定
# ※GitHub CLI のアクセス権限等の設定が必要
#
# $1 -> GitHub リポジトリ名 (※OWNER/REPO 表記)
# $2 -> タグを付与する予定のGit ブランチ名

gh api \
    --method POST \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "/repos/$1/releases/generate-notes" \
    -f "tag_name=preview" \
    -f "target_commitish=$2"
