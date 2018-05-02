import { Sizeable, Intentable } from '../../mixins'
import { classNames } from '../../util/helper'
import * as Classes from '../../util/classes'

export default {
  name: 'vr-button-group',

  mixins: [Sizeable, Intentable],

  render(h) {
    const staticClass = classNames(Classes.BUTTON_GROUP, this.sizeClass, this.intentClass)
    return h('div', { staticClass }, this.$slots.default)
  }
}
