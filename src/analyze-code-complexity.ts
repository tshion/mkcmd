import {argv} from 'node:process';

/**
 * ソースコード中に含まれるインデント数の分析
 *
 * @example
 * ``` sh
 * node analyze-code-complexity.js {filePath}
 * ```
 *
 * @param filePath 分析対象のファイルパス
 */
async function main(filePath: string) {
  // TODO
}

+(async function () {
  await main(argv[2]);
})();
