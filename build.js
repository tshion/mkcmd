const {writeFile} = require('node:fs/promises');
const path = require('node:path');
const {argv} = require('node:process');

/**
 * 指定されたコマンド実装をビルドする
 *
 * @param {string} filename コマンド実装のファイル名
 */
async function main(filename) {
  if (!filename) {
    throw Error('コマンド実装のファイル名を指定してください');
  }

  const result = await require('@vercel/ncc')(
    path.join(__dirname, 'src', `${filename}.ts`),
    {
      minify: true,
    },
  );
  await writeFile(
    path.join(__dirname, 'build', `${filename}.js`),
    result.code,
    {
      encoding: 'utf-8',
    },
  );
}

+(async function () {
  await main(argv[2]);
})();
