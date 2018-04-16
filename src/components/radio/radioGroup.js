import * as Classes from '../../util/classes'
import Radio from './radio'

export default {
  name: 'vr-radio-group',

  props: {
    options: Array,
    group: String,
    inline: Boolean,
    value: String
  },

  methods: {
    genRadioOption() {
      return this.options.map(option => {
        let { inline, name, value: inputValue } = this
        let { label, value } = option
        let radio = this.$createElement(Radio, {
          on: { change: this.onChanged },
          props: { inline, label, value, name, inputValue }
        })
        return radio
      })
    },

    setInputValueOnVnode(vnode) {
      vnode.componentOptions.propsData.inputValue = this.value
      return vnode
    },

    getLabel() {
      return this.$createElement('label', { staticClass: Classes.LABEL }, this.label)
    },

    onChanged(inputValue) {
      this.$emit('input', inputValue)
      this.$emit('change', inputValue)
    }
  },

  render(h) {
    let children = this.options
      ? this.genRadioOption()
      : this.$slots.default.map(this.setInputValueOnVnode) || []

    if (this.label) children.unshift(this.genLabel)
    const attrs = { role: 'radiogroup' }
    return h('div', { attrs }, children)
  }
}
