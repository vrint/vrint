export default {
  props: {
    iconName: {}
  },

  computed: {
    iconClass() {
      const prefix = 'pt-icon-';
      return this.iconName ? prefix + this.iconName : undefined;
    }
  }
};
