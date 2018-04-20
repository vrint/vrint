<template>
  <section>
    <h4>Dropdown</h4>
    <vr-input v-model="message" placeholder="placeholder"></vr-input>
    <vr-dropdown v-model="message" :options="options" placeholder="Please choose one ..."></vr-dropdown>
    <vr-dropdown v-model="message" :options="groupOptions"></vr-dropdown>
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