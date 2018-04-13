import { safeInvoke } from '../util/helper'

export default {
  props: {
    canOutsideClickCancel: Boolean
  },

  methods: {
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
    }
  }
}
