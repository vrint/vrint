import { Activable, Controlable, Intentable } from '../../mixins'
export default {
  name: 'vr-checkbox',

  mixins: [Activable, Controlable, Intentable],

  render(h) {
    return this.genControl('checkbox', 'pt-checkbox')
  }
}
