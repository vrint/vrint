<template>
  <vr-application :accessable="false">
    <ButtonView/>
    <CheckboxView/>
    <RadioView/>
    <SwitchView/>
    <BreadcrumbsView/>
    <CollapseView/>
    <CardView/> 
    <CalloutView/> 
    <AlertView/>
    <DialogView/>
    <!-- <DatetimeView/> -->
    <InputView/>
    <TextareaView/>
    <DropdownView/>
    <TagsView/>
    <PopoverView/>
    <TooltipView/>
    <ToasterView/>
  </vr-application>
</template>

<script>
import ButtonView from './components/button-view'
import CheckboxView from './components/checkbox-view'
import RadioView from './components/radio-view'
import SwitchView from './components/switch-view'
import BreadcrumbsView from './components/breadcrumbs-view'
import CollapseView from './components/collapse-view'
import InputView from './components/input-view'
import TextareaView from './components/textarea-view'
import DropdownView from './components/dropdown-view'
import CardView from './components/card-view'
import CalloutView from './components/callout-view'
import AlertView from './components/alert-view'
import TagsView from './components/tags-view'
import PopoverView from './components/popover-view'
import DialogView from './components/dialog-view'
import TooltipView from './components/tooltip-view'
import ToasterView from './components/toaster-view'
import Test from './test'

export default {
  components: {
    ButtonView,
    CheckboxView,
    RadioView,
    BreadcrumbsView,
    CollapseView,
    InputView,
    TextareaView,
    DropdownView,
    SwitchView,
    CardView,
    CalloutView,
    AlertView,
    TagsView,
    DialogView,
    PopoverView,
    TooltipView,
    ToasterView
  },
  data() {
    return {
      show: false,
      isOpen: false
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped>
section {
  margin: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
