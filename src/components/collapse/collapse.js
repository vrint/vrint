import * as Classes from '../../util/classes'

export default {
  name: 'vr-collapse',

  data() {
    const AnimationStates = {
      CLOSED: 'closed',
      OPENING: 'opening',
      OPEN: 'open',
      CLOSING_START: 'closing-start',
      CLOSING_END: 'closing-end'
    }
    return {
      AnimationStates,
      contents: null,
      height: 0,
      $internalWatcher: 0,
      state: AnimationStates.CLOSED
    }
  },

  props: {
    wrapperTag: {
      type: String,
      default: 'div'
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    keepChildrenMounted: {
      type: Boolean,
      default: false
    },
    transitionDuration: {
      type: Number,
      default: 200
    }
  },

  watch: {
    isOpen(newValOfIsOpen, oldValOfIsOpen) {
      const { state, AnimationStates, transitionDuration, contents } = this
      if (oldValOfIsOpen !== newValOfIsOpen) {
        if (state !== AnimationStates.CLOSED && !newValOfIsOpen) {
          this.state = AnimationStates.CLOSING_START
          this.height = `${this.contents.clientHeight}px`
          console.log(this.height)
        } else if (state !== AnimationStates.OPEN && newValOfIsOpen) {
          this.state = AnimationStates.OPENING
          this.$nextTick(e => {
            this.height = `${this.contents.clientHeight}px`
            setTimeout(() => this.onDelayedStateChange(), transitionDuration)
          })
        }
      }
    }
  },

  updated() {
    let { state, AnimationStates, transitionDuration } = this
    if (state === AnimationStates.CLOSING_START) {
      this.state = AnimationStates.CLOSING_END
      setTimeout(() => this.onDelayedStateChange(), transitionDuration)
    }
  },

  mounted() {
    this.$forceUpdate()

    const { AnimationStates } = this
    if (this.isOpen) {
      this.state = AnimationStates.OPEN
      this.height = 'auto'
    } else {
      this.state = AnimationStates.CLOSED
    }
  },

  methods: {
    onDelayedStateChange() {
      let { AnimationStates, state } = this
      switch (state) {
        case AnimationStates.OPENING:
          this.state = AnimationStates.OPEN
          this.height = 'auto'
          break
        case AnimationStates.CLOSING_END:
          this.state = AnimationStates.CLOSED
          break
        default:
          break
      }
    }
  },

  render(h) {
    let { AnimationStates, state, height } = this
    console.log({ height })
    let { wrapperTag, keepChildrenMounted, isOpen } = this
    // state === AnimationStates.CLOSING_START
    const isContentInit = height !== 0
    const isContentVisible = isContentInit && state !== AnimationStates.CLOSED
    const shouldRenderChildren = state !== AnimationStates.CLOSED || keepChildrenMounted
    const isAnimationEnd = state !== AnimationStates.CLOSING_END
    const displayWithTransform = isContentVisible && isAnimationEnd
    const isAutoHeight = height === 'auto'

    const containerStyle = {
      height: isContentVisible ? height : 0,
      overflowY: isAutoHeight ? 'visible' : undefined,
      transition: isAutoHeight ? 'none' : undefined
    }

    const contentsStyle = {
      transform: displayWithTransform ? 'translateY(0)' : `translateY(-${height})`,
      transition: isAutoHeight ? 'none' : undefined
    }

    let data = {
      staticClass: Classes.COLLAPSE,
      style: containerStyle
    }
    let children = h(
      'div',
      {
        staticClass: 'pt-collapse-body',
        style: contentsStyle,
        ref: 'contents',
        attrs: {
          'aria-hidden': String(state === AnimationStates.CLOSED)
        }
      },
      shouldRenderChildren ? this.$slots.default : null
    )
    this.contents = this.$refs.contents
    return h(wrapperTag, data, [children])
  }
}
