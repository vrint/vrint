import VrTag from './tag'

/* istanbul ignore next */
VrTag.install = function install(Vue) {
  Vue.component(VrTag.name, VrTag)
}

export default VrTag
