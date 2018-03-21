import sizeable from '../../mixins/sizeable';

export default {
  mixins: [sizeable],

  computed: {
    classes() {
      return Object.assign({
        'pt-button-group': true
      }, this.sizeClass)
    }
  },

  render(h) {
    let data = {
      class: this.classes
    }
    return h('div', data, [this.$slots.default])
  }
}
