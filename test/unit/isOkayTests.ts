import { assert } from 'assertthat';
import { fail, isOkay, okay } from '../../lib';

suite('isOkay', (): void => {
  test(`returns true for something constructed with 'okay()'.`, async (): Promise<void> => {
    const result = okay({ foo: 'bar' });

    const isExFailed = isOkay(result);

    assert.that(isExFailed).is.true();
  });

  test(`returns false for something constructed with 'fail()'.`, async (): Promise<void> => {
    const result = fail(new Error());

    const isExFailed = isOkay(result);

    assert.that(isExFailed).is.false();
  });
});
