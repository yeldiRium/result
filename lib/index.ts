import { isFailed } from './isFailed';
import { isOkay } from './isOkay';
import { Result } from './Result';
import { unpackOrCrash } from './unpackOrCrash';
import { unpackOrDefault } from './unpackOrDefault';
import { fail, Fail } from './Fail';
import { Okay, okay } from './Okay';

export type {
  Fail,
  Okay,
  Result
};
export {
  fail,
  isFailed,
  isOkay,
  okay,
  unpackOrCrash,
  unpackOrDefault
};
