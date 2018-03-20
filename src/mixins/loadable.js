import Spinner from "../components/spinner";
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    genLoader() {
      const data = {};
      this.$createElement(Spinner, data)
    }
  }
}