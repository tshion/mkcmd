import {LanguagePreprocessor} from './language_preprocessors';

// ######################################################################
// # Complexity calculations
// ######################################################################

const leading_tabs_expr = /^(\t+)/;
const leading_spaces_expr = /^( +)/;
const empty_line_expr = /^\s*$/;

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/complexity_calculations.py}
 */
function n_log_tabs(line: string) {
  const pattern = / +/;
  const wo_spaces = line.replace(pattern, '');
  const m = leading_tabs_expr.exec(wo_spaces);
  if (m) {
    const tabs = m[0];
    return tabs.length;
  }
  return 0;
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/complexity_calculations.py}
 */
function n_log_spaces(line: string) {
  const pattern = /\t+/;
  const wo_tabs = line.replace(pattern, '');
  const m = leading_spaces_expr.exec(wo_tabs);
  if (m) {
    const spaces = m[0];
    return spaces.length;
  }
  return 0;
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/complexity_calculations.py}
 */
function contains_code(line: string) {
  return !empty_line_expr.test(line);
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/complexity_calculations.py}
 */
export function complexity_of(line: string) {
  return n_log_tabs(line) + n_log_spaces(line) / 4; // hardcoded indentation
}

// ######################################################################
// # Statistics from complexity
// ######################################################################

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/complexity_calculations.py}
 */
export function calculate_complexity_in(
  source: string,
  preprocessor: LanguagePreprocessor,
) {
  const preprocessed_source = preprocessor.process(source);
  return preprocessed_source
    .split('\n')
    .filter(contains_code)
    .map(complexity_of);
}
