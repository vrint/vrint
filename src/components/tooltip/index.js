import VrTooltip from './tooltip'

/* istanbul ignore next */
VrTooltip.install = function install (Vue) {
  Vue.component(VrTooltip.name, VrTooltip)
}

export default VrTooltip
