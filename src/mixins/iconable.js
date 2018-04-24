import { VrIcon } from '../components'

export default {
  props: {
    iconName: String,
    iconSize: Number
  },

  methods: {
    genIcon(iconName, iconSize, ...options) {
      let data = {
        props: {
          iconName: iconName || this.iconName,
          iconSize: iconSize || this.iconSize,
          intent: this.intent
        },
        ...options
      }
      return this.$createElement(VrIcon, data)
    }
  }
}
