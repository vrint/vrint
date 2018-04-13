import { Interactable } from '../../mixins'
import { createFunctionalComponent, classNames } from '../../util/helper'
import * as Classes from '../../util/classes'

export default createFunctionalComponent({
  name: 'vr-card',

  mixins: [Interactable],

  render(h, context, classesSetOnTemplate, style) {
    const { children, props, data } = context
    const { interactive, elevation } = props
    const staticClass = classNames(
      {
        'pt-card': true,
        [Classes.INTERACTIVE]: interactive,
        [Classes[`ELEVATION_${elevation}`]]: !isNaN(Number(elevation))
      },
      classesSetOnTemplate
    )
    return h('div', { staticClass, style }, children)
  }
})
