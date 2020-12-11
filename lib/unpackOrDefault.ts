import { isFailed } from './isFailed';
import { Result } from './Result';

const unpackOrDefault = function <TValue, TError extends Error>(defaultValue: TValue, ex: Result<TValue, TError>): TValue {
  if (isFailed(ex)) {
    return defaultValue;
  }

  return ex.value;
};

export {
  unpackOrDefault
};
