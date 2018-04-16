import * as Classes from '../../util/classes'
import { classNames } from '../../util/helper'
import { Activable, Controlable, Intentable, Sizeable } from '../../mixins'
import input from '../input/input'

export default {
  name: 'vr-radio',

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  props: {
    label: String,
    name: String,
    inputValue: String,
    value: String,
    inline: Boolean
  },

  mixins: [Activable, Controlable, Intentable, Sizeable],

  methods: {
    genInputElement() {
      const type = 'radio'
      const { inputValue, disabled, value, name } = this
      const checked = this.value === inputValue

      return this.$createElement('input', {
        attrs: { type },
        on: { change: this.inputChangeHandler },
        domProps: { checked, disabled, value, name },
        ref: 'radio'
      })
    },

    genIndicator() {
      return this.$createElement('span', { staticClass: Classes.CONTROL_INDICATOR })
    },

    inputChangeHandler(el) {
      const inputRef = this.$refs.radio
      this.$emit('change', inputRef.value)
      this.$parent.onChanged(inputRef.value)
    }
  },

  render(h) {
    const textNode = this.$slots.default || this.label
    const staticClass = classNames(
      Classes.RADIO,
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
