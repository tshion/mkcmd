import {strictEqual, throws} from 'node:assert';
import {test} from 'node:test';
import {parseVersionCode} from './meta.util';

void test('parseVersionCode', async context => {
  const fxTest = (versionText: string, expected: number) => {
    return context.test(versionText, async () => {
      const result = parseVersionCode(versionText);
      strictEqual(result, expected);
    });
  };

  await fxTest('0000.00.000', 0);
  await fxTest('0.0.0', 0);

  const caseMin = 1_01_010;
  await fxTest('0001.01.010', caseMin);
  await fxTest('1.1.10', caseMin);

  await fxTest('9999.12.319', 9999_12_319);

  await context.test('failures', async () => {
    throws(() => parseVersionCode('0.0'), SyntaxError);
    throws(() => parseVersionCode('0.0.'), SyntaxError);
    throws(() => parseVersionCode('0.0.0.0'), SyntaxError);
    throws(() => parseVersionCode('0.0.0.0.'), SyntaxError);
    throws(() => parseVersionCode('0.0.0.0.0'), SyntaxError);
    throws(() => parseVersionCode('a.b.c'), SyntaxError);
    throws(() => parseVersionCode('..'), SyntaxError);

    throws(() => parseVersionCode('10000.1.10'), RangeError);

    throws(() => parseVersionCode('1.13.10'), RangeError);

    throws(() => parseVersionCode('1.1.320'), RangeError);
  });
});
