import {
  Intentable,
  Activable,
  Sizeable,
  Iconable,
  Loadable,
  Contentable
} from '../../mixins';

export default {
  name: 'vr-button',

  mixins: [Intentable, Activable, Sizeable, Iconable, Loadable, Contentable],

  props: {},

  computed: {
    classes() {
      return Object.assign({
        'pt-button': true
      }, this.iconClass);
    }
  },

  methods: {},

  render(h) {
    const data = {
      class: this.classes
    };

    let loader = this.genLoader();
    let children = this.switchContent(
      this.loading,
      this.$slots.default,
      loader
    );

    return h('button', data, this.$slots.default, [children]);
  }
};
