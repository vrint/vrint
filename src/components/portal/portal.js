export default {
  name: 'vr-portal',

  data() {
    return {
      portalElement: null,
      hasMounted: false
    }
  },

  props: {
    className: {
      type: String,
      default: ''
    },
    onChildrenMount: {
      type: Function,
      default: () => {}
    },
    children: {
      type: Array,
      default: []
    }
  },

  watch: {
    className(newclassName, oldclassName) {
      if (this.portalElement !== null) {
        this.portalElement.classList.remove(oldclassName)
        this.portalElement.classList.add(newclassName)
      }
    }
  },

  mounted() {
    this.portalElement = this.createContainerElement()
    document.body.appendChild(this.portalElement)
    this.props.onChildrenMount()
    this.hasMounted = true
  },

  methods: {
    createContainerElement() {
      let containerElement = this.$createElement('div')
      containerElement.classList.add('pt-portal')
      // TODO: add props className
      return containerElement
    }
  },

  render(h) {
    if (typeof document === 'undefined' || !this.state.hasMounted) {
      return null
    } else {
      return h(this.portalElement, this.children)
    }
  }
}
