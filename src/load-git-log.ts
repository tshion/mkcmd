import {argv} from 'node:process';

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
async function main(gitDirPath: string, outputPath: string) {}

+(async function () {
  await main(argv[2], argv[3]);
})();
