import { Intentable, Sizeable } from '../../mixins';

export default {
  name: 'vr-spinner',

  mixins: [Intentable],

  computed: {
    classes() {
      return Object.assign({
        'pt-spinner': true,
      }, this.sizeClass)
    }
  },

  props: {
    value: {
      type: Number, 
      default: 0
    }
  }

  methods: {
    genSpinnerEle() {
      let p1 = 'M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89';
      let p2 = 'M 94.5 50 A 44.5 44.5 0 0 0 50 5.5';
      let vb = '0 0 100 100';
      const svgEle = this.$createElement('svg', { attrs: { viewBox: vb } } ,[
        this.$createElement('path', { attrs: { d: p1 }, staticClass: 'pt-spinner-track' }),
        this.$createElement('path', { attrs: { d: p2 }, staticClass: 'pt-spinner-head'})
      ])
      return this.$createElement('div', { staticClass: 'pt-spinner-svg-container'}, [svgEle]);
    }
  },

  render(h) {
    const spinnerContent =this.genSpinnerEle();
    const data = {
      class: this.classes
    }

    return h('div', data, [spinnerContent]);
  }
}