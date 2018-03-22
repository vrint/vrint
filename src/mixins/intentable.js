export default {
  props: {
    intent: {
      type: String
    }
  },
  computed: {
    intentClass() {
      const intentEnum = Object.freeze({
        primary: 'pt-intent-primary',
        danger: 'pt-intent-danger',
        success: 'pt-intent-success',
        warning: 'pt-intent-warning'
      })
      let name = intentEnum[this.intent]
      return name && { [name]: true }
    }
  }
}
