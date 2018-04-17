import * as Classes from '../../util/classes'
import { Sizeable, Activable } from '../../mixins'

export default {
  name: 'vr-dropdown',

  mixins: [Sizeable, Activable],

  props: {
    value: String,
    options: {
      type: Array,
      default: []
    },
    placeholder: String
  },

  methods: {
    genOptionNode(option) {
      const { label, value, options } = option
      if (options) {
        const attrs = { label }
        return this.$createElement('optgroup', { attrs }, options.map(this.genOptionNode))
      } else {
        const selected = this.value === value
        const attrs = { value }
        const domProps = { selected }
        return this.$createElement('option', { attrs, domProps }, label)
      }
    },

    genPlaceholderNode() {
      const selected = !this.value
      const attrs = { disabled: true, selected, hidden: true }
      const value = ''
      return this.$createElement('option', { attrs, value }, this.placeholder)
    },

    changeHandler(ev) {
      const el = ev.srcElement

      this.$emit('input', el.value)
      this.$emit(ev.type, el.value, ev.srcElement)
    }
  },

  render(h) {
    const options = this.options.map(this.genOptionNode)
    if (this.placeholder) {
      options.unshift(this.genPlaceholderNode())
    }
    const on = { change: this.changeHandler }
    const select = h('select', { on }, options)
    return h('div', { staticClass: Classes.SELECT }, [select])
  }
}
