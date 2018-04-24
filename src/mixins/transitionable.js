export default {
  props: {
    transition: String,
    mode: String
  },

  methods: {
    genTransitionClasses(name = this.transitionName) {
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
    },

    createTransition(child, flag, otherProps, name = this.transitionNamem) {
      const h = this.$createElement
      const { genTransitionClasses } = this
      return h(
        'transition',
        {
          props: {
            name,
            appear: true,
            ...otherProps,
            ...genTransitionClasses(name)
          },
          on: otherProps.on
        },
        [flag ? child : null]
      )
    }
  }
}
