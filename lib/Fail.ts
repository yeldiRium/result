interface Fail<TError extends Error> {
  isFailed: true;
  error: TError;
}

const fail = function <TError extends Error>(error: TError): Fail<TError> {
  return {
    isFailed: true,
    error
  };
};

export type {
  Fail
};
export {
  fail
};
