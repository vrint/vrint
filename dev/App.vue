<template>
  <vr-application :accessable="false">
    <ButtonView/>
    <CheckboxView/>
    <BreadcrumbsView/>
    <CollapseView/>
    <!-- <DatetimeView/> -->
    <InputView/>
    <button @click="isOpen = !isOpen">
      toggle
    </button>
    {{ isOpen }}
    <vr-alert 
      :isOpen="isOpen"
      intent="danger"
      iconName="trash"
      cancelButtonText="Cancel"
      confirmButtonText="Move to Trash"
      :handleConfirm="onClose"
      :handleCancel="onClose">
        <p>Are you sure you want to move <b>filename</b> to Trash? You will be able to restore it later, but it will become private to you.</p>
    </vr-alert>
    <vr-card
      class="aaa bbb"
      style="width: 120px"
      :interactive="true" 
      :elevation="2">
      <h5><a href="#">Card heading</a></h5>
      <p>Card content</p>
      <vr-button>Submit</vr-button>
    </vr-card>
  </vr-application>
</template>

<script>
import ButtonView from './components/button-view'
import CheckboxView from './components/checkbox-view'
import BreadcrumbsView from './components/breadcrumbs-view'
import CollapseView from './components/collapse-view'
import InputView from './components/input-view'
import Test from './test'

export default {
  components: { ButtonView, CheckboxView, BreadcrumbsView, CollapseView, InputView, Test },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    onClose(e) {
      this.isOpen = false
    }
  }
}
</script>