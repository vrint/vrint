<template>
  <vr-application :accessable="false">
    <ButtonView/>
    <CheckboxView/>
    <RadioView/>
    <SwitchView/>
    <BreadcrumbsView/>
    <CollapseView/>
    <CardView/> 
    <AlertView/>
    <!-- <DatetimeView/> -->
    <InputView/>
    <TagsView/>
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
import CardView from './components/card-view'
import AlertView from './components/alert-view'
import TagsView from './components/tags-view'
import Test from './test'

export default {
  components: {
    ButtonView,
    CheckboxView,
    RadioView,
    BreadcrumbsView,
    CollapseView,
    InputView,
    SwitchView,
    CardView,
    AlertView,
    TagsView,
    Test
  }
}
</script>

<style scoped>
section {
  margin: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
</style>
