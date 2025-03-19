const {writeFile, readFile} = require('node:fs/promises');
const {join} = require('node:path');
const {argv} = require('node:process');

/**
 * リリース用のPull Request 本文の作成
 *
 * @example
 * ``` sh
 * node create-release-pr-body.js "${outputFilePath}" "${appendix}"
 * ```
 *
 * @param {string} outputFilePath ファイル出力先
 * @param {string} appendix 追記内容
 */
async function main(outputFilePath, appendix) {
  let text = await readFile(
    join(__dirname, '..', 'PULL_REQUEST_TEMPLATE', 'create-release-pr.md'),
    {encoding: 'utf-8'},
  );
  text = `${text}
${appendix}`;
  await writeFile(outputFilePath, text, {encoding: 'utf-8'});
}

+(async function () {
  await main(argv[2], argv[3]);
})();
