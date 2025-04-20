import {existsSync} from 'node:fs';
import {argv} from 'node:process';
import {run} from './model/maat-scripts/complexity_analysis';

/**
 * ソースコード中に含まれるインデント数の分析
 *
 * 参考: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/complexity_analysis.py}
 *
 * @example
 * ``` sh
 * node analyze-code-complexity.js {filePath}
 * ```
 *
 * @param filePath 分析対象のファイルパス
 */
async function main(filePath: string) {
  if (!filePath || !existsSync(filePath)) {
    throw new Error('The file to calculate complexity on is required.');
  }

  await run({file: filePath});
}

+(async function () {
  await main(argv[2]);
})();
