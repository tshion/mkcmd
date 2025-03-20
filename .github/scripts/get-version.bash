#!/bin/bash

# バージョン情報の取得 ({4桁}.{2桁}.{3桁} 形式)

version=$(node -p "require('./package.json').version")
awk --field-separator '.' '{printf("%04d.%02d.%03d\n", $1, $2, $3)}' <<< "$version"
