import VrPopover from './popover'

/* istanbul ignore next */
VrPopover.install = function install (Vue) {
  Vue.component(VrPopover.name, VrPopover)
}

export default VrPopover
