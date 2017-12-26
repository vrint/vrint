import { Intentable, Activable } from '@/mixins';

export default {
  data() {
    return {};
  },
  mixins: [Intentable, Activable],
  props: {
    size: {
      type: String,
      validator: value => true
    }
  },
  computed: {
    classNames() {
      return ['pt-button'].concat([this.intentClass]).join(' ');
    }
  },
  render() {
    return (
      <button class={this.classNames}>
        Default button
      </button>
    );
  }
};
