import { VrIcon } from '../components'

export default {
  props: {
    iconName: String,
    iconSize: Number
  },

  methods: {
    genIcon(iconName, iconSize) {
      let data = {
        props: {
          iconName: iconName || this.iconName,
          iconSize: iconSize || this.iconSize
        }
      }
      return this.$createElement(VrIcon, data)
    }
  }
}
