import { assert } from 'assertthat';
import { fail, isFailed, okay } from '../../lib';

suite('isFailed', (): void => {
  test(`returns true for something constructed with 'fail()'.`, async (): Promise<void> => {
    const result = fail(new Error());

    const isExFailed = isFailed(result);

    assert.that(isExFailed).is.true();
  });

  test(`returns false for something constructed with 'okay()'.`, async (): Promise<void> => {
    const result = okay({ foo: 'bar' });

    const isExFailed = isFailed(result);

    assert.that(isExFailed).is.false();
  });
});
