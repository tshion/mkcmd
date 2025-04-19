const {execSync} = require('node:child_process');
const {writeFile, readFile} = require('node:fs/promises');
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

  // ビルドコマンドの整備
  execSync(
    `npm pkg set scripts[build:${commandName}]="npm run build ${commandName}"`,
  );

  // 開発環境の整備
  const pathTasksJson = join('.vscode', 'tasks.json');
  const dataTasksJson = await readFile(pathTasksJson, {
    encoding: 'utf-8',
  }).then(text => JSON.parse(text));
  dataTasksJson.tasks.push({
    label: `Debug Build: ${commandName}`,
    type: 'process',
    command: 'npm',
    args: ['run', 'build', commandName],
    dependsOn: ['Configuration'],
  });
  await writeFile(pathTasksJson, JSON.stringify(dataTasksJson, null, 2), {
    encoding: 'utf-8',
  });

  const pathLaunchJson = join('.vscode', 'launch.json');
  const dataLaunchJson = await readFile(pathLaunchJson, {
    encoding: 'utf-8',
  }).then(text => JSON.parse(text));
  dataLaunchJson.configurations.push({
    name: commandName,
    type: 'node',
    request: 'launch',
    program: `\${workspaceFolder}/src/${commandName}.ts`,
    preLaunchTask: `Debug Build: ${commandName}`,
    outFiles: ['${workspaceFolder}/build/**/*.js'],
  });
  await writeFile(pathLaunchJson, JSON.stringify(dataLaunchJson, null, 2), {
    encoding: 'utf-8',
  });
}

+(async function () {
  await main(argv[2]);
})();
