import { checkWithWarn } from '@/util/output.js'

export default {
  data() {
    const intentEnum = Object.freeze({
      default: 'default',
      primary: 'pt-intent-primary',
      danger: 'pt-intent-danger',
      success: 'pt-intent-success',
      warning: 'pt-intent-warning'
    })

    return {
      intentEnum
    }
  },
  props: {
    intent: {
      type: String,
      // TODO: validator need
      default: 'default'
    }
  },
  computed: {
    intentClass() {
      return this.intentEnum[this.intent];
    }
  }
};