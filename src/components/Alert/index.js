export default {
  data() {
    return {};
  },
  computed: {
    classNames() {
      let classEnum = {};
      STATE.forEach(state => (classEnum[state] = BUTTON_PREFIX + state));

      classNames['danger'] = true;
      classNames['success']
      return classNames;
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
    enabled: {}
  },
  render() {
    return (
      <Dialog>

      </Dialog>
    );
  }
};
