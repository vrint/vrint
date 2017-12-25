const Vrint = {
  install (Vue, opts = {}) {
    if (this.installed) return

    this.installed = true

    const $vrint = {}
    Vue.util.defineReactive($vrint, 'inspire', {
      breakpoint: {},
      dark: false
    })

    Vue.prototype.$vrint = $vrint.inspire

    if (opts.transitions) {
      Object.values(opts.transitions).forEach(transition => {
        if (transition.name !== undefined && transition.name.startsWith('v-')) {
          Vue.component(transition.name, transition)
        }
      })
    }

    if (opts.directives) {
      Object.values(opts.directives).forEach(directive => {
        Vue.directive(directive.name, directive)
      })
    }

    if (opts.components) {
      Object.values(opts.components).forEach(component => {
        Vue.use(component)
      })
    }
  }
}

export default Vrint
