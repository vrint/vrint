<template>
  <section>
    <h4>Switch</h4>
    <vr-switch>hello world</vr-switch>
    <vr-switch v-model="checked">hello world</vr-switch>
    <vr-switch v-model="checked"><u>custom underline label</u></vr-switch>
  </section>
</template>

<script>
export default {
  data() {
    return {
      checked: true
    }
  }
}
</script>
