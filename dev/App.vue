<template>
  <vr-application>
    <ButtonView/>
    <CheckboxView/>
    <vr-icon iconName="calendar" title="calendar"></vr-icon>
    <vr-button-group>
      <vr-button>2</vr-button>
      <vr-button>1</vr-button>
      <vr-button>1</vr-button>
    </vr-button-group>

    <vr-callout iconName="user" title="Visually important content" intent="success">
      The component is a simple wrapper around the CSS API that provides props for modifiers and optional title element. Any additional HTML props will be spread to the rendered element.
    </vr-callout>
  </vr-application>
</template>

<script>
import ButtonView from './components/button-view'
import CheckboxView from './components/checkbox-view'
export default {
  components: { ButtonView, CheckboxView },
  data() {
    return {
      msg: 'hello'
    }
  }
}
// <vr-dialog title="This is a title">
//   <div class="pt-dialog-body">
//     {{ msg }} world
//   </div>
//   <div class="pt-dialog-footer">
//       <div class="pt-dialog-footer-actions">
//           <vr-button>Seconday</vr-button>
//           <vr-button intent="primary">Primary</vr-button>
//       </div>
//   </div>
// </vr-dialog>
</script>

<style>

</style>
