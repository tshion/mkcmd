import {existsSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {argv} from 'node:process';

/** コマンドが配置されているディレクトリーのパス */
export const commandDirPath = resolve(argv[1], '..');

/** キャッシュの出力先 */
export const cacheDirPath = resolve(commandDirPath, '.cache');

/** ユーザーエージェント文字列 */
export const userAgent = 'io.github.tshion.mkcmd';

/** バージョン番号の算出 */
export function parseVersionCode(versionName: string) {
  const tokens = versionName.split('.');
  if (tokens.length !== 3) {
    throw Error(`Unexpected vesion: ${versionName}`);
  }

  return tokens
    .map(token => parseInt(token))
    .reduce((previous: number, current: number, index: number) => {
      const maxIndex = tokens.length - 1;
      const factor = 100 ** (maxIndex - index);
      return previous + current * factor;
    }, 0);
}

/** コマンドバージョンの読み取り */
export function readVersionText() {
  const versionPath = resolve(commandDirPath, '.version');
  if (existsSync(versionPath)) {
    return readFile(versionPath, {encoding: 'utf-8'});
  } else {
    return Promise.resolve('');
  }
}
