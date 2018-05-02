import * as Classes from '../../util/classes'
import { classNames } from '../../util/helper'
import { Intentable, Activable, Sizeable, Iconable, Loadable } from '../../mixins'

export default {
  name: 'vr-button',

  mixins: [Intentable, Activable, Sizeable, Iconable, Loadable],

  props: {
    text: String
  },

  watch: {
    loading(val) {
      this.disabled = val || this.disabled
    }
  },

  methods: {
    clickHandler(e) {
      this.$emit('click', e)
    }
  },

  render(h) {
    const data = {
      staticClass: classNames(
        Classes.BUTTON,
        this.sizeClass,
        this.loaderClass,
        this.activeClass,
        this.intentClass
      ),
      attrs: {
        type: 'button'
      },
      on: {
        click: this.clickHandler
      }
    }

    let text = this.text ? this.text : this.$slots.default
    return h('button', data, [
      this.loading ? this.genLoader({ type: 'button', size: 'small' }) : null,
      this.iconName ? this.genIcon() : null,
      text ? h('span', { staticClass: Classes.BUTTON_TEXT }, text) : null
    ])
  }
}
