<template>
  <section>
    <h4>Input</h4>
    <vr-input v-model="message" placeholder="placeholder"></vr-input>
    <vr-input v-model="message" placeholder="placeholder" :round="true" iconName="search"></vr-input>
    <vr-input v-model="message" :disabled="true" ></vr-input>
    <vr-input v-model="message" intent="success" placeholder="placeholder"></vr-input>
    <vr-input v-model="message" size="fill" placeholder="placeholder"></vr-input>
  </section>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      options: [{ value: '1', label: 'hello' }, { value: '2', label: 'hello2' }],
      groupOptions: [
        {
          label: 'group 1',
          options: [{ value: '1', label: 'hello' }, { value: '2', label: 'hello2' }]
        }
      ]
    }
  },
  methods: {
    eventHandle(ev) {
      console.log(ev)
    }
  }
}
</script> 

<style scoped>
.pt-input {
  margin: 10px 10px 10px 0;
}
</style>
