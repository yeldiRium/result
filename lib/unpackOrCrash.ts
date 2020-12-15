import { isFailed } from './isFailed';
import { Result } from './Result';

const unpackOrCrash = function <TValue, TError extends Error>(
  ex: Result<TValue, TError>,
  handleError?: (oldEx: Error) => Error
): TValue {
  if (isFailed(ex)) {
    if (handleError) {
      throw handleError(ex.error);
    }
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw ex.error;
  }

  return ex.value;
};

export {
  unpackOrCrash
};
