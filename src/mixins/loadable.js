import Spinner from '../components/spinner'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    loaderClass() {
      return {
        'pt-loading': this.loading
      }
    }
  },

  methods: {
    genLoader(props) {
      let data = { props }
      return this.$createElement(Spinner, data)
    }
  }
}
