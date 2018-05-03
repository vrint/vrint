import VrTab from './tab'
import { safeChildren, safeInvoke, classNames, extend } from '../../util/helper.js'
import * as Keys from '../../util/keys'
import * as Classes from '../../util/classes'

export const props = extend({
  vertical: Boolean
})

export default {
  name: 'vr-tabs',

  render(h) {
    const classes = classNames(Classes.TABS, {
      [Classes.VERTICAL]: this.vertical
    })
  }
}
