export default {
  props: {
    isOpen: Boolean
  },
  render(h) {
    console.log(this.isOpen)
    const name = 'fade'
    return h(
      'transition',
      {
        props: {
          appear: true,
          name: 'fade',
          'appear-class': `${name}-appear`,
          'appear-active-class': ``,
          'appear-to-class': `${name}-appear-active`,
          'enter-class': `${name}-enter`,
          'enter-to-class': `${name}-enter-active`,
          'enter-active-class': ``,
          'leave-class': `${name}-exit`,
          'leave-active-class': ``,
          'leave-to-class': `${name}-exit-active`
        }
      },
      [this.isOpen ? h('p', [this.$slots.default]) : null]
    )
  }
}
