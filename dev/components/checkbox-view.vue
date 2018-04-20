<template>
  <section>
    <h4>Checkbox</h4>
    <vr-checkbox v-model="checked" inline @change="onChanged">First <small>(inline)</small></vr-checkbox>
    <vr-checkbox v-model="checked" inline @change="onChanged">Second <small>(inline)</small></vr-checkbox>
    <vr-checkbox :indeterminate="indeterminate" inline>Third <small>(inline)</small></vr-checkbox>
    <vr-checkbox :disabled="checked">disabled</vr-checkbox>
    <vr-checkbox :disabled="checked">disabled</vr-checkbox>
    <vr-checkbox size="large">large checkbox</vr-checkbox>
  </section>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      indeterminate: true
    }
  },
  methods: {
    onChanged(val) {
      console.log(val)
    }
  }
}
</script>

<style>

</style>
