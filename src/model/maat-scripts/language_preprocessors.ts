import {extname} from 'node:path';

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/language_preprocessors.py}
 */
export interface LanguagePreprocessor {
  process(source: string): string;
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/language_preprocessors.py}
 */
class PassThrough implements LanguagePreprocessor {
  public process(source: string): string {
    return source;
  }
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/language_preprocessors.py}
 */
class RemoveLeadingHashCharactersFromXpo implements LanguagePreprocessor {
  private readonly regex = /^(\s*)#/gm;

  public process(source: string): string {
    return source.replace(this.regex, '$1');
  }
}

/**
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/language_preprocessors.py}
 */
export function create_for(file_name: string): LanguagePreprocessor {
  const extension = extname(file_name).replace('.', '');
  if (extension === 'xpo') {
    return new RemoveLeadingHashCharactersFromXpo();
  }
  return new PassThrough();
}
