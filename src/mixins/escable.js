import * as Keys from '../util/keys'
import { safeInvoke } from '../util/helper'

export default {
  props: {
    canEscapeKeyClose: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    eventOfEscKeyDown() {
      return {
        keydown: e => {
          const isEsc = e.which === Keys.ESCAPE && this.canEscapeKeyClose
          console.log(isEsc)
          if (isEsc) {
            safeInvoke(this.onClose, e)
          }
          e.preventDefault()
        }
      }
    }
  }
}
