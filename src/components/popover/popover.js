import Popper from 'popper'
import Portal from '../portal'
import VrOverlay from '../overlay'
import PopoverArrow from './arrow'
import { classNames } from '../../util/helper'
import * as Classes from '../../util/classes'
import { arrowOffsetModifier, getTransformOrigin } from './popperUtils'

/*
* <div>
*   <PopoverReference/>
*   <Portal>
*     <Overlay>
*       <PopoverContent/>
*     </Overlay>
*   </Portal>
* </div>
*/
export default {
  name: 'vr-popover',

  data: () => ({
    innerState_isOpen: false,
    popoverContainerElement: undefined,
    popoverInstance: undefined
  }),

  props: {
    placement: {
      type: String,
      default: 'top'
    },
    value: Boolean
  },

  methods: {
    genPopoverWrapper(children) {
      return this.$createElement('div', { staticClass: Classes.POPOVER_WRAPPER }, children)
    },

    genPopoverTarget(children) {
      return this.$createElement(
        'div',
        {
          staticClass: Classes.POPOVER_TARGET,
          ref: 'reference',
          on: {
            click: this.handleTargeClick,
            hover: this.handleTargeHover
          }
        },
        children
      )
    },

    onChildrenMount(el) {
      const reference = this.$refs.reference
      const popperContent = el.querySelector(`.${Classes.OVERLAY_CONTENT}`)
      const arrowElement = popperContent.querySelector(`.${Classes.POPOVER_ARROW}`)
      this.popoverInstance = new Popper(reference, popperContent, {
        placement: this.placement,
        modifiers: {
          arrow: {
            enabled: true,
            element: arrowElement
          },
          arrowOffset: {
            enabled: true,
            fn: arrowOffsetModifier,
            order: 510
          }
        }
      })
      window.Popper = Popper
    },

    genPopoverContent() {
      const { onChildrenMount: onPortalChildrenMount, innerState_isOpen: isOpen } = this
      const content = this.$createElement(
        'div',
        { staticClass: Classes.POPOVER_CONTENT },
        this.$slots.content
      )
      //pt-popover docs-popover-example pt-popover-content-sizing
      const wrapper = this.$createElement(
        'div',
        {
          staticClass: classNames(Classes.POPOVER, 'pt-popover-content-sizing')
        },
        [this.genTagetArrow(), content]
      )
      return this.$createElement(
        VrOverlay,
        {
          props: {
            className: Classes.TRANSITION_CONTAINER,
            usePortal: true,
            hasBackdrop: false,
            transition: Classes.POPOVER,
            onPortalChildrenMount,
            isOpen
          }
        },
        [wrapper]
      )
    },

    genTagetArrow() {
      const { placement } = this
      return this.$createElement(PopoverArrow, { props: { placement } })
    },

    handleTargeClick() {
      this.innerState_isOpen = !this.innerState_isOpen
    },

    handleTargeHover() {}
  },

  render(h) {
    return this.genPopoverWrapper([
      this.innerState_isOpen ? this.genPopoverContent() : null,
      this.genPopoverTarget(this.$slots.reference)
    ])
  }
}
