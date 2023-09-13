export const memorizedClosureTime = () => {
  const cache = {};
  return (
    n: string,
    find: boolean = false,
    value: string | boolean | number = n
  ) => {
    if (find && n in cache) {
      return cache[n];
    } else {
      !find && (cache[n] = value);
    }
  };
};

export const memoClosureGlobal = memorizedClosureTime();

export enum GROUP_MEMO_GLOBAL {
  HAS_BIOMETRIC = 'hasBiometric'
}
