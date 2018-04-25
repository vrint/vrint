<template>
  <section>
    <h4>Popover</h4>
    <vr-popover v-model="isOpen" placement="top">
      <vr-button slot="reference">Popover</vr-button>
      <div slot="content">
        <h5><a href="#">Card heading</a></h5>
        <p>Are you sure you want to delete these items? You won't be able to recover them.</p>
        <vr-button>Cancel</vr-button>
        <vr-button intent="danger">Delete</vr-button>
      </div>
    </vr-popover>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true
    }
  }
}
</script>

