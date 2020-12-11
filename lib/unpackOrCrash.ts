import { isFailed } from './isFailed';
import { Result } from './Result';

const unpackOrCrash = function <TValue, TError extends Error>(ex: Result<TValue, TError>): TValue {
  if (isFailed(ex)) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw ex.error;
  }

  return ex.value;
};

export {
  unpackOrCrash
};
