import {writeFile} from 'node:fs/promises';
import {argv} from 'node:process';
import {simpleGit} from 'simple-git';

/**
 * Git ログの取得
 *
 * @example
 * ``` sh
 * node load-git-log.js {gitDirPath} {outputPath}
 * ```
 *
 * @param gitDirPath .git が配置されているディレクトリーパス
 * @param outputPath 出力先のパス
 */
async function main(gitDirPath: string, outputPath: string) {
  if (!gitDirPath) {
    throw Error('gitDirPath is required');
  }
  if (!outputPath) {
    throw Error('outputPath is required');
  }

  const git = simpleGit(gitDirPath);

  const log = await git.raw([
    'log',
    '--all',
    '--numstat',
    '--date=short',
    '--pretty=format:--%h--%ad--%aN',
    '--no-renames',
  ]);
  await writeFile(outputPath, log, {
    encoding: 'utf-8',
  });
}

+(async function () {
  await main(argv[2], argv[3]);
})();
