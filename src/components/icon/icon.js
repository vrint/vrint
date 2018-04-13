import { IconSvgPaths16, IconSvgPaths20 } from './generated/iconSvgPaths'
import * as Classes from '../../util/classes'
import { classNames } from '../../util/helper'

export default {
  name: 'vr-icon',

  functional: true,

  props: {
    intent: String,
    title: String,
    iconName: {
      type: String,
      required: true
    },
    iconSize: {
      type: Number,
      default: 16
    }
  },

  render(h, context) {
    let { iconName, iconSize, title, intent = '' } = context.props
    let viewBox = iconSize > 16 ? '0 0 20 20' : '0 0 16 16'
    let intentType = intent.toUpperCase()
    let data = {
      class: classNames(Classes.ICON, Classes[`INTENT_${intentType}`]),
      attrs: { 'data-icon': iconName, width: iconSize, height: iconSize, viewBox }
    }
    let paths = iconSize > 16 ? IconSvgPaths20[iconName] : IconSvgPaths16[iconName]
    if (paths) {
      paths = paths.map(path => h('path', { attrs: { d: path, 'fill-rule': 'evenodd' } }))
    }

    if (title) {
      paths.unshift(h('title', title))
    }
    return h('svg', data, paths)
  }
}
