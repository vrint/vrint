export default {
  props: {
    size: String,
    minimal: Boolean
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
