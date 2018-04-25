import Popper from 'popper'
import Portal from '../portal'
import VrOverlay from '../overlay'
import PopoverArrow from './arrow'
import { classNames, safeInvoke, safeChildren } from '../../util/helper'
import * as Classes from '../../util/classes'
import { arrowOffsetModifier, getTransformOrigin } from './popperUtils'

export const props = {
  placement: {
    type: String,
    default: 'top'
  },
  isOpen: Boolean
}
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

  props,

  model: {
    prop: 'isOpen',
    event: 'change'
  },

  data() {
    return {
      popoverContainerElement: undefined,
      popoverInstance: undefined
    }
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
    },

    genPopoverContent() {
      const { onChildrenMount, value } = this
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
            contentClasses: Classes.TRANSITION_CONTAINER,
            usePortal: true,
            hasBackdrop: false,
            transition: Classes.POPOVER,
            onChildrenMount,
            isOpen: value
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
      this.isOpen ? this.genPopoverContent() : null,
      this.genPopoverTarget(this.$slots.reference)
    ])
  }
}
