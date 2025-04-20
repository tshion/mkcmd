import {existsSync} from 'node:fs';
import {basename, dirname, join} from 'node:path';
import {argv, chdir} from 'node:process';
import {run} from './model/maat-scripts/git_complexity_trend';

/**
 * 指定されたGit コミットの範囲におけるソースコード中に含まれるインデント数の分析
 *
 * 参考: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/git_complexity_trend.py}
 *
 * @example
 * ``` sh
 * node analyze-code-complexity-trend.js {start} {end} {filePath}
 * ```
 *
 * @param start 開始コミット
 * @param end 終了コミット
 * @param filePath 分析対象のファイルパス
 */
async function main(start: string, end: string, filePath: string) {
  if (!filePath || !existsSync(filePath)) {
    throw new Error('The file to calculate complexity on is required.');
  }

  const findGitDirPath = (path: string) => {
    const candidate = dirname(path);
    if (existsSync(join(candidate, '.git'))) {
      return candidate;
    }

    const next = dirname(candidate);
    if (candidate !== next) {
      findGitDirPath(candidate);
    }
    throw new Error('Git directory not found');
  };

  const gitDirPath = findGitDirPath(filePath);
  chdir(gitDirPath);
  await run({
    start: start,
    end: end,
    file: basename(filePath),
  });
}

+(async function () {
  await main(argv[2], argv[3], argv[4]);
})();
