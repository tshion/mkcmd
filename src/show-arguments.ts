import {argv} from 'node:process';

/**
 * 受け取ったコマンドライン引数の表示
 *
 * @example
 * ``` sh
 * node show-arguments.js "${arg}" ...
 * ```
 *
 * @param args コマンドライン引数
 */
function main(args: string[]) {
  args.forEach((value, index) => {
    console.log(`argv[${index}]: ${value}`);
  });
}

+(async function () {
  main(argv);
})();
