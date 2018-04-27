export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    activeClass() {
      return {
        'pt-active': this.active,
        'pt-disabled': this.loading || this.disabled
      }
    }
  }
}
