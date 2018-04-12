export default {
  props: {
    transition: String,
    mode: String
  },

  methods: {
    genTransitionClasses(name = this.transition) {
      if (!name) return Object.create({})
      return {
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
    }
  },

  createTransition(children, name = this.transition) {
    const h = this.$createElment
    const { mode, genTransitionClasses } = this
    return h('transition', {
      props: {
        mode,
        name,
        ...genTransitionClasses(name)
      },
      children
    })
  }
}
