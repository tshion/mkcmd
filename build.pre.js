const {cp} = require('node:fs/promises');
const path = require('node:path');

/**
 * ビルド前の処理
 */
async function main() {
  const inputDirPath = path.join(__dirname, 'res');
  const outputDirPath = path.join(__dirname, 'build');
  await cp(inputDirPath, outputDirPath, {recursive: true});
}

+(async function () {
  await main();
})();
