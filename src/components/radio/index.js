import VrRadio from './radio'
import VrRadioGroup from './radioGroup'

/* istanbul ignore next */
VrRadio.install = function install(Vue) {
  Vue.component(VrRadio.name, VrRadio)
  Vue.component(VrRadioGroup.name, VrRadioGroup)
}

export default VrRadio
