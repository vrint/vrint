<template>
  <section>
    <h4>Popover</h4>
    <vr-popover v-model="isOpen" placement="right" :disabled="disabled">
      <vr-button slot="reference">Popover</vr-button>
      <div slot="content">
        <h5><a href="#">Card heading</a></h5>
        <p>Are you sure you want to delete these items? You won't be able to recover them.</p>
        <vr-button @click="onClose">Cancel</vr-button>
        <vr-button intent="danger" @click="onClose">Delete</vr-button>
      </div>
    </vr-popover>
    <br/>
    <br/>
    <vr-switch v-model="disabled">{{ disabled ? 'Enable' : 'Disable' }} Popover</vr-switch>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      disabled: false
    }
  },
  methods: {
    onClose() {
      this.isOpen = false
    }
  }
}
</script>

