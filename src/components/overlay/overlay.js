import Portal from '../portal/portal'
import { Escable, Transitionable } from '../../mixins'
import { safeInvoke, classNames } from '../../util/helper'
import * as Classes from '../../util/classes'

export default {
  name: 'vr-overlay',

  mixins: [Escable, Transitionable],

  computed: {
    containerElement() {
      return this.$refs.container
    },
    lastOpen() {
      const { overlayOpenStack = [] } = this.$root
      const len = overlayOpenStack.length
      return overlayOpenStack[len - 1]
    }
  },

  watch: {
    isOpen(val) {
      val && this.overlayWillOpen()
    }
  },

  mounted() {
    this.isOpen && this.overlayWillOpen()
  },

  props: {
    canOutsideClickClose: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String,
      default: Classes.OVERLAY
    },
    autoFocus: {
      type: Boolean,
      default: true
    },
    className: String,
    enforceFocus: Boolean,
    isOpen: Boolean,
    onClose: Function,
    hasBackdrop: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    genContainer(children) {
      const h = this.$createElement
      const { isOpen } = this
      const data = {
        class: classNames(Classes.OVERLAY, {
          [Classes.OVERLAY_OPEN]: isOpen
        }),
        on: this.eventOfEscKeyDown(),
        ref: 'container'
      }
      return h('div', data, children)
    },

    maybeRenderChild(child) {
      const h = this.$createElement

      if (child === null) {
        return null
      }
      const isChildTextNode = Boolean(!child.tag)
      const tagName = isChildTextNode ? 'span' : 'div'
      const decoratedChild = h(
        tagName,
        { attrs: { tabIndex: 0 }, class: classNames(this.className, Classes.OVERLAY_CONTENT) },
        [child]
      )

      return h(
        'transition',
        {
          props: {
            name: this.transition,
            duration: 300,
            appear: true,
            ...this.genTransitionClasses()
          }
        },
        [this.isOpen ? decoratedChild : null]
      )
    },

    genBackdrop() {
      const h = this.$createElement
      const { hasBackdrop, isOpen, canOutsideClickClose } = this
      if (hasBackdrop && isOpen) {
        const data = {
          props: {
            name: Classes.OVERLAY,
            duration: 300,
            ...this.genTransitionClasses()
          }
        }
        window.addEventListener('mousedown', this.handleBackdropMouseDown)
        return h('transition', data, [
          h('div', {
            attrs: {
              tabindex: canOutsideClickClose ? 0 : null
            },
            staticClass: Classes.OVERLAY_BACKDROP
          })
        ])
      } else {
        return null
      }
    },

    handleBackdropMouseDown(e) {
      console.log(e)
      const { canOutsideClickClose, enforceFocus, onClose } = this
      if (canOutsideClickClose) {
        safeInvoke(this.onClose, e)
      }
      if (enforceFocus) {
        this.bringFocusInsideOverlay()
      }
    },

    bringFocusInsideOverlay() {
      this.$nextTick(e => {
        const { isOpen } = this
        if (this.containerElement == null || document.activeElement == null || !this.isOpen) {
          return
        }

        const isFocusOutsideModal = !this.containerElement.contains(document.activeElement)
        if (isFocusOutsideModal) {
          // element marked autofocus has higher priority than the other clowns
          const autofocusElement = this.containerElement.querySelector('[autofocus]')
          const wrapperElement = this.containerElement.querySelector('[tabindex]')
          if (autofocusElement != null) {
            autofocusElement.focus()
          } else if (wrapperElement != null) {
            wrapperElement.focus()
          }
        }
      })
    },

    handleDocumentFocus(e) {
      if (
        this.enforceFocus &&
        this.containerElement != null &&
        !this.containerElement.contains(e.target)
      ) {
        // prevent default focus behavior (sometimes auto-scrolls the page)
        e.preventDefault()
        e.stopImmediatePropagation()
        this.bringFocusInsideOverlay()
      }
    },

    handleDocumentClick(e) {
      const { canOutsideClickClose, isOpen, onClose } = this
      const eventTarget = e.target

      const { overlayOpenStack = [] } = this.$root
      const stackIndex = overlayOpenStack.indexOf(this)

      const isClickInThisOverlayOrDescendant = overlayOpenStack
        .slice(stackIndex)
        .some(({ containerElement }) => containerElement && containerElement.contains(eventTarget))

      if (isOpen && canOutsideClickClose && !isClickInThisOverlayOrDescendant) {
        // casting to any because this is a native event
        safeInvoke(onClose, e)
      }
    },

    overlayWillOpen() {
      const { overlayOpenStack = [] } = this.$root
      if (overlayOpenStack.length > 0) {
        document.removeEventListener('focus', this.lastOpen.handleDocumentFocus, true)
      }

      overlayOpenStack.push(this)

      const { autoFocus, enforceFocus, usePortal, hasBackdrop, canOutsideClickClose } = this
      if (autoFocus) {
        this.bringFocusInsideOverlay()
      }
      if (enforceFocus) {
        document.addEventListener('focus', this.handleDocumentFocus, true)
      }

      if (canOutsideClickClose && !hasBackdrop) {
        document.addEventListener('mousedown', this.handleDocumentClick)
      }

      if (!usePortal) {
        safeInvoke(this.didOpen)
      } else if (hasBackdrop) {
        // add a class to the body to prevent scrolling of content below the overlay
        document.body.classList.add(Classes.OVERLAY_OPEN)
      }
    }
  },

  render(h) {
    const { usePortal, isOpen } = this
    const content = isOpen
      ? [this.genBackdrop(), this.$slots.default.map(this.maybeRenderChild)]
      : []
    const container = this.genContainer(content)
    const data = {
      props: {
        appear: true,
        name: this.transition,
        duration: 300,
        ...this.genTransitionClasses()
      }
    }
    if (usePortal) {
      return h(Portal, data, [container])
    } else {
      return h('transition', data, [container])
    }
  }
}
