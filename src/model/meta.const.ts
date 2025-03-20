import {resolve} from 'node:path';
import {argv} from 'node:process';

/** コマンドが配置されているディレクトリーのパス */
export const commandDirPath = resolve(argv[1], '..');

/** キャッシュの出力先 */
export const cacheDirPath = resolve(commandDirPath, '.cache');

/** ユーザーエージェント文字列 */
export const userAgent = 'io.github.tshion.mkcmd';
