import { Activable } from '../../mixins'
import { classNames } from '../../util/helper'
import * as Classes from '../../util/classes'

export default {
  name: 'vr-label',

  mixins: [Activable],

  props: {
    text: String,
    inline: Boolean,
    helperText: String
  },

  methods: {
    genMutedTextNode() {
      if (!this.helperText) return null

      return this.$createElement('span', { staticClass: Classes.TEXT_MUTED }, this.helperText)
    }
  },

  render(h) {
    const defaultSlot = this.$slots.default
    const children = [this.text, this.genMutedTextNode(), defaultSlot]
    return h(
      'label',
      {
        staticClass: classNames(
          Classes.LABEL,
          {
            [Classes.INLINE]: this.inline
          },
          this.activeClass
        )
      },
      children
    )
  }
}
