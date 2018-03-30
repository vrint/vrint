<template>
  <section>
    <h4>Input</h4>
    <vr-input v-model="message" placeholder="placeholder"></vr-input>
    <vr-input v-model="message" placeholder="placeholder" :round="true" iconName="search"></vr-input>
    <vr-input v-model="message" :disabled="true" ></vr-input>
    <vr-input v-model="message" intent="success" placeholder="placeholder"></vr-input>
    <vr-input v-model="message" size="fill" placeholder="placeholder"></vr-input>

    <vr-select v-model="message" :options="options" placeholder="placeholder"></vr-select>
  </section>
</template>

<script>
export default {
  data() {
    return {
      message: '2',
      options: [
        {value: '1', label: 'hello'},
        {value: '2', label: 'hello2'}
      ]
    }
  }
}
</script> 

<style>

</style>
