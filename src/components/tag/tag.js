import VrIcon from '../icon'
import * as Classes from '../../util/classes'
import { classNames } from '../../util/helper'
import { Intentable, Activable, Sizeable, Iconable, Interactable } from '../../mixins'

export default {
  name: 'vr-tag',

  mixins: [Intentable, Activable, Sizeable, Interactable],

  props: {
    removeable: Boolean,
    minimal: Boolean,
    text: String
  },

  methods: {
    genIcon() {
      const iconSize = this.size === 'large' ? 20 : 16
      return this.$createElement(VrIcon, {
        props: {
          iconName: 'small-cross',
          iconSize
        }
      })
    },

    genRemoveBtn() {
      const $listener = { click: this.onRemoveClick }
      return this.$createElement(
        'button',
        {
          staticClass: Classes.TAG_REMOVE,
          attrs: { type: 'button' },
          on: $listener
        },
        [this.genIcon()]
      )
    },
    onRemoveClick(e) {
      this.$emit('remove', e)
    }
  },

  render(h) {
    const defaultSlot = this.$slots.default || [this.text]
    if (this.removeable) {
      defaultSlot.push(this.genRemoveBtn())
    }
    return h(
      'span',
      {
        staticClass: classNames(Classes.TAG, this.intentClass, this.sizeClass, {
          [Classes.INTERACTIVE]: this.interactive,
          [Classes.TAG_REMOVABLE]: this.removeable,
          [Classes.MINIMAL]: this.minimal
        })
      },
      defaultSlot
    )
  }
}
