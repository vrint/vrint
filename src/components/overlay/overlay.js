import Portal from '../portal'
import { Escable, Transitionable } from '../../mixins'
import { safeInvoke, classNames, safeChildren, extend } from '../../util/helper'
import * as Classes from '../../util/classes'

export const props = extend({
  /**
   * Whether the overlay should acquire application focus when it first opens.
   */
  autoFocus: Boolean,
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
   *    <div class="pt-overlay-content `${contentClassNames}`"></div>
   * </div>
   */
  contentClassNames: String,
  /**
   * Add custom class on spec DOM elment, see the example
   * <div class="pt-overlay `${classNames}`">
   *    <div class="pt-overlay-backdrop"></div>
   *    <div class="pt-overlay-content"></div>
   * </div>
   */
  classNames: String,
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

  render(h) {
    const { lazy, hasBackdrop, isOpen, canOutsideClickClose, usePortal } = this
    const { isPropIsOpenInitSet } = this
    const { onPortalChildrenMount: onChildrenMount } = this
    const shouldRenderNothing = lazy && !isPropIsOpenInitSet

    if (shouldRenderNothing) {
      return null
    }

    let children = safeChildren(
      this.createTransition(this.genContentWithSlot(), isOpen, { duration: 300, appear: true })
    )

    const shouldRenderBackdrop = isOpen && hasBackdrop
    if (shouldRenderBackdrop) {
      children.unshift(
        this.createTransition(this.genBackdrop(), isOpen, { duration: 300, appear: true })
      )
    }

    const wrapper = this.genWrapper(children)

    if (usePortal) {
      return h(Portal, { props: { onChildrenMount } }, safeChildren(wrapper))
    } else {
      return wrapper
    }
  },

  mixins: [Escable, Transitionable],

  data() {
    return {
      isPropIsOpenInitSet: false
    }
  },

  created() {
    this.isPropIsOpenInitSet = this.isOpen
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
        this.classNames
      )

      return this.$createElement('div', { staticClass: containerClasses }, children)
    },

    genContentWithSlot() {
      const defaultSlot = this.$slots.default
      const { OVERLAY_CONTENT } = Classes
      const { contentClassNames } = this

      const dataOption = {}
      dataOption.staticClass = classNames(contentClassNames, OVERLAY_CONTENT)
      dataOption.attrs = { tabindex: 0 }
      let content = this.$createElement('div', dataOption, defaultSlot)
      return this.$createElement(
        'transition',
        {
          props: {
            name: this.transitionName,
            duration: 300,
            ...this.genTransitionClasses()
          }
        },
        [this.isOpen ? content : null]
      )
    },

    handleBackdropMouseDown() {},

    genBackdrop() {
      const { canOutsideClickClose } = this
      // window.addEventListener('mousedown', this.handleBackdropMouseDown)
      const tabindex = canOutsideClickClose ? 0 : null
      const dataOption = {}
      dataOption.attrs = { tabindex }
      dataOption.staticClass = Classes.OVERLAY_BACKDROP
      return this.$createElement('div', dataOption)
    },

    onPortalChildrenMount() {}
  }
}
