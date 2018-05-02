import * as components from './components'
import * as directives from './directives'

function Vrint(Vue, args) {
  const Vrint = components.Vrint

  Vue.use(Vrint, {
    components,
    directives,
    ...args
  })
}

Vrint.version = process.env.VRINT_VERSION

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vrint)
}

export default Vrint
