import { Fail } from './Fail';
import { Okay } from './Okay';

type Result<TValue, TError extends Error> = Okay<TValue> | Fail<TError>;

export type {
  Result
};
