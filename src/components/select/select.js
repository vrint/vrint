import * as Classes from '../../util/classes'
import { Sizeable, Activable } from '../../mixins'

export default {
  name: 'vr-select',

  props: {
    options: {
      type: Array,
      default: []
    },
    placeholder: String,
    value: [String, Number]
  },
  methods: {
    genOptions() {
      let optionElms = []
      let options = this.options
      let h = this.$createElement
      for (let i = 0; i < options.length; i++) {
        let { label, value } = options[i]
        let selected = value === this.value
        optionElms.push(h('option', { attrs: { value }, domProps: { selected } }, label))
      }
      if (this.placeholder) {
        optionElms.unshift(
          h(
            'option',
            {
              attrs: {
                disabled: true,
                selected: true,
                hidden: true
              },
              domProps: {
                value: ''
              }
            },
            this.placeholder
          )
        )
      }
      return optionElms
    },
    genSelect() {
      const h = this.$createElement
      return h('select', this.genOptions())
    },
    changeHandler(ev) {
      const el = ev.srcElement

      this.$emit('input', el.value)
      this.$emit(ev.type, el.value, ev.srcElement)
    }
  },

  render(h) {
    return h(
      'div',
      {
        staticClass: Classes.SELECT,
        on: {
          change: this.changeHandler
        }
      },
      [this.genSelect()]
    )
  }
}
