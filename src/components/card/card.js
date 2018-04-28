import { Interactable } from '../../mixins'
import { createFunctionalComponent, classNames } from '../../util/helper'
import * as Classes from '../../util/classes'

export const Elevation = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4
}

export default createFunctionalComponent({
  name: 'vr-card',

  mixins: [Interactable],

  render(h, context, classesSetOnTemplate, style) {
    const { children, props, data } = context
    const { interactive, elevation } = props
    const isValidEva = (elevation <= 4) & (elevation >= 0)
    const staticClass = classNames(
      {
        [Classes.CARD]: true,
        [Classes.INTERACTIVE]: interactive,
        [Classes[`ELEVATION_${elevation}`]]: isValidEva
      },
      classesSetOnTemplate
    )
    return h('div', { staticClass, style }, children)
  }
})
