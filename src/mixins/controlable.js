import * as Classes from '../util/classes'

export default {
  props: {
    checked: Boolean,
    inline: Boolean,
    label: String
  },

  methods: {
    genControl(type, className = {}) {
      let h = this.$createElement
      className = Object.assign(className, {
        [Classes.CONTROL]: true,
        [className]: true,
        [Classes.DISABLED]: this.disabled,
        [Classes.INLINE]: this.inline,
      })
      return h('label', { class: className }, [
        h('input', { attrs: { type } }),
        h('span', { staticClass: Classes.CONTROL_INDICATOR }),
        this.label,
        this.$slots.default
      ])
    }
  }
}
