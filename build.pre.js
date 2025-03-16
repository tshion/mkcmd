const {cp, writeFile} = require('node:fs/promises');
const path = require('node:path');
const {env} = require('node:process');

/**
 * ビルド前の処理
 */
async function main() {
  const outputDirPath = path.join(__dirname, 'build');

  // res/ の内容をそのままコピー
  await cp(path.join(__dirname, 'res'), outputDirPath, {recursive: true});

  // バージョン情報の配置
  await writeFile(
    path.join(outputDirPath, '.version'),
    `${env.npm_package_version}`,
    {
      encoding: 'utf-8',
    },
  );
}

+(async function () {
  await main();
})();
