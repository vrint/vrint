import VrToast from './toast'
import VrToaster from './toaster'

/* istanbul ignore next */
VrToaster.install = function install(Vue) {
  Vue.component(VrToast.name, VrToast)
  Vue.component(VrToaster.name, VrToaster)
}

export { VrToast }
export default VrToaster
