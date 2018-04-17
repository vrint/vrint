import VrTextarea from './textarea'

/* istanbul ignore next */
VrTextarea.install = function install (Vue) {
  Vue.component(VrTextarea.name, VrTextarea)
}

export default VrTextarea
