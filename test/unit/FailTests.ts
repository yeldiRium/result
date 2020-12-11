import { assert } from 'assertthat';
import { fail } from '../../lib';

suite('fail', (): void => {
  test('constructs the Fail type.', async (): Promise<void> => {
    const ex = new Error();

    const result = fail(ex);

    assert.that(result).is.equalTo({
      isFailed: true,
      error: ex
    });
  });

  test('works with custom error types.', async (): Promise<void> => {
    class CustomError extends Error {}
    const ex = new CustomError();

    const result = fail(ex);

    assert.that(result).is.equalTo({
      isFailed: true,
      error: ex
    });
  });
});
