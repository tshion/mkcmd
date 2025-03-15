import {strictEqual, throws} from 'node:assert';
import {test} from 'node:test';
import {parseVersionCode} from '../../src/model/meta.const';

void test('parseVersionCode', async context => {
  const fxTest = (versionText: string, expected: number) => {
    return context.test(versionText, async () => {
      const result = parseVersionCode(versionText);
      strictEqual(result, expected);
    });
  };

  await fxTest('0.0.0', 0);

  const expected = 2025_03_09;
  await fxTest('2025.03.09', expected);
  await fxTest('2025.3.9', expected);

  await context.test('failures', async () => {
    throws(() => parseVersionCode('0.0'));
    throws(() => parseVersionCode('0.0.0.0'));
  });
});
