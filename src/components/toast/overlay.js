import Portal from '../portal'
import { Escable, Transitionable } from '../../mixins'
import { safeInvoke, classNames, safeChildren, extend } from '../../util/helper'
import * as Classes from '../../util/classes'

export const props = extend({
  /**
   * Whether can invoke onClose action by clicking the backdrop element
   */
  canOutsideClickClose: {
    type: Boolean,
    default: true
  },
  /**
   * Whether the overlay should acquire application focus when it first opens.
   */
  autoFocus: Boolean,
  /**
   * If `enforceFocus` set true, you can always invoke `onClose` action by Esc,
   * even there are nested overlay element
   */
  enforceFocus: Boolean,
  /**
   * Trigger flag of overlay
   */
  isOpen: Boolean,
  /**
   * If `lazy` set true, overlay will not render children when `isOpen` initialize with false
   */
  lazy: Boolean,
  /**
   * If `usePortal` set true, children with render inside a custom dom under body instead of root element of overlay
   */
  usePortal: {
    type: Boolean,
    default: true
  },
  /**
   * Whether render the backdrop mask
   */
  hasBackdrop: {
    type: Boolean,
    default: true
  },
  /**
   * Add custom class on spec DOM elment, see the example
   * <div class="pt-overlay">
   *    <div class="pt-overlay-backdrop"></div>
   *    <div class="pt-overlay-content `${contentClasses}`"></div>
   * </div>
   */
  contentClasses: String,
  /**
   * Add custom class on spec DOM elment, see the example
   * <div class="pt-overlay `${classNames}`">
   *    <div class="pt-overlay-backdrop"></div>
   *    <div class="pt-overlay-content"></div>
   * </div>
   */
  classes: String,
  /**
   * Transiton name enum:
   */
  transitionName: {
    type: String,
    default: Classes.OVERLAY
  },
  /**
   * A callback that is invoked when user interaction causes the overlay to close, such as
   * clicking on the overlay or pressing the `esc` key (if enabled).
   */
  onClose: Function,
  /**
   * A callback that is invoked when children is mounted to document
   */
  onChildrenMount: Function
})

export default {
  name: 'vr-overlay',

  props,

  mixins: [Escable, Transitionable],

  data() {
    return {
      hasPortalChildrenMounted: false,
      isPropIsOpenInitSet: false
    }
  },

  created() {
    this.isPropIsOpenInitSet = this.isOpen
  },

  watch: {
    isOpen(val) {
      if (val && !this.usePortal) {
        this.$nextTick(e => {
          safeInvoke(this.onChildrenMount, this.$refs.containerElement)
        })
      }

      if (val && this.usePortal && this.hasPortalChildrenMounted) {
        this.$nextTick(e => {
          safeInvoke(this.onChildrenMount, this.$refs.containerElement)
        })
      }
    }
  },

  mounted() {
    if (this.isOpen && !this.usePortal) {
      safeInvoke(this.onChildrenMount, this.$refs.containerElement)
    }

    if (this.isOpen && this.usePortal && this.hasPortalChildrenMounted) {
      safeInvoke(this.onChildrenMount, this.$refs.containerElement)
    }
  },

  render(h) {
    const { lazy, hasBackdrop, isOpen, usePortal } = this
    const { isPropIsOpenInitSet } = this
    const { onPortalChildrenMount: onChildrenMount } = this
    const shouldRenderNothing = lazy && !isPropIsOpenInitSet

    if (shouldRenderNothing && !isOpen) {
      return null
    }

    const enter = this.didOpen
    const leave = this.didClose
    const on = { enter, leave }
    let children = safeChildren(
      this.createTransition(this.genContentWithSlot(), isOpen, { duration: 300, on, isGroup: true })
    )

    const shouldRenderBackdrop = isOpen && hasBackdrop
    if (shouldRenderBackdrop) {
      children.unshift(this.createTransition(this.genBackdrop(), isOpen, { duration: 300 }))
    }

    const wrapper = this.genWrapper(children)

    if (usePortal) {
      return h(Portal, { props: { onChildrenMount } }, safeChildren(wrapper))
    } else {
      return wrapper
    }
  },

  methods: {
    genWrapper(children) {
      const { isOpen, usePortal } = this
      const containerClasses = classNames(
        Classes.OVERLAY,
        {
          [Classes.OVERLAY_OPEN]: isOpen,
          [Classes.OVERLAY_INLINE]: !usePortal
        },
        this.classes
      )

      let option = {}
      option.staticClass = containerClasses
      option.ref = 'containerElement'
      option.on = this.eventOfEscKeyDown()
      return this.$createElement('div', option, children)
    },

    genContentWithSlot() {
      const { OVERLAY_CONTENT } = Classes
      const { contentClasses } = this

      let defaultSlot = this.$slots.default || []
      return defaultSlot.map(this.addPointerEventToAll)
    },

    addPointerEventToAll(vnode) {
      vnode.data.style = {}
      vnode.data.attr = {}
      vnode.data.staticClass = 'OVERLAY_CONTENT'
      vnode.data.style['pointer-events'] = 'all'
      vnode.data.attr['tabindex'] = 0
      return vnode
    },

    didOpen() {
      if (this.canOutsideClickClose && !this.hasBackdrop) {
        document.addEventListener('mousedown', this.handleDocumentClick)
      }

      // if (this.hasBackdrop) {
      // add a class to the body to prevent scrolling of content below the overlay
      // document.body.classList.add(Classes.OVERLAY_OPEN)
      // }

      this.bringFocusInsideOverlay()
      this.$emit('open')
    },

    bringFocusInsideOverlay() {
      const { autoFocus } = this
      const containerElement = this.$refs.containerElement
      if (containerElement == null || document.activeElement == null || !this.isOpen) {
        return
      }

      const isFocusOutsideModal = !containerElement.contains(document.activeElement)
      if (isFocusOutsideModal) {
        // element marked autofocus has higher priority than the other clowns
        const autofocusElement = containerElement.querySelector('[autofocus]')
        const wrapperElement = containerElement.querySelector('[tabindex]')
        if (autofocusElement != null) {
          autofocusElement.focus()
        } else if (wrapperElement != null) {
          wrapperElement.focus()
        }
      }
    },

    handleDocumentClick(el) {
      const { isOpen, canOutsideClickClose, onClose } = this
      const eventTarget = el.target
      const isClickInThisOverlayOrDescendant = this.$refs.containerElement.contains(eventTarget)
      if (isOpen && canOutsideClickClose && !isClickInThisOverlayOrDescendant) {
        // casting to any because this is a native event
        setTimeout(() => {
          safeInvoke(onClose, el)
        }, 100)
      }
    },

    didClose() {
      document.removeEventListener('mousedown', this.handleDocumentClick)
      this.$emit('close')
    },

    handleBackdropMouseDown(e) {
      const { canOutsideClickClose, enforceFocus, onClose } = this
      if (canOutsideClickClose) {
        safeInvoke(onClose, e)
      }
      if (enforceFocus) {
        // make sure document.activeElement is updated before bringing the focus back
        this.bringFocusInsideOverlay()
      }
    },

    genBackdrop() {
      const { canOutsideClickClose } = this
      // window.addEventListener('mousedown', this.handleBackdropMouseDown)
      const tabindex = canOutsideClickClose ? 0 : null
      const option = {}
      option.attrs = { tabindex }
      option.staticClass = Classes.OVERLAY_BACKDROP
      option.on = { click: this.handleBackdropMouseDown }
      return this.$createElement('div', option)
    },

    onPortalChildrenMount() {
      this.hasPortalChildrenMounted = true
      if (this.lazy) {
        safeInvoke(this.onChildrenMount, this.$refs.containerElement)
      }
    }
  }
}
