interface Okay<TValue> {
  isFailed: false;
  value: TValue;
}

const okay = function <TValue>(value: TValue): Okay<TValue> {
  return {
    isFailed: false,
    value
  };
};

export type {
  Okay
};
export {
  okay
};
