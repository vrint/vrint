import * as Classes from '../../util/classes'
import { createFunctionalComponent } from '../../util/helper'

const SVG_SHADOW_PATH =
  'M8.11 6.302c1.015-.936 1.887-2.922 1.887-4.297v26c0-1.378' +
  '-.868-3.357-1.888-4.297L.925 17.09c-1.237-1.14-1.233-3.034 0-4.17L8.11 6.302z'
const SVG_ARROW_PATH =
  'M8.787 7.036c1.22-1.125 2.21-3.376 2.21-5.03V0v30-2.005' +
  'c0-1.654-.983-3.9-2.21-5.03l-7.183-6.616c-.81-.746-.802-1.96 0-2.7l7.183-6.614z'

export function getArrowAngle(placement) {
  // can only be top/left/bottom/right - auto is resolved internally
  const position = placement.split('-')[0]
  switch (position) {
    case 'top':
      return -90
    case 'left':
      return 180
    case 'bottom':
      return 90
    default:
      return 0
  }
}

export default createFunctionalComponent({
  props: {
    placement: {
      type: String,
      validator: () => true
    }
  },

  render(h, context) {
    const angle = getArrowAngle(context.props.placement)
    const arrowBorderPath = h('path', {
      staticClass: Classes.POPOVER_ARROW + '-border',
      attrs: { d: SVG_SHADOW_PATH }
    })
    const arrowFillPath = h('path', {
      staticClass: Classes.POPOVER_ARROW + '-fill',
      attrs: { d: SVG_ARROW_PATH }
    })
    const arrowSvg = h(
      'svg',
      {
        attrs: {
          viewBox: '0 0 30 30'
        },
        style: { transform: `rotate(${angle}deg)` }
      },
      [arrowBorderPath, arrowFillPath]
    )

    return h('span', { staticClass: Classes.POPOVER_ARROW }, [arrowSvg])
  }
})
