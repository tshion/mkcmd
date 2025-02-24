import {argv} from 'node:process';

/**
 * 受け取ったコマンドライン引数の表示
 *
 * @param args コマンドライン引数
 *
 * @example
 * ``` shell
 * node show-arguments.js {{ ??? }} ...
 * ```
 */
function main(args: string[]) {
  args.forEach((value, index) => {
    console.log(`argv[${index}]: ${value}`);
  });
}

+(async function () {
  main(argv);
})();
