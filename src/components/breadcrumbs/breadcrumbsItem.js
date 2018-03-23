import * as Classes from '../../util/classes'
import { Activable } from '../../mixins'

export default {
  name: 'vr-breadcrumb-item',

  functional: true,

  mixins: [Activable],

  props: {
    collapsed: Boolean
  },

  render(h, context) {
    let { collapsed, disabled } = context.props
    let data = {
      staticClass: collapsed ? Classes.BREADCRUMBS_COLLAPSED : Classes.BREADCRUMB,
      class: {
        'pt-disabled': disabled
      }
    }
    return h('li', [h('a', data, context.children)])
  }
}
