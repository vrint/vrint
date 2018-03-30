import * as Classes from '../util/classes'
export default {
  props: {
    round: Boolean
  },

  computed: {
    roundClass() {
      return {
        [Classes.ROUND]: this.round
      }
    }
  }
}
