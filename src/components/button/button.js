import * as Classes from '../../util/classes'

import { Intentable, Activable, Sizeable, Iconable, Loadable } from '../../mixins'

export default {
  name: 'vr-button',

  mixins: [Intentable, Activable, Sizeable, Iconable, Loadable],

  props: {
    minimal: {
      type: Boolean,
      default: false
    },
    text: String
  },

  watch: {
    loading(val) {
      this.disabled = val || this.disabled
    }
  },

  computed: {
    classes() {
      return Object.assign(
        {
          [Classes.BUTTON]: true,
          [Classes.MINIMAL]: this.minimal
        },
        this.sizeClass,
        this.loaderClass,
        this.activeClass,
        this.intentClass
      )
    }
  },

  methods: {
    clickHandler(e) {
      this.$emit('click', e)
    }
  },

  render(h) {
    const data = {
      class: this.classes,
      on: {
        click: this.clickHandler
      }
    }

    let children = []
    if (this.loading) {
      children.push(this.genLoader({ type: 'button', size: 'small' }))
    }

    if (this.iconName) {
      children.push(this.genIcon())
    }

    let text = this.text ? this.text : this.$slots.default
    children.push(h('span', { staticClass: Classes.BUTTON_TEXT }, text))
    return h('button', data, children)
  }
}
