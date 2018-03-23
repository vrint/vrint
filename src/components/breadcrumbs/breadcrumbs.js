import * as Classes from '../../util/classes'

export default {
  name: 'vr-breadcrumbs',

  functional: true,

  render(h, context) {
    let data = {
      staticClass: Classes.BREADCRUMBS
    }
    return h('ul', data, context.children)
  }
}
