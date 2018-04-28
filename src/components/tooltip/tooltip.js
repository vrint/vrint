import Popover from '../popover'
import { classNames, createTemplateWithName, extend } from '../../util/helper'
import * as Classes from '../../util/classes'
import { Intentable } from '../../mixins'
import intent from '../../util/intent'

export const props = extend({
  text: String,
  placement: String
})

export default {
  name: 'vr-tooltip',

  props,

  data() {
    return {
      isOpen: false
    }
  },

  mixins: [Intentable],

  render(h) {
    const classes = classNames(Classes.TOOLTIP, this.intentClass)
    const props = {
      canEscapeKeyClose: false,
      enforceFocus: false,
      interactionKind: 'hover',
      lazy: true,
      usePortal: true,
      popoverClasses: classes,
      isOpen: this.isOpen,
      placement: this.placement
    }
    const staticClass = Classes.TOOLTIP_INDICATOR
    return h(
      Popover,
      {
        props,
        staticClass,
        on: {
          change: val => {
            this.isOpen = val
          }
        }
      },
      [
        createTemplateWithName(
          h,
          'reference',
          this.text ? h('span', [this.text]) : this.$slots.default
        ),
        createTemplateWithName(h, 'content', this.$slots.content)
      ]
    )
  }
}
