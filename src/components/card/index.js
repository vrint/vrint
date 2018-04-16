import VrCard from './card'

/* istanbul ignore next */
VrCard.install = function install(Vue) {
  Vue.component(VrCard.name, VrCard)
}

export default VrCard
