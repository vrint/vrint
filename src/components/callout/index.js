import VrCallout from './callout'

/* istanbul ignore next */
VrCallout.install = function install (Vue) {
  Vue.component(VrCallout.name, VrCallout)
}

export default VrCallout
