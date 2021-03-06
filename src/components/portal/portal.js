import * as Classes from '../../util/classes'
import { safeInvoke } from '../../util/helper'

export default {
  name: 'vr-portal',

  props: {
    onChildrenMount: {
      type: Function,
      default: () => {}
    }
  },

  destroyed() {
    const { portalElement } = this.$refs
    portalElement && portalElement.remove()
  },

  mounted() {
    const { portalElement } = this.$refs
    const parent = this.$root.$el
    parent.append(portalElement)

    this.$forceUpdate()
    this.$nextTick(e => safeInvoke(this.onChildrenMount, portalElement))
  },

  render(h) {
    const { hasMounted } = this
    const { portalElement } = this.$refs
    const data = {
      staticClass: Classes.PORTAL,
      attrs: {
        role: 'portal'
      },
      style: {
        display: portalElement ? undefined : 'none'
      },
      ref: 'portalElement'
    }
    if (typeof document === 'undefined') {
      return null
    } else {
      return h('div', data, this.$slots.default)
    }
  }
}
