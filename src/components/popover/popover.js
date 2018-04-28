import Popper from 'popper'
import VrOverlay from '../overlay'
import PopoverArrow, { getArrowAngle } from './arrow'
import { classNames, safeInvoke, safeChildren } from '../../util/helper'
import * as Classes from '../../util/classes'
import { arrowOffsetModifier, getTransformOrigin } from './popperUtils'

export const props = {
  disabled: Boolean,
  lazy: Boolean,
  placement: {
    type: String,
    default: 'top'
  },
  popoverClasses: {
    type: String,
    default: 'pt-popover-content-sizing'
  },
  isOpen: Boolean,
  modifiers: {
    type: Object,
    default: () => ({})
  },
  isArrowEnabled: {
    type: Boolean,
    default: true
  },
  usePortal: Boolean
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
      arrowRotation: 0,
      transformOrigin: '',
      popoverInstance: undefined
    }
  },

  created() {
    if (this.isOpen && this.disabled) {
      this.$emit('change', false)
    }
  },

  watch: {
    isOpen(val) {
      if (val && this.disabled) {
        this.$emit('change', false)
      }
    }
  },

  methods: {
    genPopoverWrapper(children) {
      let option = {}
      option.staticClass = Classes.POPOVER_WRAPPER
      option.ref = 'popoverContainerElement'
      return this.$createElement('div', option, children)
    },

    genOverlay(children) {
      let overlayOption = {}
      overlayOption.props = {
        contentClasses: Classes.TRANSITION_CONTAINER,
        usePortal: this.usePortal,
        hasBackdrop: false,
        onChildrenMount: this.onChildrenMount,
        transitionName: Classes.POPOVER,
        isOpen: this.isOpen,
        lazy: this.lazy,
        onClose: this.onClose
      }

      let option = {}
      option.staticClass = classNames(
        Classes.POPOVER,
        this.popoverClasses
      )
      // console.log(this.transformOrigin)
      // option.style = this.transformOrigin
      const content = this.$createElement('div', option, [
        this.isArrowEnabled ? this.genTagetArrow() : null,
        this.genPopoverContent()
      ])

      return this.$createElement(VrOverlay, overlayOption, safeChildren(content))
    },

    genPopoverTarget(children) {
      let option = {}
      option.staticClass = classNames(Classes.POPOVER_TARGET, {
        [Classes.POPOVER_OPEN]: this.isOpen
      })
      option.ref = 'reference'
      option.on = {
        mouseenter: this.handleMouseEnter,
        mouseleave: this.handleMouseLeave,
        click: this.handleClick
      }

      children.forEach(vnode => {
        if (!vnode.componentInstance) return
        vnode.data.staticClass = this.isOpen ? Classes.ACTIVE : null
        vnode.data.attrs = vnode.data.attrs || {}
        vnode.data.attrs['aria-popover'] = String(!this.disabled)
        vnode.componentOptions.propsData.disabled = this.disabled
      })

      return this.$createElement('div', option, children)
    },

    genPopoverContent() {
      let option = {}
      option.staticClass = Classes.POPOVER_CONTENT
      return this.$createElement('div', option, this.$slots.content)
    },

    genTagetArrow() {
      const angle = getArrowAngle(this.placement)
      return this.$createElement(PopoverArrow, { props: { angle } })
    },

    onChildrenMount(el) {
      const reference = this.$refs.reference
      const popperContent = el.querySelector(`.${Classes.OVERLAY_CONTENT}`)
      const arrowElement = popperContent.querySelector(`.${Classes.POPOVER_ARROW}`)
      this.popoverInstance = new Popper(reference, popperContent, {
        placement: this.placement,
        modifiers: {
          arrow: {
            enabled: this.isArrowEnabled,
            element: arrowElement
          },
          arrowOffset: {
            enabled: true,
            fn: arrowOffsetModifier,
            order: 510
          },
          // updatePopoverState: {
          //   enabled: true,
          //   fn: this.updatePopoverState,
          //   order: 900
          // },
          ...this.modifiers
        }
      })
    },

    handleMouseEnter() {},
    handleMouseLeave() {},
    updatePopoverState(data) {
      this.arrowRotation = getArrowAngle(data.placement)
      this.transformOrigin = getTransformOrigin(data)
      return data
    },
    handleClick(el) {
      const element = el.target
      const containerElement = this.$refs.popoverContainerElement
      const isElementInPopover = containerElement != null && containerElement.contains(element)
      if (this.isOpen && !this.usePortal && isElementInPopover) {
        return
      }
      this.$emit('change', !this.isOpen)
    },
    onClose() {
      this.$emit('change', false)
    }
  },

  render(h) {
    return this.genPopoverWrapper([this.genPopoverTarget(this.$slots.reference), this.genOverlay()])
  }
}
