import * as Classes from '../../util/classes'
import VrIcon from '../icon'

export default {
  name: 'vr-datepicker',

  methods: {
    genContainer(children) {
      let h = this.$createElement
      const wrapper = h('div', { domProps: { tabindex: -1 } }, children)
      return h('div', { staticClass: 'pt-datepicker' }, [wrapper])
    },
    genIndictor(label, classNames, clickHandler) {
      let h = this.$createElement
      let staticClass = `DayPicker-NavButton 'DayPicker-NavButton--${classNames}`
      return h('span', {
        staticClass,
        domProps: { 'aria-label': label, tabindex: 0, role: 'button' },
        on: {
          click: clickHandler
        }
      })
    },
    genNavbar() {
      let h = this.$createElement
      let children = [
        this.genIndictor('Previous Month', 'prev', this.prevIndictorClickHandler),
        this.genIndictor('Next Month', 'next', this.nextIndictorClickHandler)
      ]
      return h('div', { staticClass: 'DayPicker-NavBar' }, children)
    },
    genCaptionSelect(type, optionList) {
      let h = this.$createElement
      let options = []
      for (let i = 0; i < optionList.length; i++) {
        let { label, value } = optionList[i]
        options.push(h('option', { domProps: { value: i } }, optionList[i]))
      }
      let select = h('select', { staticClass: `pt-datepicker-${type}-select` }, options)
      let caretIcon = h(VrIcon, {
        props: { iconName: 'caret-down' },
        staticClass: 'pt-datepicker-caption-caret'
      })
      return h('div', { staticClass: 'pt-datepicker-caption-select' }, [select, caretIcon])
    },
    genWeekDayCaption() {
      let h = this.$createElement
      let monthOptions = [{ label: 'Jan', value: '0' }]
      let yearOptions = [{ label: '2018', value: '2018' }]
      return h('div', { staticClass: 'pt-datepicker-caption' }, [
        this.genCaptionSelect('year', yearOptions),
        this.genCaptionSelect('month', monthOptions)
      ])
    },
    genWeekDayRow() {
      let h = this.$createElement
      let headerCells = []
      let weekdays = [
        { short: 'Su', full: 'Sunday' },
        { short: 'Mo', full: 'Monday' },
        { short: 'Tu', full: 'Tuesday' },
        { short: 'We', full: 'Wednesday' },
        { short: 'Th', full: 'Thursday' },
        { short: 'Fr', full: 'Friday' },
        { short: 'Sa', full: 'Saturday' }
      ]
      for (let i = 0; i < weekdays.length; i++) {
        let { short, full } = weekdays[i]
        let abbr = h('abbr', { domProps: { title: full } }, short)
        let cell = h(
          'div',
          {
            staticClass: 'DayPicker-Weekday',
            domProps: { role: 'columnheader' }
          },
          abbr
        )
        headerCells.push(cell)
      }
      let weekdayRow = h(
        'div',
        { staticClass: 'DayPicker-WeekdaysRow', domProps: { role: 'row' } },
        headerCells
      )
      return h(
        'div',
        { staticClass: 'DayPicker-Weekdays', domProps: { role: 'rowgroup' } },
        weekdayRow
      )
    },
    genDayRow() {},
    genDayCell() {},
    prevIndictorClickHandler() {}
  },

  render(h) {
    return this.genContainer([
      this.genNavbar(),
      this.genWeekDayCaption()
    ])
  }
}
