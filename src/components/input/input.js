import * as Classes from '../../util/classes'
import { Sizeable, Intentable, Activable, Roundable, Iconable } from '../../mixins'
export default {
  name: 'vr-input',

  mixins: [Sizeable, Intentable, Activable, Roundable, Iconable],

  props: {
    placeholder: String,
    value: [Number, String],
    dir: {
      type: String,
      default: 'auto'
    }
  },

  methods: {
    inputChangeHandler(ev) {
      let eventType = ev.constructor.name
      let el = ev.srcElement

      this.$emit('input', el.value)
      this.$emit(ev.type, el.value, ev.srcElement)
    }
  },

  render(h) {
    const classes = Object.assign(
      {},
      this.intentClass,
      this.sizeClass,
      this.activeClass,
      this.roundClass
    )

    let input = h('input', {
      staticClass: Classes.INPUT,
      class: classes,
      attrs: {
        type: 'text',
        autocomplete: 'off',
        placeholder: this.placeholder,
        dir: this.dir
      },
      domProps: {
        value: this.value
      },
      on: {
        change: this.inputChangeHandler,
        input: this.inputChangeHandler
      }
    })

    if (this.iconName) {
      const icon = this.genIcon()
      return h(
        'div',
        {
          staticClass: Classes.INPUT_GROUP
        },
        [icon, input]
      )
    } else {
      return input
    }
  }
}
