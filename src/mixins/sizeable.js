export default {
  props: {
    size: {
      type: String
    }
  },
  computed: {
    sizeClass() {
      const typeEnum = Object.freeze({
        small: 'pt-small',
        large: 'pt-large',
        fill: 'pt-fill'
      })
      const name = typeEnum[this.size]
      return name && { [name]: true }
    }
  }
}
