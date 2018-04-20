import { Intentable, Iconable, Titleable } from '../../mixins'
import { classNames } from '../../util/helper'
import VrIcon from '../icon'
import * as Classes from '../../util/classes'

export default {
  name: 'vr-callout',

  functional: true,

  mixins: [Intentable, Iconable, Titleable],

  render(h, context) {
    const INTENT = ['primary', 'danger', 'success', 'warning']
    let children = []
    let { iconName, title, intent } = context.props

    if (iconName) {
      let icon = h('span', [h(VrIcon, { props: { iconName, iconSize: 20 } })])
      children.push(icon)
    }
    if (title) {
      children.push(h('h4', { staticClass: Classes.CALLOUT_TITLE }, [title]))
    }
    let data = {
      staticClass: classNames(Classes.CALLOUT, {
        [`pt-intent-${intent}`]: INTENT.indexOf(intent) !== -1,
        [Classes.CALLOUT_ICON]: iconName
      })
    }
    return h('div', data, [...children, ...context.children])
  }
}
