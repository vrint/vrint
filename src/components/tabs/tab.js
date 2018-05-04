import { safeChildren, safeInvoke, classNames, extend } from '../../util/helper.js'
import * as Classes from '../../util/classes'

export const props = extend({
  title: String,

  disabled: Boolean,

  id: [String, Number]
})

export default {
  name: 'vr-tab',

  props,

  render(h) {
    const attrs = { role: 'tablist' }
    return h('div', { attrs }, this.$slots.default)
  }
}
