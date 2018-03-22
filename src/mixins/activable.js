export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    activeClass() {
      return {
        'pt-disabled': this.loading || this.disabled
      }
    }
  }
}
