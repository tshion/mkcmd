/**
 * Basic mathematical statistics (yes, I know - NumPy would be better,
 * but I want to make the scripts stand-alone for now).
 *
 * Original: {@link https://github.com/adamtornhill/maat-scripts/blob/python3/miner/desc_stats.py}
 */
export class DescriptiveStats {
  public readonly total: number;
  public readonly n_revs: number;

  public constructor(
    public readonly name: string,
    private readonly _all_values: number[],
  ) {
    this.total = _all_values.reduce((acc, val) => acc + val, 0);
    this.n_revs = _all_values.length;
  }

  public mean() {
    return this.total / this._protected_n();
  }

  public max_value() {
    return Math.max(...this._all_values);
  }

  private min_value() {
    return Math.min(...this._all_values);
  }

  public sd() {
    let std = 0;
    const mean = this.mean();
    for (const a of this._all_values) {
      std = std + (a - mean) ** 2;
    }
    std = Math.sqrt(std / this._protected_n());
    return std;
  }

  private _protected_n() {
    const n = this.n_revs;
    return Math.max(n, 1);
  }
}
