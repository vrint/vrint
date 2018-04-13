import VrOverlay from '../overlay/overlay'
import { safeInvoke, classNames } from '../../util/helper'
import * as Classes from '../../util/classes'
import { Iconable } from '../../mixins'

export default {
  name: 'vr-dialog',

  mixins: [Iconable],

  props: {
    isOpen: Boolean,
    isClossButtonShown: {
      type: Boolean,
      default: true
    },
    canOutsideClickClose: {
      type: Boolean,
      default: true
    },
    title: String,
    className: String,
    onClose: Function,
    footerClassName: String
  },

  methods: {
    genContainer(children) {
      const h = this.$createElement
      const { onClose, isOpen, canOutsideClickClose } = this
      return h(
        VrOverlay,
        {
          staticClass: Classes.OVERLAY_SCROLL_CONTAINER,
          props: {
            isOpen,
            onClose,
            canOutsideClickClose,
            hasBackdrop: true,
            className: Classes.DIALOG_CONTAINER
          }
        },
        [h('div', { staticClass: classNames(Classes.DIALOG, this.className) }, children)]
      )
    },

    renderBody(children) {
      const bodySlot = this.$slots.body
      if (bodySlot) {
        return bodySlot
      } else {
        const h = this.$createElement
        return h('div', { class: Classes.DIALOG_BODY }, children)
      }
    },

    genTitle() {
      if (!this.title) {
        return null
      }
      const h = this.$createElement
      return h('h4', { staticClass: Classes.DIALOG_HEADER_TITLE }, this.title)
    },

    maybeRenderCloseButton() {
      const h = this.$createElement
      if (!this.isClossButtonShown) {
        return null
      } else {
        return h(
          'button',
          {
            staticClass: Classes.DIALOG_CLOSE_BUTTON,
            on: {
              click: this.onClose
            },
            attrs: {
              'aria-label': 'Close'
            }
          },
          [this.genIcon('small-cross', 20)]
        )
      }
    },

    maybeRenderHeader() {
      const { title } = this
      const h = this.$createElement
      if (title == null) {
        return undefined
      }
      const icon = this.iconName ? this.genIcon() : null
      return h(
        'div',
        {
          staticClass: Classes.DIALOG_HEADER
        },
        [icon, this.genTitle(), this.maybeRenderCloseButton()]
      )
    },

    maybeRenderFooter() {
      const h = this.$createElement
      const { footerClassName: staticClass } = this
      const footerNode = this.$slots.footer
      if (!footerNode) {
        return null
      }

      if (staticClass) {
        return h('div', { staticClass }, footerNode)
      } else {
        const footerAction = h('div', { staticClass: Classes.DIALOG_FOOTER_ACTIONS }, [footerNode])
        return h('div', { staticClass: Classes.DIALOG_FOOTER }, [footerAction])
      }
    },

    handleContainerMouseDown(e) {
      const isClickOutsideDialog = e.target.closest(`.${Classes.DIALOG}`) == null
      if (isClickOutsideDialog && this.canOutsideClickClose) {
        safeInvoke(this.onClose, e)
      }
    }
  },

  render(h) {
    return this.genContainer([
      this.maybeRenderHeader(),
      this.renderBody(this.$slots.default),
      this.maybeRenderFooter()
    ])
  }
}
