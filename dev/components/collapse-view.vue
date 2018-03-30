<template>
  <section>
    <h4>Collasped</h4>
    <vr-button @click="toggleCollapseState">
      toggle collapse [state] {{ stateMsg }}
    </vr-button>
    <vr-collapse :isOpen="isOpen">
      <p>
        The Collapse element shows and hides content with a built-in slide in/out animation.
        <br> 
        You might use this to create a panel of settings for your application, with sub-sections that can be expanded and collapsed.
      </p>
    </vr-collapse>
  </section>
</template>

<script>
export default {
  data() {
    return {
      stateMsg: '',
      isOpen: false
    }
  },
  methods: {
    toggleCollapseState() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style>

</style>
