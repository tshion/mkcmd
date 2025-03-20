/* eslint-disable @typescript-eslint/no-explicit-any */
import {createWriteStream} from 'node:fs';
import {rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pipeline} from 'node:stream/promises';
import {Open} from 'unzipper';
import {GitHubClient} from './model/github.client';
import {
  commandDirPath,
  parseVersionCode,
  readVersionText,
  userAgent,
} from './model/meta.const';

const fetch = require('node-fetch');

/**
 * 最新のコマンドに更新する
 *
 * @example
 * ``` sh
 * node update.js
 * ```
 */
async function main() {
  // 最新のGitHub Release を取得し、バージョンチェックを行う
  const localVersionText = await readVersionText();
  const localVersion = localVersionText
    ? parseVersionCode(localVersionText)
    : 0;

  const githubClient = await GitHubClient.new();
  const latestReleaseResponse = await githubClient.getLatestRelease(
    'tshion',
    'mkcmd',
  );
  const remoteVersionText = latestReleaseResponse.data.tag_name;
  if (parseVersionCode(remoteVersionText) <= localVersion) {
    console.log('既に最新です');
    return;
  }

  // コマンドをダウンロードする
  const assets = Object.values<any>(latestReleaseResponse.data.assets);
  const target = assets.find(item => {
    return /^mkcmd_[0-9]{4}\.[0-9]{2}\.[0-9]{2}\.zip$/.test(item.name);
  });
  const assetResponse = await fetch(target.url, {
    headers: {
      Accept: 'application/octet-stream',
      'User-Agent': userAgent,
    },
  });
  if (!assetResponse.ok) {
    throw new Error(assetResponse.statusText);
  }
  const zipPath = resolve(target.name);
  await pipeline(assetResponse.body, createWriteStream(zipPath));

  // コマンドを配置する
  const directory = await Open.file(zipPath);
  await rm(commandDirPath, {force: true, recursive: true});
  await directory.extract({path: commandDirPath});
  await rm(zipPath);

  console.log(`Updated: ${localVersionText} -> ${remoteVersionText}`);
}

+(async function () {
  await main();
})();
