import {exec} from 'node:child_process';
import {promisify} from 'node:util';

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/git_interactions.py}
 */
function _as_rev_range(start: string, end: string) {
  return `${start}..${end}`;
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/git_interactions.py}
 */
async function _run_git_cmd(git_arguments: string[]) {
  // encoding = 'UTF-8'
  // if sys.stdout.encoding is not None:
  //     encoding = sys.stdout.encoding

  // stdout_bytes = subprocess.Popen(git_arguments, stdout=subprocess.PIPE).communicate()[0]
  // stdout = stdout_bytes.decode(encoding)

  return promisify(exec)(git_arguments.join(' ')).then(x => x.stdout);
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/git_interactions.py}
 */
async function _read_revisions_matching(git_arguments: string[]) {
  const git_log = await _run_git_cmd(git_arguments);
  const revs = new Array<string>();
  // # match a line like: d804759 Documented tree map visualizations
  // # ignore everything except the commit number:
  const rev_expr = /([^\s]+)/;
  for (const line of git_log.split('\n')) {
    const m = rev_expr.exec(line);
    if (m) {
      revs.push(m[1]);
    }
  }
  return revs.reverse();
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/git_interactions.py}
 */
function _git_cmd_for(rev_start: string, rev_end: string) {
  const rev_range = `${rev_start}..${rev_end}`;
  return ['git', 'log', rev_range, '--oneline'];
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/git_interactions.py}
 */
function read_revs(rev_start: string, rev_end: string) {
  ` Returns a list of all commits in the given range.
`;
  const git_arguments = _git_cmd_for(rev_start, rev_end);
  return _read_revisions_matching(git_arguments);
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/git_interactions.py}
 */
export function read_revs_for(
  file_name: string,
  rev_start: string,
  rev_end: string,
) {
  const git_arguments = _git_cmd_for(rev_start, rev_end);
  git_arguments.push(file_name);
  return _read_revisions_matching(git_arguments);
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/git_interactions.py}
 */
function read_diff_for(rev1: string, rev2: string) {
  return _run_git_cmd(['git', 'diff', rev1, rev2]);
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/git_interactions.py}
 */
function read_file_diff_for(file_name: string, rev1: string, rev2: string) {
  return _run_git_cmd(['git', 'diff', rev1, rev2, file_name]);
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/git_interactions.py}
 */
export function read_version_matching(file_name: string, rev: string) {
  return _run_git_cmd(['git', 'show', `${rev}:${file_name}`]);
}
