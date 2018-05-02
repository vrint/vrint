import * as Classes from '../../util/classes'
import { safeInvoke, extend, classNames, safeChildren } from '../../util/helper'
import { VrIcon, VrButton, VrButtonGroup } from '../'
import { Intentable, Timerable } from '../../mixins'

const props = extend({
  action: {
    type: Object,
    default: () => ({})
  },

  iconName: String,

  message: [String, Object, Array],

  onDismiss: Function,

  timeout: {
    type: Number,
    default: 5000
  }
})

export default {
  name: 'vr-toast',

  props,

  mixins: [Intentable, Timerable],

  render(h) {
    const { iconName, icon, intent, message } = this
    const classes = classNames(Classes.TOAST, Classes.intentClass(intent))
    const option = {
      staticClass: classes,
      on: {
        blur: this.startTimeout,
        focus: this.clearTimeouts,
        mouseenter: this.clearTimeouts,
        mouseleave: this.startTimeout
      },
      attrs: {
        tabindex: 0
      }
    }

    return h('div', option, [
      iconName ? h(VrIcon, { props: { iconName } }) : null,
      h('span', { staticClass: Classes.TOAST_MESSAGE }, safeChildren(message)),
      this.genButtonGroup()
    ])
  },

  methods: {
    genButtonGroup() {
      const closeButton = this.$createElement(VrButton, {
        props: {
          iconName: 'cross'
        },
        on: {
          click: this.handleCloseClick
        }
      })

      const minimal = true
      return this.$createElement(VrButtonGroup, { props: { minimal } }, [
        this.action.text
          ? this.$createElement(VrButton, { on: { click: this.handleActionClick } }, safeChildren(this.action.text))
          : null,
        closeButton
      ])
    },

    handleActionClick(e) {
      safeInvoke(this.action.handler, e)
      this.triggerDismiss(false)
    },

    handleCloseClick() {
      this.triggerDismiss(false)
    },

    triggerDismiss(didTimeoutExpire) {
      safeInvoke(this.onDismiss, didTimeoutExpire)
      this.clearTimeouts()
    },

    startTimeout() {
      if (this.timeout > 0) {
        this.setTimeout(() => this.triggerDismiss(true), this.timeout)
      }
    }
  }
}
