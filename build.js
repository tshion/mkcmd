const {writeFile} = require('node:fs/promises');
const {join} = require('node:path');
const {argv} = require('node:process');
const buildEnv = require('./build.env');

/**
 * 指定されたコマンド実装をビルドする
 *
 * @example
 * ``` sh
 * node build.js {filename}
 * ```
 *
 * @param {string} filename コマンド実装のファイル名
 */
async function main(filename) {
  if (!filename) {
    throw Error('コマンド実装のファイル名を指定してください');
  }

  const result = await require('@vercel/ncc')(
    join(__dirname, 'src', `${filename}.ts`),
    {
      minify: !buildEnv.isDebug,
      sourceMap: buildEnv.isDebug,
    },
  );

  const outputDirPath = join(__dirname, 'build');
  await writeFile(join(outputDirPath, `${filename}.js`), result.code, {
    encoding: 'utf-8',
  });
  if (buildEnv.isDebug) {
    await writeFile(join(outputDirPath, 'index.js.map'), result.map, {
      encoding: 'utf-8',
    });
    await writeFile(
      join(outputDirPath, 'sourcemap-register.js'),
      result.assets['sourcemap-register.js'].source,
      {encoding: 'utf-8'},
    );
  }
}

+(async function () {
  await main(argv[2]);
})();
