import { classNames } from '../../util/helper'
import * as Classes from '../../util/classes'
import { Activable, Sizeable, Intentable } from '../../mixins'

export default {
  name: 'vr-textarea',

  mixins: [Activable, Sizeable, Intentable],

  props: {
    rows: Number,
    cols: Number,
    value: String,
    placeholder: String,
    readonly: Boolean,
    maxlength: Number,
    minlength: Number,
    dir: String
  },

  methods: {
    handleChanged(ev) {
      let el = ev.srcElement
      this.$emit('change', el.value)
      this.$emit('input', el.value)
    },
    handleBlurOrFocus(ev) {
      this.$emit(ev.type, ev)
    }
  },

  render(h) {
    const { dir, readonly, rows, value, placeholder, maxlength, minlength, cols } = this
    return h('textarea', {
      staticClass: classNames(Classes.INPUT, this.intentClass, this.activeClass, this.sizeClass),
      attrs: { dir, readonly, rows, cols, placeholder, maxlength, minlength },
      on: {
        change: this.handleChanged,
        input: this.handleChanged,
        blur: this.handleBlurOrFocus,
        focus: this.handleBlurOrFocus
      },
      domProps: { value }
    })
  }
}
