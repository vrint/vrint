import * as Classes from '../../util/classes'
import { classNames } from '../../util/helper'
import { Sizeable, Intentable, Activable, Roundable, Iconable } from '../../mixins'

/* @template
*  <vr-input>
*   <vr-icon iconName=""/>
*   <vr-button text="search"/>
*  </vrinput>
*/

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
    },

    genInputElement() {
      const type = 'text'
      const autocomplete = 'off'
      const { dir, placeholder, value } = this
      return this.$createElement('input', {
        domProps: { value },
        attrs: { type, autocomplete, dir, placeholder },
        staticClass: classNames(
          Classes.INPUT,
          this.intentClass,
          this.sizeClass,
          this.activeClass,
          this.roundClass
        ),
        on: {
          change: this.inputChangeHandler,
          input: this.inputChangeHandler
        }
      })
    }
  },

  render(h) {
    const input = this.genInputElement()
    const defaultSlot = this.$slots.default || []
    const hasChildNode = defaultSlot.length !== 0
    if (!hasChildNode && !this.iconName) {
      return input
    } else if (!hasChildNode && this.iconName) {
      const icon = this.genIcon()
      return h('div', { staticClass: Classes.INPUT_GROUP }, [icon, input])
    } else {
      return h('div', { staticClass: Classes.INPUT_GROUP }, defaultSlot)
    }
  }
}
