import * as Classes from '../../util/classes'
import { classNames } from '../../util/helper'
import { Activable, Intentable, Sizeable } from '../../mixins'

export default {
  name: 'vr-switch',

  props: {
    inline: Boolean,
    checked: Boolean
  },

  mixins: [Activable, Intentable, Sizeable],

  methods: {
    genInputElement() {
      const type = 'checkbox'
      const role = 'switch'
      const checked = this.checked
      const disabled = this.disabled

      return this.$createElement('input', {
        attrs: { type, role },
        on: { change: this.inputChangeHandler },
        domProps: { checked, disabled },
        ref: 'switch'
      })
    },

    genIndicator() {
      return this.$createElement('span', { staticClass: Classes.CONTROL_INDICATOR })
    },

    inputChangeHandler(el) {
      const inputRef = this.$refs.switch
      const checked = inputRef.checked
      this.$emit('change', { checked, el })
    }
  },

  render(h) {
    const textNode = this.$slots.default || this.label
    const staticClass = classNames(
      Classes.SWITCH,
      {
        [Classes.CONTROL]: true,
        [Classes.INLINE]: this.inline
      },
      this.sizeClass,
      this.activeClass,
      this.intentClass
    )
    const children = [this.genInputElement(), this.genIndicator(), textNode]

    return this.$createElement('label', { staticClass }, children)
  }
}
