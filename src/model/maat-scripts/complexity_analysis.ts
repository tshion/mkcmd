// ######################################################################
// # This program calculates the whitespace complexity of a file.
// ######################################################################

import {readFile} from 'node:fs/promises';
import {DescriptiveStats} from './desc_stats';
import {create_for} from './language_preprocessors';
import {calculate_complexity_in} from './complexity_calculations';

// ######################################################################
// # Statistics from complexity
// ######################################################################

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/complexity_analysis.py}
 */
function as_stats(revision: string, complexity_by_line: number[]) {
  return new DescriptiveStats(revision, complexity_by_line);
}

// ######################################################################
// # Output
// ######################################################################

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/complexity_analysis.py}
 */
function as_csv(stats: DescriptiveStats) {
  console.log('n,total,mean,sd,max');
  const fields_of_interest = [
    stats.n_revs,
    stats.total,
    parseFloat(stats.mean().toFixed(2)),
    parseFloat(stats.sd().toFixed(2)),
    stats.max_value(),
  ];
  const printable = fields_of_interest.map(field => `${field}`);
  console.log(printable.join(','));
}

// ######################################################################
// // Main
// ######################################################################

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/complexity_analysis.py}
 */
export async function run(args: {file: string}) {
  const file_to_calc = await readFile(args.file, {encoding: 'utf-8'});
  const preprocessor = create_for(args.file);
  const complexity_by_line = calculate_complexity_in(
    file_to_calc,
    preprocessor,
  );
  const stats = new DescriptiveStats(args.file, complexity_by_line);
  as_csv(stats);
}

// if (require.main === module) {
//   const args = process.argv.slice(2);
//   const fileArg = args[0];
//   if (!fileArg) {
//     console.error('The file to calculate complexity on is required.');
//     process.exit(1);
//   }
//   run({file: fileArg});
// }
