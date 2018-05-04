import * as Classes from '../../util/classes'
import { classNames, safeInvoke, extend } from '../../util/helper'
import { props as tabProps } from './tab'

export const props = extend(tabProps, {
  onClick: Function,

  parentId: [Number, String],

  selected: Boolean
})

export default {
  name: 'vr-tab-title',

  props,

  render(h) {
    const { disabled, id, parentId, selected, title } = this

    const attrs = {
      ['aria-controls']: this.generateTabPanelId(parentId, id),
      ['aria-disabled']: disabled,
      ['aria-expaneded']: selected,
      ['aria-selected']: selected,
      ['data-tab-id']: id,
      id: this.generateTabTitleId(parentId, id),
      role: 'tab',
      tabindex: disabled ? undefined : 0
    }
    const staticClass = Classes.TAB
    const on = { click: e => safeInvoke(this.onClick, id, e) }

    return h('div', { staticClass, attrs, on }, this.$slots.default || [title])
  },

  methods: {
    generateTabPanelId(parentId, tabId) {
      return `${Classes.TAB_PANEL}_${parentId}_${tabId}`
    },
    generateTabTitleId(parentId, tabId) {
      return `${Classes.TAB}-title_${parentId}_${tabId}`
    }
  }
}
