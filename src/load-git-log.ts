import {execSync} from 'node:child_process';
import {writeFile} from 'node:fs/promises';
import {argv} from 'node:process';
import {simpleGit} from 'simple-git';
import {commandDirPath} from './model/meta.util';
import {join} from 'node:path';

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

  const gitLogPath = join(commandDirPath, 'git_log.txt');
  const gitLog = await simpleGit(gitDirPath).raw([
    'log',
    '--all',
    '--numstat',
    '--date=short',
    '--pretty=format:--%h--%ad--%aN',
    '--no-renames',
  ]);
  await writeFile(gitLogPath, gitLog, {encoding: 'utf-8'});

  const maatPath = join(commandDirPath, 'code-maat-1.0.4-standalone.jar');
  const dataRevisions = execSync(
    `java -jar ${maatPath} -l ${gitLogPath} -c git2 -a revisions`,
  );
  await writeFile(outputPath, dataRevisions, {encoding: 'utf-8'});
}

+(async function () {
  await main(argv[2], argv[3]);
})();
