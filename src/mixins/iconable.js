import { VrIcon } from '../components'

export default {
  props: {
    iconName: String,
    iconSize: Number
  },

  methods: {
    genIcon() {
      let data = {
        props: {
          iconName: this.iconName,
          iconSize: this.iconSize
        }
      }
      return this.$createElement(VrIcon, data)
    }
  }
}
