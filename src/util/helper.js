// https://github.com/lodash/lodash/blob/master/compact.js
export function compact(array) {
  let resIndex = 0
  const result = []

  if (array == null) {
    return result
  }

  for (const value of array) {
    if (value) {
      result[resIndex++] = value
    }
  }
  return result
}

export function clamp(val, min, max) {
  if (val == null) {
    return val
  }
  if (max < min) {
    throw new Error(`clamp: max cannot be less than min`)
  }
  return Math.min(Math.max(val, min), max)
}

export function safeInvoke(func, ...args) {
  const isFunction = typeof func === 'function'
  if (isFunction) {
    return func(...args)
  }
}

export function classNames(...args) {
  let str = ''
  for (let name of args) {
    if (typeof name === 'string') {
      str += name + ' '
    } else if (typeof name === 'object') {
      let keys = Object.keys(name)
      str += keys.filter(i => name[i]).join(' ') + ' '
    }
  }
  return str.slice(0, -1)
}
