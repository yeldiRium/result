import { Fail } from './Fail';
import { Result } from './Result';

const isFailed = function <TValue, TError extends Error>(ex: Result<TValue, TError>): ex is Fail<TError> {
  return ex.isFailed;
};

export {
  isFailed
};
