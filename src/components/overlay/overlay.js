import Portal from '../portal/portal'

export default {
  name: 'vr-overlay',

  props: {
    children: Array,

    isOpen: Boolean,

    hasBackdrop: Boolean,
  },

  methods: {
    maybeRenderBackdrop() {
      const {
        backdropClassName,
        backdropProps,
        hasBackdrop,
        isOpen,
        transitionDuration,
        transitionName
      } = this

      if (hasBackdrop && isOpen) {
        const data = { key: Math.random() }
        // const children = this.$createElement('div', data)
        return this.$createElement('div', data)
        // return this.$createElement('transition', data, [children])
      } else {
        return null
      }
    }
  },

  render(h) {
    const { children, className, usePortal, isOpen } = this
    const data = { props: { tag: 'div' } }
    const childrenWithTransitions = isOpen ? children : []
    childrenWithTransitions.unshift(this.maybeRenderBackdrop())
    const transitionGroup = h('transition-group', data, childrenWithTransitions)
    if (usePortal) {
      return this.$createElement(Portal, transitionGroup)
    } else {
      return transitionGroup
    }
  }
}
