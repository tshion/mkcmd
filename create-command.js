const {writeFile} = require('node:fs/promises');
const {join} = require('node:path');
const {argv} = require('node:process');
const {render} = require('nunjucks');

/**
 * 新規作成するコマンドの関連実装の生成
 *
 * @example
 * ``` sh
 * node create-command.js {commandName}
 * ```
 *
 * @param {string} commandName コマンド名
 */
async function main(commandName) {
  if (!commandName || !/^([a-z][a-z0-9\\-]*)*[a-z0-9]$/.test(commandName)) {
    throw Error('追加するコマンド名を英数字で指定してください');
  }

  // ソースコードの配置
  await writeFile(
    join('src', `${commandName}.ts`),
    render('command.ts.njk', {commandName: commandName}),
    {encoding: 'utf-8'},
  );

  // TODO: .vscode/launch.json
  // TODO: .vscode/tasks.json
  // TODO: pacakage.json
}

+(async function () {
  await main(argv[2]);
})();
