import { assert } from 'assertthat';
import { okay } from '../../lib';

suite('okay', (): void => {
  test('constructs the Okay type.', async (): Promise<void> => {
    const value = { foo: 'bar' };

    const result = okay(value);

    assert.that(result).is.equalTo({
      isFailed: false,
      value
    });
  });
});
