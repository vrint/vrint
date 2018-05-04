import VrTab from './tab'
import VrTabTitle from './tabTitle'
import { safeChildren, safeInvoke, classNames, extend } from '../../util/helper.js'
import * as Keys from '../../util/keys'
import * as Classes from '../../util/classes'

const { generateTabTitleId, generateTabPanelId } = VrTabTitle.methods

const TAB_SELECTOR = `.${Classes.TAB}`

export const props = extend({
  animate: {
    type: Boolean,
    default: true
  },

  id: [String, Number],

  large: Boolean,

  renderActiveTabPanelOnly: Boolean,

  selectedTabId: [String, Number],

  vertical: Boolean,

  onChange: Function
})

export default {
  name: 'vr-tabs',

  props,

  model: {
    prop: 'selectedTabId',
    event: 'tabChange'
  },

  data() {
    return {
      indicatorWrapperStyle: {}
    }
  },

  render(h) {
    const { selectedTabId } = this

    const classes = classNames(Classes.TABS, {
      [Classes.VERTICAL]: this.vertical
    })

    const tabPanels = this.getTabChildren()
      .filter(
        this.renderActiveTabPanelOnly ? tab => tab.data.id === this.selectedTabId : () => true
      )
      .map(this.renderTabPanel)

    return h('div', { staticClass: classes }, [this.genTabTitleList(tabPanels), tabPanels])
  },

  watch: {
    selectedTabId(val) {
      this.moveSelectionIndicator()
    }
  },

  mounted() {
    this.moveSelectionIndicator()
  },

  methods: {
    genTabTitleList(tabPanels) {
      const staticClass = classNames(Classes.TAB_LIST, {
        [Classes.LARGE]: this.large
      })

      const tabTitle = this.getTabChildren().map(this.renderTabTitle)
      const tabIndictor = this.animate ? this.genTabIndictor() : null

      return this.$createElement(
        'div',
        {
          staticClass,
          ref: 'tablist',
          attr: { role: 'tablist' },
          on: {
            keydown: this.handleKeyDown,
            keypress: this.handleKeyPress
          }
        },
        [tabIndictor, tabTitle]
      )
    },

    genTabIndictor() {
      return this.$createElement(
        'div',
        {
          staticClass: Classes.TAB_INDICATOR_WRAPPER,
          style: this.indicatorWrapperStyle
        },
        [this.$createElement('div', { staticClass: Classes.TAB_INDICATOR })]
      )
    },

    getTabChildren() {
      if (!this.$slots.default) return []

      return this.$slots.default.filter(child => {
        if (!child.componentOptions) return

        return child.componentOptions.tag === VrTab.name
      })
    },

    renderTabPanel(vnode) {
      if (!vnode) return

      const { children, propsData } = vnode.componentOptions
      const { staticClass: classes } = vnode.data
      const { id, title } = propsData

      let attrs = {
        key: id,
        role: 'tabpanel',
        id: generateTabPanelId(this.id, id),
        ['aria-hidden']: id !== this.selectedTabId,
        ['aria-labelledby']: generateTabTitleId(this.id, id)
      }
      let staticClass = classNames(Classes.TAB_PANEL, classes)
      return this.$createElement(
        'div',
        { attrs, staticClass },
        children.filter(node => !node.data || !node.data.slot)
      )
    },

    renderTabTitle(vnode) {
      const { id } = vnode.componentOptions.propsData
      const props = {
        ...vnode.componentOptions.propsData,
        onClick: this.handleTabClick,
        parentId: this.id,
        selected: id === this.selectedTabId
      }

      const title = vnode.componentOptions.children.filter(
        node => node.tag && node.data.slot === 'title'
      )

      return this.$createElement(VrTabTitle, { props }, title)
    },

    moveSelectionIndicator() {
      const tablistElement = this.$refs.tablist
      if (tablistElement === undefined || !this.animate) {
        return
      }

      const tabIdSelector = `${TAB_SELECTOR}[data-tab-id="${this.selectedTabId}"]`
      const selectedTabElement = tablistElement.querySelector(tabIdSelector)

      let indicatorWrapperStyle = { display: 'none' }
      if (selectedTabElement != null) {
        const { clientHeight, clientWidth, offsetLeft, offsetTop } = selectedTabElement
        indicatorWrapperStyle = {
          height: `${clientHeight}px`,
          transform: `translateX(${Math.floor(offsetLeft)}px) translateY(${Math.floor(
            offsetTop
          )}px)`,
          width: `${clientWidth}px`
        }
      }
      this.indicatorWrapperStyle = indicatorWrapperStyle
    },

    getTabElements(subselector = '') {
      if (this.tablistElement == null) {
        return []
      }
      return Array.from(this.tablistElement.querySelectorAll(TAB_SELECTOR + subselector))
    },

    handleKeyDown(e) {
      const focusedElement = document.activeElement.closest(TAB_SELECTOR)
      // rest of this is potentially expensive and futile, so bail if no tab is focused
      if (focusedElement == null) {
        return
      }

      // must rely on DOM state because we have no way of mapping `focusedElement` to a JSX.Element
      const enabledTabElements = this.getTabElements().filter(
        el => el.getAttribute('aria-disabled') === 'false'
      )
      const focusedIndex = enabledTabElements.indexOf(focusedElement)
      const direction = this.getKeyCodeDirection(e)

      if (focusedIndex >= 0 && direction !== undefined) {
        e.preventDefault()
        const { length } = enabledTabElements
        // auto-wrapping at 0 and `length`
        const nextFocusedIndex = (focusedIndex + direction + length) % length
        enabledTabElements[nextFocusedIndex].focus()
      }
    },

    handleKeyPress(e) {
      const targetTabElement = e.target.closest(TAB_SELECTOR)
      if (targetTabElement != null && this.isEventKeyCode(e, Keys.SPACE, Keys.ENTER)) {
        e.preventDefault()
        targetTabElement.click()
      }
    },

    handleTabClick(newTabId, event) {
      safeInvoke(this.onChange, newTabId, this.selectedTabId, event)
      this.$emit('tabChange', newTabId)
    },

    isEventKeyCode(e, ...codes) {
      return codes.indexOf(e.which) >= 0
    },

    getKeyCodeDirection(e) {
      if (this.isEventKeyCode(e, Keys.ARROW_LEFT, Keys.ARROW_UP)) {
        return -1
      } else if (this.isEventKeyCode(e, Keys.ARROW_RIGHT, Keys.ARROW_DOWN)) {
        return 1
      }
      return undefined
    }
  }
}
