<template>
  <section>
    <h4>Tabs</h4>

    <vr-tabs v-model="tabId" id="myTab">
      <vr-tab class="hello world" id="home" title="home">
        <h4 slot="title">hello world</h4>
        home
      </vr-tab>
      <vr-tab id="files" title="files">files</vr-tab>
      <vr-tab id="builds" title="builds">builds</vr-tab>
    </vr-tabs>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tabId: 'home'
    }
  }
}
</script>

<style>

</style>
