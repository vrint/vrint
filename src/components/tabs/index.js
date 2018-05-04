import VrTab from './tab'
import VrTabs from './tabs'

/* istanbul ignore next */
VrTabs.install = function install (Vue) {
  Vue.component(VrTabs.name, VrTabs)
  Vue.component(VrTab.name, VrTab)
}

export default VrTabs
