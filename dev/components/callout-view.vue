<template>
  <section>
    <h4>Callout</h4>
    <vr-callout v-for="intent in INTENT" :key="intent" :intent="intent" iconName="search" title="Callout Heading">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, delectus!
    </vr-callout>
  </section>
</template>

<script>
const INTENT = ['none', 'primary', 'success', 'warning', 'danger']
export default {
  data() {
    return {
      INTENT
    }
  }
}
</script>

<style scoped>
.pt-callout {
  margin-bottom: 15px;
}
</style>
