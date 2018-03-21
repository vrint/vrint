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

  props: {
    minimal: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    loading(val) {
      this.disabled = val || this.disabled
    }
  },

  computed: {
    classes() {
      return Object.assign(
        {
          'pt-button': true,
          'pt-minial': this.minimal
        },
        this.iconClass,
        this.sizeClass,
        this.loaderClass,
        this.activeClass
      );
    }
  },

  methods: {},

  render(h) {
    const data = {
      class: this.classes
    };

    let children = this.switchContent(
      this.loading,
      this.$slots.default,
      this.genLoader({ type: 'button' })
    );

    return h('button', data, [children]);
  }
};
