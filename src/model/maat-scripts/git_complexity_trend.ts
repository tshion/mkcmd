// ######################################################################
// # This program calculates the complexity trend over a range of
// # revisions in a Git repo.
// ######################################################################

import {calculate_complexity_in} from './complexity_calculations';
import {DescriptiveStats} from './desc_stats';
import {read_revs_for, read_version_matching} from './git_interactions';
import {create_for} from './language_preprocessors';

// ######################################################################
// # Statistics from complexity
// ######################################################################

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/git_complexity_trend.py}
 */
function as_stats(revision: string, complexity_by_line: number[]) {
  return new DescriptiveStats(revision, complexity_by_line);
}

// ######################################################################
// # Output
// ######################################################################

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/git_complexity_trend.py}
 */
function as_csv(result: DescriptiveStats[]) {
  console.log('rev,n,total,mean,sd');
  for (const stats of result) {
    const fields_of_interest = [
      stats.name,
      stats.n_revs,
      stats.total,
      parseFloat(stats.mean().toFixed(2)),
      parseFloat(stats.sd().toFixed(2)),
    ];
    const printable = fields_of_interest.map(field => `${field}`);
    console.log(printable.join(','));
  }
}

// ######################################################################
// # Main
// ######################################################################

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/git_complexity_trend.py}
 */
async function calculate_complexity_over_range(
  file_name: string,
  revision_range: [string, string],
) {
  const preprocessor = create_for(file_name);
  const [start_rev, end_rev] = revision_range;
  const revs = await read_revs_for(file_name, start_rev, end_rev);
  const complexity_by_rev = new Array<DescriptiveStats>();
  for (const rev of revs) {
    const historic_version = await read_version_matching(file_name, rev);
    const complexity_by_line = calculate_complexity_in(
      historic_version,
      preprocessor,
    );
    complexity_by_rev.push(as_stats(rev, complexity_by_line));
  }
  return complexity_by_rev;
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/git_complexity_trend.py}
 */
export async function run(args: {start: string; end: string; file: string}) {
  const revision_range: [string, string] = [args.start, args.end];
  const complexity_trend = await calculate_complexity_over_range(
    args.file,
    revision_range,
  );
  as_csv(complexity_trend);
}

// if __name__ == "__main__":
//     desc = 'Calculates whitespace complexity trends over a range of revisions.'
//     parser = argparse.ArgumentParser(
//         description=desc)
//     parser.add_argument(
//         '--start',
//         required=True,
//         help='The first commit hash to include')
//     parser.add_argument(
//         '--end',
//         required=True,
//         help='The last commit hash to include')
//     parser.add_argument('--file', required=True, type=str,
//                         help='The file to calculate complexity on')

//     args = parser.parse_args()
//     run(args)
