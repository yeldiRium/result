interface Okay<TValue> {
  isFailed: false;
  value: TValue;
}

const okay: {
  <TValue extends undefined>(): Okay<TValue>;
  <TValue>(value: TValue): Okay<TValue>;
} = function <TValue>(value?: TValue): Okay<TValue | undefined> {
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
