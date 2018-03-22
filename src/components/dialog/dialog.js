import VrOverlay from '../overlay/overlay'
import * as Classes from '../../util/classes'

export default {
  name: 'vr-dialog',

  props: {
    title: String
  },

  render(h) {
    let headerData = {
      staticClass: Classes.DIALOG_HEADER
    }
    let header = h('div', headerData, [
      this.$createElement('h4', { staticClass: Classes.DIALOG_HEADER_TITLE }, [
        this.title
      ])
    ])

    let bodyData = {
      staticClass: Classes.DIALOG
    }
    let body = h('div', bodyData, [header, this.$slots.default])
    let containerData = {
      staticClass: Classes.DIALOG_CONTAINER,
      key: Math.random()
    }
    let container = h('div', containerData, [body])
    let overlayData = {
      staticClass: Classes.OVERLAY_SCROLL_CONTAINER,
      props: {
        isOpen: true,
        hasBackdrop: true,
        children: [container]
      }
    }
    return h(VrOverlay, overlayData)
  }
}
