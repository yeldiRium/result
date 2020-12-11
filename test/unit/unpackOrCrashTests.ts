import { assert } from 'assertthat';
import { fail, okay, unpackOrCrash } from '../../lib';

suite('unpackOrCrash', (): void => {
  test('unpacks the result if it is not failed.', async (): Promise<void> => {
    const value = { foo: 'bar' };

    const result = okay(value);

    const unpackedResult = unpackOrCrash(result);

    assert.that(unpackedResult).is.equalTo(value);
  });

  test('throws the contained error if the result is failed.', async (): Promise<void> => {
    const ex = new Error();

    const result = fail(ex);

    assert.that((): void => {
      unpackOrCrash(result);
    }).is.throwing((unpackedEx): boolean => {
      assert.that(unpackedEx).is.equalTo(ex);

      return true;
    });
  });
});
