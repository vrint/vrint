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
  let str = []
  const SPACER = ' '
  for (let className of args) {
    if (typeof className === 'string') {
      str = str.concat(className.split(SPACER))
    } else if (className instanceof Array) {
      str = str.concat(className)
    } else if (typeof className === 'object') {
      let keys = Object.keys(className)
      str = str.concat(keys.map(i => className[i] && i))
    }
  }
  return str.filter(i => i).join(' ')
}

export function safeChildren(...args) {
  let children = []
  args.forEach(child => {
    if (child instanceof Array) {
      children = children.concat(child)
    } else {
      children.push(child)
    }
  })
  return children
}

// createTemplateWithName(h, 'body', [])
export function createTemplateWithName(h, slot, children) {
  return h('template', { slot }, children)
}

export function createFunctionalComponent(option) {
  return {
    name: option.name,
    functional: true,
    mixins: option.mixins,
    props: option.props,
    render(h, context) {
      const {
        class: dynamicClass,
        staticClass,
        staticStyle = {},
        style: dynamicStyle = {}
      } = context.props
      const classesSetOnTemplate = classNames(dynamicClass, staticClass)
      const stylesSetOnTemplate = Object.assign(staticStyle, dynamicStyle)
      return option.render(h, context, classesSetOnTemplate, stylesSetOnTemplate)
    }
  }
}

export function extend(to, from) {
  for (const key in from) {
    to[key] = from[key]
  }
  return to
}
