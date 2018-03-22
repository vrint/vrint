<template>
  <vr-application>
    <vr-button :loading="true">
    </vr-button>
    <vr-button-group>
      <vr-button>1</vr-button>
      <vr-button>1</vr-button>
      <vr-button>1</vr-button>
    </vr-button-group>

    <vr-dialog title="This is a title">
      <div class="pt-dialog-body">
        {{ msg }} world
      </div>
      <div class="pt-dialog-footer">
          <div class="pt-dialog-footer-actions">
              <vr-button>Seconday</vr-button>
              <vr-button intent="primary">Primary</vr-button>
          </div>
      </div>
    </vr-dialog>
  </vr-application>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello'
    }
  }
}
</script>

<style>

</style>
