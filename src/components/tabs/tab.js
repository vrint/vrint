import { safeChildren, safeInvoke, classNames, extend } from '../../util/helper.js'
import * as Classes from '../../util/classes'

export const props = extend({
  title: String,

  disabled: Boolean,

  id: [String, Number]
})

export default {
  name: 'vr-tab',

  render(h) {
    const staticClass = Classes.TAB_PANEL
    const attrs = { role: 'tablist' }
    return h('div', { staticClass, attrs }, this.$slots.default)
  }
}
