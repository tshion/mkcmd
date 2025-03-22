const {cp, writeFile} = require('node:fs/promises');
const {join} = require('node:path');
const {env} = require('node:process');
// eslint-disable-next-line n/no-extraneous-require
const {major, minor, patch} = require('semver');

/**
 * ビルドの前処理
 *
 * @example
 * ``` sh
 * node build.pre.js
 * ```
 */
async function main() {
  const outputDirPath = join(__dirname, 'build');

  // res/ の内容をそのままコピー
  await cp(join(__dirname, 'res'), outputDirPath, {recursive: true});

  // 環境変数の書き出し
  await writeFile(
    join(__dirname, 'build.env.js'),
    `module.exports = {
  isDebug: ${!!(env.DEBUG && env.DEBUG.toLowerCase() === 'true')},
};
`,
    {encoding: 'utf-8'},
  );
  await writeFile(
    join(__dirname, 'src', 'build.env.ts'),
    `export const buildEnv = {
  testMode: ${!!(env.TEST_MODE && env.TEST_MODE.toLowerCase() === 'true')},
};
`,
    {encoding: 'utf-8'},
  );

  // バージョン情報の配置
  const packageVersion = `${env.npm_package_version}`;
  const versionMajor = `${major(packageVersion)}`.padStart(4, '0');
  const versionMinor = `${minor(packageVersion)}`.padStart(2, '0');
  const versionPatchBuild = `${patch(packageVersion)}`.padStart(3, '0');
  await writeFile(
    join(outputDirPath, '.version'),
    `${versionMajor}.${versionMinor}.${versionPatchBuild}`,
    {encoding: 'utf-8'},
  );
}

+(async function () {
  await main();
})();
