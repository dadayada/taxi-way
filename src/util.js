import { guard } from 'effector'

export function guardShape(source, {data, target, filter}) {
  const cases = decompose(data, filter)
  for (const key in target) {
    guard({
      source,
      filter: cases[key],
      target: target[key],
    })
  }
}
function decompose(unit, shape) {
  const result = {}
  for (const key in shape) {
    result[key] = unit.map(shape[key])
  }
  return result
}