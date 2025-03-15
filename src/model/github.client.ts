/* eslint-disable @typescript-eslint/no-explicit-any */
import {existsSync} from 'node:fs';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {cacheDirPath, userAgent} from './meta.const';

const {Octokit} = require('@octokit/core');

/**
 * GitHub とのAPI クライアント
 */
export class GitHubClient {
  public static async new(useLocalCache = false, auth?: any) {
    if (useLocalCache && !existsSync(cacheDirPath)) {
      await mkdir(cacheDirPath, {recursive: true});
    }
    const client = new Octokit({
      auth: auth,
      userAgent: userAgent,
    });
    return new GitHubClient(client, useLocalCache);
  }

  private constructor(
    private readonly octokit: any,
    private readonly useLocalCache: Boolean,
  ) {}

  private async _exec(filename: string, requestCallback: () => Promise<any>) {
    const cacheFilePath = join(cacheDirPath, `${filename}.json`);
    if (this.useLocalCache && existsSync(cacheFilePath)) {
      const text = await readFile(cacheFilePath, {encoding: 'utf-8'});
      try {
        return JSON.parse(text);
      } catch {
        /* empty */
      }
    }

    const response = await requestCallback();
    if (this.useLocalCache) {
      await writeFile(cacheFilePath, JSON.stringify(response, undefined, 4), {
        encoding: 'utf-8',
      });
    }
    return response;
  }

  /**
   * Get the latest release
   *
   * @see {@link https://docs.github.com/ja/rest/releases/releases?apiVersion=2022-11-28#get-the-latest-release}
   */
  public async getLatestRelease(owner: string, repo: string) {
    return this._exec('GitHubClient#getLatestRelease', () => {
      return this.octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
        owner: owner,
        repo: repo,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
    });
  }
}
