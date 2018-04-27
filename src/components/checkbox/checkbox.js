import * as Classes from '../../util/classes'
import { classNames } from '../../util/helper'
import { Activable, Intentable, Sizeable } from '../../mixins'

export default {
  name: 'vr-checkbox',

  model: {
    prop: 'checked',
    event: 'checkChange'
  },

  props: {
    value: String,
    checked: Boolean,
    inline: Boolean,
    indeterminate: Boolean
  },

  mixins: [Activable, Intentable, Sizeable],

  methods: {
    genInputElement() {
      const type = 'checkbox'
      const checked = this.checked
      const indeterminate = !this.checked && this.indeterminate
      const disabled = this.disabled

      return this.$createElement('input', {
        attrs: { type },
        on: { change: this.inputChangeHandler },
        domProps: { checked, indeterminate, disabled },
        ref: 'checkbox'
      })
    },

    genIndicator() {
      return this.$createElement('span', { staticClass: Classes.CONTROL_INDICATOR })
    },

    inputChangeHandler(el) {
      const inputRef = this.$refs.checkbox
      const { checked, indeterminate } = inputRef.checked
      this.$emit('checkChange', checked, indeterminate, el)
    }
  },

  render(h) {
    const textNode = this.$slots.default || this.label
    const staticClass = classNames(
      Classes.CHECKBOX,
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
