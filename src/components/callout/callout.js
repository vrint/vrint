import { Intentable, Iconable, Titleable } from '../../mixins'
import VrIcon from '../icon'
import * as Classes from '../../util/classes'
export default {
  name: 'vr-callout',

  functional: true,

  mixins: [Intentable, Iconable, Titleable],

  render(h, context) {
    let children = []
    let { iconName, title, intent } = context.props

    if (iconName) {
      let icon = h('span', { staticClass: Classes.CALLOUT_ICON }, [h(VrIcon, { props: { iconName, iconSize: 20 } })])
      children.push(icon)
    }
    if (title) {
      children.push(h('h4', { staticClass: Classes.CALLOUT_TITLE }, [title]))
    }
    let data = {
      staticClass: Classes.CALLOUT,
      class: `pt-intent-${intent}`
    }
    return h('div', data, [...children, ...context.children])
  }
}
