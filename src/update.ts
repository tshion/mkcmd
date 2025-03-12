const {Octokit} = require('@octokit/core');

/**
 * ツール自身のアップデート
 *
 * @example
 * ``` shell
 * node update.js
 * ```
 */
async function main() {
  const octokit = new Octokit({});

  // 最新のリリースを取得し、対象のリリースアセットの情報を抜き出す
  const response = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner: 'tshion',
    repo: 'mkcmd',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  const latestRelease = response.data[0];
  const assets: any[] = Object.values(latestRelease.assets);
  assets.forEach(item => {
    console.log(`${item.name} : ${item.id}`);
  });

  // リリースアセットをダウンロードする
}

+(async function () {
  await main();
})();
