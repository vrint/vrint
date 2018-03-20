import VrApp from './app'

/* istanbul ignore next */
VrApp.install = function install (Vue) {
  Vue.component(VrApp.name, VrApp)
}

export default VrApp
