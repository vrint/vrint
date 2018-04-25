import VrButton from '../button'
import VrDialog, { props as dialogProps } from '../dialog/dialog'
import * as Classes from '../../util/classes'
import { safeInvoke, safeChildren, extend, createTemplateWithName } from '../../util/helper'
import { Iconable, Intentable } from '../../mixins'

const props = extend(
  {
    cancelButtonText: String,
    confirmButtonText: String,
    handleConfirm: Function,
    handleCancel: Function
  },
  dialogProps
)

delete props.title
delete props.bodyClasses
delete props.footerClasses
delete props.canEscapeKeyCancel
delete props.canOutsideClickCancel

export default {
  name: 'vr-alert',

  props,

  mixins: [Iconable, Intentable],

  methods: {
    genButton(text, clickHandler, intent) {
      const option = {
        props: { text, intent },
        on: { click: safeInvoke.bind(this, clickHandler) }
      }
      return this.$createElement(VrButton, option)
    },

    genContent() {
      let option = {}
      option.staticClass = Classes.ALERT_CONTENTS
      return this.$createElement('div', option, this.$slots.default)
    },

    genFooter() {
      const h = this.$createElement
      const { cancelButtonText, confirmButtonText, handleConfirm, handleCancel, intent } = this
      return createTemplateWithName(h, 'footer', [
        confirmButtonText ? this.genButton(confirmButtonText, handleConfirm, intent) : null,
        cancelButtonText ? this.genButton(cancelButtonText, handleCancel) : null
      ])
    }
  },

  render(h) {
    const option = {
      props: {
        isOpen: this.isOpen,
        onClose: this.onClose,
        classes: Classes.ALERT,
        bodyClasses: Classes.ALERT_BODY,
        footerClasses: Classes.ALERT_FOOTER,
        canEscapeKeyCancel: true,
        canOutsideClickCancel: true
      }
    }
    return h(VrDialog, option, [
      this.genIcon(this.iconName, 40),
      this.genContent(),
      this.genFooter()
    ])
  }
}
