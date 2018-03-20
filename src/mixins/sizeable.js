export default {
  props: {
    size: {
      type: String
    }
  },
  computed: {
    sizeClass() {
      const typeEnum = Object.freeze({
        small: 'pt-small',
        large: 'pt-large',
        fill: 'pt-fill'
      });
      return { [typeEnum[this.size]]: true };
    }
  }
};
