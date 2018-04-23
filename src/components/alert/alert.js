import VrDialog from '../dialog'
import VrButton from '../button'
import * as Classes from '../../util/classes'
import { safeInvoke, classNames } from '../../util/helper'
import { Iconable, Escable, Outclickable, Footerable, Intentable } from '../../mixins'

export default {
  name: 'vr-alert',

  mixins: [Iconable, Escable, Outclickable, Footerable, Intentable],

  props: {
    isOpen: Boolean
  },

  methods: {
    genButton(text, clickHandler, intent) {
      return this.$createElement(VrButton, {
        props: {
          text,
          intent
        },
        on: {
          click: e => {
            safeInvoke(clickHandler, e)
          }
        }
      })
    },

    genAlertBody() {
      const h = this.$createElement
      const AlertContentClass = { staticClass: Classes.ALERT_CONTENTS }
      const AlertBodyClass = { staticClass: Classes.ALERT_BODY }
      const iconNode = this.genIcon(this.iconName, 40)
      const contentNode = h('div', { ...AlertBodyClass }, [iconNode, this.$slots.default])
      return h('template', { slot: 'body' }, [contentNode])
    },

    genAlertFooter() {
      const h = this.$createElement
      const customFooter = this.$slots.footer
      const AlertFooterClass = { staticClass: Classes.ALERT_FOOTER }
      const { cancelButtonText, confirmButtonText, handleConfirm, handleCancel } = this
      if (customFooter) {
        return h('template', { slot: 'footer' }, customFooter)
      }

      const footerNode = h('div', { ...AlertFooterClass }, [
        this.genButton(confirmButtonText, handleConfirm, this.intent),
        cancelButtonText ? this.genButton(cancelButtonText, handleCancel) : null
      ])

      return h('template', { slot: 'footer' }, [footerNode])
    }
  },

  render(h) {
    const {
      isOpen,
      intent,
      canEscapeKeyCancel,
      canOutsideClickCancel,
      handleCancel: onClose
    } = this

    const className = Classes.ALERT
    const footerClassName = Classes.ALERT_FOOTER
    return h(
      VrDialog,
      {
        props: {
          isOpen,
          onClose,
          className,
          footerClassName,
          canEscapeKeyCancel,
          canOutsideClickCancel
        }
      },
      [this.genAlertBody(), this.genAlertFooter()]
    )
  }
}
