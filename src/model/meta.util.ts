import {existsSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {argv} from 'node:process';
// eslint-disable-next-line n/no-extraneous-import
import {clean, major, minor, patch, prerelease, valid} from 'semver';
import {buildEnv} from '../build.env';

/** コマンドが配置されているディレクトリーのパス */
export const commandDirPath = resolve(argv[1], '..');

/** キャッシュの出力先 */
export const cacheDirPath = resolve(commandDirPath, '.cache');

/** ユーザーエージェント文字列 */
export const userAgent = `io.github.${buildEnv.github.owner}.${buildEnv.github.repo}`;

/**
 * バージョン番号の算出
 *
 * @param versionName バージョン文字列
 */
export function parseVersionCode(versionName: string) {
  const message = `Unexpected version: ${versionName}`;

  const version = clean(versionName, {loose: true});
  if (!version || !valid(version)) {
    throw SyntaxError(message);
  }

  if (prerelease(version) !== null) {
    throw SyntaxError(message);
  }

  const versionMajor = major(version);
  if (9999 < versionMajor) {
    throw RangeError(message);
  }

  const versionMinor = minor(version);
  if (12 < versionMinor) {
    throw RangeError(message);
  }

  const versionPatchBuild = patch(version);
  if (319 < versionPatchBuild) {
    throw RangeError(message);
  }

  return 100_000 * versionMajor + 1_000 * versionMinor + versionPatchBuild;
}

/**
 * コマンドバージョンの読み取り
 */
export function readVersionText() {
  const versionPath = resolve(commandDirPath, '.version');
  if (existsSync(versionPath)) {
    return readFile(versionPath, {encoding: 'utf-8'});
  } else {
    return Promise.resolve('');
  }
}
