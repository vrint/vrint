export default {
  props: {
    iconName: {}
  },

  computed: {
    iconClass() {
      const prefix = 'pt-icon-';
      const name = this.iconName ? prefix + this.iconName : '';
      return name && { [name]: true }
    }
  }
};
