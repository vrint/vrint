import VrAlert from './alert'

/* istanbul ignore next */
VrAlert.install = function install (Vue) {
  Vue.component(VrAlert.name, VrAlert)
}

export default VrAlert
