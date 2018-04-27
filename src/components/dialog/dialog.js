import VrOverlay, { props as OverlayProps } from '../overlay/overlay'
import { safeInvoke, classNames, safeChildren, extend } from '../../util/helper'
import * as Classes from '../../util/classes'
import { Iconable } from '../../mixins'

const props = extend(
  {
    /**
     *
     */
    title: String,
    /**
     *
     */
    isCloseButtonShown: {
      type: Boolean,
      default: true
    },
    bodyClasses: {
      type: String,
      default: Classes.DIALOG_BODY
    },
    footerClasses: {
      type: String,
      default: Classes.DIALOG_FOOTER
    }
  },
  OverlayProps
)

delete props.contentClasses
delete props.transitionName

export { props }

export default {
  name: 'vr-dialog',

  props,

  mixins: [Iconable],

  render(h) {
    return h(
      VrOverlay,
      {
        props: {
          // canOutsideClickClose: this.canOutsideClickClose,
          canOutsideClickClose: false,
          autoFocus: this.autoFocus,
          enforceFocus: this.enforceFocus,
          isOpen: this.isOpen,
          lazy: this.lazy,
          usePortal: this.usePortal,
          hasBackdrop: this.hasBackdrop,
          onClose: this.onClose,
          classes: Classes.OVERLAY_SCROLL_CONTAINER,
          contentClasses: Classes.DIALOG_CONTAINER
        }
      },
      safeChildren(this.genWrapper())
    )
  },

  methods: {
    genWrapper() {
      let option = {}
      option.staticClass = classNames(Classes.DIALOG, this.classes)
      return this.$createElement('div', option, [
        this.genHeader(),
        this.genBody(),
        this.genFooter()
      ])
    },

    genHeader() {
      const { title, isCloseButtonShown, iconName: hasIcon } = this
      const hasSlotHeader = this.$slots.header
      const iconSize = 20

      if (!this.title && !hasSlotHeader) return null

      let option = {}
      option.staticClass = Classes.DIALOG_HEADER
      return this.$createElement('div', option, [
        hasIcon ? this.genIcon(this.iconName, iconSize) : null,
        hasSlotHeader ? this.$slots.header : this.wrapperTitleWithNode(),
        isCloseButtonShown ? this.genCloseButton() : null
      ])
    },

    genCloseButton() {
      const on = { click: this.onClose }
      const iconName = 'small-cross'
      const iconSize = 20

      const option = {}
      option.attrs = {}
      option.attrs['aria-label'] = 'close'
      option.on = on
      option.staticClass = Classes.DIALOG_CLOSE_BUTTON
      return this.$createElement('button', option, safeChildren(this.genIcon(iconName, iconSize)))
    },

    genBody() {
      const hasSlotBody = this.$slots.body
      const { bodyClasses: staticClass } = this
      let option = { staticClass }
      return this.$createElement('div', option, [
        hasSlotBody ? this.$slots.body : this.$slots.default
      ])
    },

    genFooter() {
      const hasSlotFooter = this.$slots.footer
      const hasSlotAction = this.$slots.action
      const { footerClasses: staticClass } = this
      if (!hasSlotFooter && !hasSlotAction) return null

      let option = { staticClass }
      let actionOption = {}
      actionOption.staticClass = Classes.DIALOG_FOOTER_ACTIONS

      let child = hasSlotFooter
        ? this.$slots.footer
        : this.$createElement('div', actionOption, this.$slots.action)
      return this.$createElement('div', option, safeChildren(child))
    },

    wrapperTitleWithNode() {
      return this.$createElement('h4', { staticClass: Classes.DIALOG_HEADER_TITLE }, this.title)
    }
  }
}
