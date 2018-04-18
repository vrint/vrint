<template>
  <section>
    <h4>Alert</h4>
    <vr-button @click="isOpen = !isOpen">
    Click
    </vr-button>
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
  </section>
</template>

<script>
export default {
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
