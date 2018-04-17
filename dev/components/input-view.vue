<template>
  <section>
    <h4>Input</h4>
    <vr-input v-model="message" placeholder="placeholder"></vr-input>
    <vr-input v-model="message" placeholder="placeholder" :round="true" iconName="search"></vr-input>
    <vr-input v-model="message" :disabled="true" ></vr-input>
    <vr-input v-model="message" intent="success" placeholder="placeholder"></vr-input>
    <vr-input v-model="message" size="fill" placeholder="placeholder"></vr-input>

    <vr-dropdown v-model="message" :options="options" placeholder="please choose one"></vr-dropdown>
    <vr-dropdown v-model="message" :options="groupOptions"></vr-dropdown>

    <vr-textarea 
      placeholder="Less than 100 words"
      :maxlength="100"
      :rows="5" size="fill" @change="eventHandle" @blur="eventHandle">

    </vr-textarea>
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

<style>

</style>
