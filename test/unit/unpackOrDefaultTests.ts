import { assert } from 'assertthat';
import { fail, okay, unpackOrCrash, unpackOrDefault } from '../../lib';

suite('unpackOrDefault', (): void => {
  test('unpacks the result if it is not failed.', async (): Promise<void> => {
    const value = { foo: 'bar' };

    const result = okay(value);

    const unpackedResult = unpackOrCrash(result);

    assert.that(unpackedResult).is.equalTo(value);
  });

  test('returns the default value if the result is failed.', async (): Promise<void> => {
    const ex = new Error();
    const defaultValue = { foo: 'bar' };

    const result = fail(ex);

    const unpackedResult = unpackOrDefault(defaultValue, result);

    assert.that(unpackedResult).is.equalTo(defaultValue);
  });
});
