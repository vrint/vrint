import Portal from '../portal/portal'
import { Escable } from '../../mixins'
import { safeInvoke, classNames } from '../../util/helper'
import * as Classes from '../../util/classes'

export default {
  name: 'vr-overlay',

  mixins: [Escable],

  data() {
    return {
      innerStateIsOpen: false
    }
  },

  props: {
    isOpen: Boolean,
    onClose: {
      type: Function,
      default: () => {}
    },
    hasBackdrop: {
      type: Boolean,
      default: true
    },
    usePortal: Boolean,
    autoFocus: {
      type: Boolean,
      default: true
    },
    transitionName: {
      type: String,
      default: 'pt-overlay'
    },
    transitionDuration: {
      type: Number,
      default: 100
    }
  },

  watch: {
    innerStateIsOpen(val) {
      if (val !== this.isOpen) {
        this.$emit('update:isOpen', val)
      }
    },
    isOpen(val) {
      this.innerStateIsOpen = val
    }
  },

  mounted() {
    this.innerStateIsOpen = this.isOpen
    this.innerStateIsOpen && this.overlayWillOpen()
  },

  destroy() {
    this.overlayWillClose()
  },

  computed: {
    containerElement() {
      const container = this.$refs.container
      return container && container.elm
    },
    lastOpen() {
      const { overlayOpenStack = [] } = this.$root
      const len = overlayOpenStack.length
      return overlayOpenStack[len - 1]
    }
  },

  methods: {
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
      } else if (this.hasBackdrop) {
        // add a class to the body to prevent scrolling of content below the overlay
        document.body.classList.add(Classes.OVERLAY_OPEN)
      }
    },

    overlayWillClose() {
      document.removeEventListener('focus', this.handleDocumentFocus, true)
      document.removeEventListener('mousedown', this.handleDocumentClick)

      const { overlayOpenStack } = this.$root
      const stackIndex = overlayOpenStack.indexOf(this)
      if (stackIndex !== -1) {
        overlayOpenStack.splice(stackIndex, 1)
        if (overlayOpenStack.length > 0) {
          const lastOpenedOverlay = this.lastOpen
          if (lastOpenedOverlay.enforceFocus) {
            document.addEventListener('focus', lastOpenedOverlay.handleDocumentFocus, true)
          }
        }

        if (overlayOpenStack.filter(o => o.usePortal && o.hasBackdrop).length === 0) {
          document.body.classList.remove(Classes.OVERLAY_OPEN)
        }
      }
    },

    handleBackdropMouseDown(e) {
      const { backdropProps, canOutsideClickClose, enforceFocus, onClose } = this
      if (canOutsideClickClose) {
        safeInvoke(onClose, e)
      }
      if (enforceFocus) {
        // make sure document.activeElement is updated before bringing the focus back
        this.bringFocusInsideOverlay()
      }
      safeInvoke(backdropProps.onMouseDown, e)
    },

    maybeRenderBackdrop() {
      const {
        backdropClassName,
        backdropProps,
        hasBackdrop,
        innerStateIsOpen,
        transitionDuration,
        transitionName: name
      } = this

      const h = this.$createElement
      if (hasBackdrop && innerStateIsOpen) {
        const data = {
          props: {
            'leave-class': 'exit',
            'leave-active-class': 'exit-active'
          },
          name
        }
        return h('transition', data, [h('div', { staticClass: Classes.OVERLAY_BACKDROP })])
      } else {
        return null
      }
    },

    handleDocumentClick(e) {
      const { canOutsideClickClose, innerStateIsOpen, onClose } = this
      const eventTarget = e.target

      const { overlayOpenStack } = this.$root
      const stackIndex = overlayOpenStack.indexOf(this)

      const isClickInThisOverlayOrDescendant = overlayOpenStack
        .slice(stackIndex)
        .some(({ containerElement }) => containerElement && containerElement.contains(eventTarget))

      if (innerStateIsOpen && canOutsideClickClose && !isClickInThisOverlayOrDescendant) {
        // casting to any because this is a native event
        this.onClose(e)
      }
    },

    handleDocumentFocus(e) {
      if (
        this.props.enforceFocus &&
        this.containerElement != null &&
        !this.containerElement.contains(e.target)
      ) {
        // prevent default focus behavior (sometimes auto-scrolls the page)
        e.preventDefault()
        e.stopImmediatePropagation()
        this.bringFocusInsideOverlay()
      }
    },

    bringFocusInsideOverlay() {
      return window.requestAnimationFrame(() => {
        // container ref may be undefined between component mounting and Portal rendering
        // activeElement may be undefined in some rare cases in IE
        if (
          this.containerElement == null ||
          document.activeElement == null ||
          !this.innerStateIsOpen
        ) {
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

    maybeRenderChild(child) {
      const h = this.$createElement
      if (child === null) {
        return null
      }

      const isChildTextNode = Boolean(!child.tag)
      const tagName = isChildTextNode ? 'span' : 'div'
      const on = Object.assign({}, this.eventOfEscKeyDown())
      const decoratedChild = h(
        tagName,
        { attrs: { tabIndex: 0 }, staticClass: Classes.OVERLAY_CONTENT, on },
        [child]
      )

      return decoratedChild
    }
  },

  render(h) {
    const { className, usePortal, innerStateIsOpen, transitionName } = this
    const staticClass = classNames(Classes.OVERLAY, {
      [Classes.OVERLAY_OPEN]: innerStateIsOpen,
      [Classes.OVERLAY_INLINE]: !usePortal
    })
    const data = {
      class: staticClass,
      props: { tag: 'div' },
      name: transitionName,
      ref: 'container'
    }
    const children = this.$slots.default.map(this.maybeRenderChild)
    const childrenWithTransitions = innerStateIsOpen ? children : []
    childrenWithTransitions.unshift(this.maybeRenderBackdrop())
    childrenWithTransitions.forEach((child, index) => {
      if (!child) return
      child.key = index
    })

    const transitionTag = innerStateIsOpen ? 'transition-group' : 'transition'
    const transitionGroup = h(transitionTag, data, innerStateIsOpen ? childrenWithTransitions : [])
    if (usePortal) {
      return h(Portal, transitionGroup)
    } else {
      return transitionGroup
    }
  }
}
