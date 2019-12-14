import { guard, Unit, Store } from 'effector';

interface Config<S, T, K> {
  data: Store<S>;
  target: { [P in keyof T]: Unit<K> };
  filter: { [P in keyof T]: (s: S) => boolean };
}

export function guardShape<S, T, K>(
  source: Unit<K>,
  { data, target, filter }: Config<S, T, K>
) {
  const cases = decompose(data, filter);
  for (const key in target) {
    guard({
      source,
      filter: cases[key],
      target: target[key]
    });
  }
}
function decompose<S, T>(
  unit: Store<S>,
  shape: { [P in keyof T]: (s: S) => boolean }
) {
  const result = {} as { [P in keyof T]: Store<boolean> };
  for (const key in shape) {
    result[key] = unit.map(shape[key]);
  }
  return result;
}
