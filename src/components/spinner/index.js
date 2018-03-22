import VrSpinner from './spinner'

/* istanbul ignore next */
VrSpinner.install = function install (Vue) {
  Vue.component(VrSpinner.name, VrSpinner)
}

export default VrSpinner
