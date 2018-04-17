<template>
  <section>
    <h4>Switch</h4>
    <vr-switch>hello world</vr-switch>
    <vr-switch :checked="checked">hello world</vr-switch>
    <vr-switch :checked="checked" @change="onChanged"><u>custom underline label</u></vr-switch>
  </section>
</template>

<script>
export default {
  data() {
    return {
      checked: true
    }
  },
  methods: {
    onChanged(val) {
      this.checked = val.checked
    }
  }
}
</script>
