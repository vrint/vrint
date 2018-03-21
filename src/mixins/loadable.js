import Spinner from '../components/spinner';
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
        'pt-loading': true
      };
    }
  },

  methods: {
    genLoader(props) {
      let data = { props };
      return this.$createElement(Spinner, data);
    }
  }
};
