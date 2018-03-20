import { checkWithWarn } from '@/util/output.js'

export default {
  data() {
    const intentEnum = Object.freeze({
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
      validator: function(val) {
        return true;
      }.bind(this)
    }
  },
  computed: {
    intentClass() {
      return this.intentEnum[this.intent];
    }
  }
};