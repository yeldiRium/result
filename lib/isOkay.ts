import { Okay } from './Okay';
import { Result } from './Result';

const isOkay = function <TValue, TError extends Error> (ex: Result<TValue, TError>): ex is Okay<TValue> {
  return !ex.isFailed;
};

export {
  isOkay
};
