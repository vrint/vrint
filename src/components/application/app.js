// Directives
import Resize from '../../directives/resize'

export default {
  name: 'vr-application',

  directives: { Resize },

  data() {
    return {
      theme: 'dark',
    }
  },

  props: {
    id: {
      type: String,
      default: 'app'
    },
    accessable: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onResize() {
    }
  },

  render(h) {
    const data = {
      attrs: { 'data-app': true },
      domProps: { id: this.id },
      staticClass: 'application--wrap',
      directive: [{
        name: 'resize',
        value: this.onResize
      }]
    }

    return h('main', data, this.$slots.default)
  }
}
