import INTENT from '../util/intent'
import { intentClass } from '../util/classes'

export default {
  props: {
    intent: {
      type: String,
      validator: function(val) {
        return Object.values(INTENT).indexOf(val) !== -1
      }
    },
    minimal: Boolean
  },
  computed: {
    intentClass() {
      const minimal = this.minimal ? 'pt-minimal' : ''
      return [intentClass(this.intent), minimal]
    }
  }
}
