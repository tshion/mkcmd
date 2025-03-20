const {cp, writeFile} = require('node:fs/promises');
const path = require('node:path');
const {env} = require('node:process');
// eslint-disable-next-line n/no-extraneous-require
const {major, minor, patch} = require('semver');

/**
 * ビルド前の処理
 *
 * @example
 * ``` sh
 * node build.pre.js
 * ```
 */
async function main() {
  const outputDirPath = path.join(__dirname, 'build');

  // res/ の内容をそのままコピー
  await cp(path.join(__dirname, 'res'), outputDirPath, {recursive: true});

  // バージョン情報の配置
  const packageVersion = `${env.npm_package_version}`;
  const versionMajor = `${major(packageVersion)}`.padStart(4, '0');
  const versionMinor = `${minor(packageVersion)}`.padStart(2, '0');
  const versionPatchBuild = `${patch(packageVersion)}`.padStart(3, '0');
  await writeFile(
    path.join(outputDirPath, '.version'),
    `${versionMajor}.${versionMinor}.${versionPatchBuild}`,
    {
      encoding: 'utf-8',
    },
  );
}

+(async function () {
  await main();
})();
