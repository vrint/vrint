<template>
  <vr-application :accessable="false">
    <ButtonView/>
    <CheckboxView/>
    <BreadcrumbsView/>
    <CollapseView/>
    <DatetimeView/>
    <InputView/>
  </vr-application>
</template>

<script>
import ButtonView from './components/button-view'
import CheckboxView from './components/checkbox-view'
import BreadcrumbsView from './components/breadcrumbs-view'
import CollapseView from './components/collapse-view'
import DatetimeView from './components/datetime-view'
import InputView from './components/input-view'
export default {
  components: { ButtonView, CheckboxView, BreadcrumbsView, CollapseView, DatetimeView, InputView },
  data() {
    return {
      msg: 'hello'
    }
  }
}
</script>

<style>

</style>
