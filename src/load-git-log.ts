import {execSync} from 'node:child_process';
import {writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {argv} from 'node:process';
import {simpleGit} from 'simple-git';
import {commandDirPath} from './model/meta.util';

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

  // Git ログから変更頻度の算出
  const revisionsPath = join(commandDirPath, 'revisions.csv');
  const gitLogPath = join(commandDirPath, 'git_log.txt');
  const gitLog = await simpleGit(gitDirPath).raw([
    'log',
    '--all',
    '--numstat',
    '--date=short',
    '--pretty=format:--%h--%ad--%aN',
    '--no-renames',
    // TODO: いつから取得するかの指定
  ]);
  await writeFile(gitLogPath, gitLog, {encoding: 'utf-8'});

  const rawRevisions = execSync(
    `java -jar ${join(commandDirPath, 'code-maat-1.0.4-standalone.jar')} -l ${gitLogPath} -c git2 -a revisions`,
  ).toString('utf-8');
  await writeFile(revisionsPath, rawRevisions, {encoding: 'utf-8'});

  // ファイル行数の算出
  const complexityPath = join(commandDirPath, 'complexity.csv');
  const rawCloc = execSync(
    `perl ${join(commandDirPath, 'cloc-2.04.pl')} ${gitDirPath} --unix --by-file --csv --quiet`,
  ).toString('utf-8');
  await writeFile(complexityPath, rawCloc, {encoding: 'utf-8'});

  // データの統合
  const complexity = new Map<string, string>();
  rawCloc
    .split('\n')
    .slice(1)
    .filter(line => !!line.trim())
    .forEach(line => {
      const [_1, filename, _2, _3, code] = line.split(',');
      if (filename.trim()) {
        complexity.set(filename, code);
      }
    });

  const result = [['module', 'revisions', 'code']];
  rawRevisions
    .split('\n')
    .slice(1)
    .filter(line => !!line.trim())
    .forEach(line => {
      const [entity, revs] = line.split(',');
      const code = complexity.get(join(gitDirPath, entity));
      if (code) {
        result.push([entity, revs, code]);
      }
    });
  await writeFile(
    outputPath,
    result.map(tokens => tokens.join(', ')).join('\n'),
    {encoding: 'utf-8'},
  );
}

+(async function () {
  await main(argv[2], argv[3]);
})();
