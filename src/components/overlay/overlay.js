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
  onClose: Function
})

export default {
  name: 'vr-overlay',

  props,

  mixins: [Escable, Transitionable],

  data() {
    return {
      isPropIsOpenInitSet: false
    }
  },

  created() {
    this.isPropIsOpenInitSet = this.isOpen
  },

  computed: {
    containerElement() {
      return this.$refs.containerElement
    }
  },

  render(h) {
    const { lazy, hasBackdrop, isOpen, usePortal } = this
    const { isPropIsOpenInitSet } = this
    const { onPortalChildrenMount: onChildrenMount } = this
    const shouldRenderNothing = lazy && !isPropIsOpenInitSet

    if (shouldRenderNothing) {
      return null
    }

    const enter = this.didOpen
    const leave = this.didClose
    const on = { enter, leave }
    let children = safeChildren(
      this.createTransition(this.genContentWithSlot(), isOpen, { duration: 300, on })
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

      let options = {}
      options.staticClass = containerClasses
      options.ref = 'containerElement'
      options.on = this.eventOfEscKeyDown()
      return this.$createElement('div', options, children)
    },

    genContentWithSlot() {
      const defaultSlot = this.$slots.default.map(this.addPointerEventToAll)
      const { OVERLAY_CONTENT } = Classes
      const { contentClasses } = this

      const option = {}
      option.staticClass = classNames(contentClasses, OVERLAY_CONTENT)
      option.attrs = { tabindex: 0 }
      option.style = { 'pointer-events': 'none' }
      return this.$createElement('div', option, defaultSlot)
    },

    addPointerEventToAll(vnode) {
      vnode.data.style = {}
      vnode.data.style['pointer-events'] = 'all'
      return vnode
    },

    didOpen() {
      this.bringFocusInsideOverlay()
      this.$emit('open')
    },

    bringFocusInsideOverlay() {
      const { autoFocus } = this
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
    },

    didClose() {},

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

    onPortalChildrenMount() {}
  }
}
