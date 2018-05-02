import VrOverlay from './overlay'
import VrToast from './toast'
import * as Classes from '../../util/classes'
import { Position } from '../../util/position'
import { safeInvoke, extend, classNames } from '../../util/helper'
import { ESCAPE } from '../../util/keys'

const ToasterPosition = {
  TOP_LEFT: Position.TOP_LEFT,
  TOP: Position.TOP,
  TOP_RIGHT: Position.TOP_RIGHT,
  BOTTOM_RIGHT: Position.BOTTOM_RIGHT,
  BOTTOM: Position.BOTTOM,
  BOTTOM_LEFT: Position.BOTTOM_LEFT
}

const props = extend({
  autoFocus: Boolean,

  canEscapeKeyClear: Boolean,

  usePortal: {
    type: Boolean,
    default: true
  },

  position: {
    type: String,
    default: Position.TOP,
    validator: val => {
      return Object.values(ToasterPosition).indexOf(val)
    }
  }
})

export { props, ToasterPosition }

export default {
  name: 'vr-toaster',

  props,

  data() {
    return {
      toasts: [],
      key: 0
    }
  },

  render(h) {
    const classes = classNames(Classes.TOAST_CONTAINER, this.getPositionClasses())
    const props = {
      classes,
      autoFocus: this.autoFocus,
      canEscapeKeyClose: this.canEscapeKeyClear,
      canOutsideClickClose: false,
      enforceFocus: false,
      hasBackdrop: false,
      isOpen: this.hasToasts,
      onClose: this.handleClose,
      transitionName: Classes.TOAST,
      usePortal: this.usePortal
    }
    return h(VrOverlay, { props }, this.toasts.map(this.genToast))
  },

  computed: {
    hasToasts() {
      return this.toasts.length > 0 || Boolean(this.$slots.default)
    }
  },

  methods: {
    getToasts() {
      return this.toasts
    },

    genToast(toast) {
      const { position, message, key } = toast
      const props = {
        ...toast,
        position,
        message,
        onDismiss: this.getDismissHandler(key)
      }
      return this.$createElement(VrToast, { props, key })
    },

    show(optionOrMessage, key) {
      const isMsg = typeof optionOrMessage === 'string'
      const option = isMsg ? { message: optionOrMessage } : this.createToastOptions(optionOrMessage)

      const toastMatched = this.toasts.find(toast => toast.key === key)
      const isKeyExisted = Boolean(toastMatched)
      if (isKeyExisted) {
        const index = this.toasts.indexOf(toastMatched)
        this.toasts.slice(index, 1)
      }
      this.toasts.push(option)
    },

    dismiss(key, timeoutExpired) {
      this.toasts = this.toasts.filter(toast => {
        const isEqual = toast.key !== key
        isEqual && safeInvoke(toast.onDismiss, timeoutExpired)
        return isEqual
      })
    },

    clear() {
      this.toasts = this.toasts.filter(toast => {
        safeInvoke(toast.onDismiss, false)
        return false
      })
    },

    getDismissHandler(key) {
      return timeoutExpired => {
        this.dismiss(key, timeoutExpired)
      }
    },

    createToastOptions(option, key = `toast-${this.key++}`) {
      return { ...option, key }
    },

    getPositionClasses(position) {
      const positions = this.position.split('-')
      // NOTE that there is no -center class because that's the default style
      return positions.map(position => `${Classes.TOAST_CONTAINER}-${position.toLowerCase()}`)
    },

    handleClose(e) {
      // NOTE that `e` isn't always a KeyboardEvent but that's the only type we care about
      if (e.which === ESCAPE) {
        this.clear()
      }
    }
  }
}
