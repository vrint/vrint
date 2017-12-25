export default {
  data() {
    return {};
  },
  computed: {
    classNames() {
      return ['a', 'b', 'c'];
    }
  },
  props: {
    size: {
      type: String,
      validator: value => true
    },
    type: {
      type: String,
      validator: value => true
    },
    enabled: {

    }
  },
  render() {
    return (
      <button type="button" class="pt-button">
        Default button
      </button>
    );
  }
};
