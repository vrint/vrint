<template>
  <vr-application :accessable="false">
    <ButtonView/>
    <CheckboxView/>
    <BreadcrumbsView/>
    <CollapseView/>
    <DatetimeView/>
  </vr-application>
</template>

<script>
import ButtonView from './components/button-view'
import CheckboxView from './components/checkbox-view'
import BreadcrumbsView from './components/breadcrumbs-view'
import CollapseView from './components/collapse-view'
import DatetimeView from './components/datetime-view'
export default {
  components: { ButtonView, CheckboxView, BreadcrumbsView, CollapseView, DatetimeView },
  data() {
    return {
      msg: 'hello'
    }
  }
}
</script>

<style>

</style>
