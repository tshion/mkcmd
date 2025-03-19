const {writeFile} = require('node:fs/promises');
const {join} = require('node:path');
const {argv, env} = require('node:process');

/**
 * 指定されたコマンド実装をビルドする
 *
 * @example
 * ``` sh
 * node build.js "${filename}"
 * ```
 *
 * @example
 * デバッグ設定を適用する場合
 * ``` sh
 * (export DEBUG=true; node build.js "${filename}")
 * ```
 *
 * @param {string} filename コマンド実装のファイル名
 */
async function main(filename) {
  if (!filename) {
    throw Error('コマンド実装のファイル名を指定してください');
  }

  const isDebug = !!(env.DEBUG && env.DEBUG.toLowerCase() === 'true');
  const options = {
    minify: !isDebug,
    sourceMap: isDebug,
  };
  const result = await require('@vercel/ncc')(
    join(__dirname, 'src', `${filename}.ts`),
    options,
  );

  const outputDirPath = join(__dirname, 'build');
  await writeFile(join(outputDirPath, `${filename}.js`), result.code, {
    encoding: 'utf-8',
  });
  if (isDebug) {
    await writeFile(join(outputDirPath, 'index.js.map'), result.map, {
      encoding: 'utf-8',
    });
    await writeFile(
      join(outputDirPath, 'sourcemap-register.js'),
      result.assets['sourcemap-register.js'].source,
      {
        encoding: 'utf-8',
      },
    );
  }
}

+(async function () {
  await main(argv[2]);
})();
