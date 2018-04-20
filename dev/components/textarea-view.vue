<template>
  <section>
    <h4>Textarea</h4>
    <vr-textarea 
      v-model="msg"
      placeholder="Less than 100 words"
      :maxlength="100"
      :rows="5" size="fill" @change="eventHandle" @blur="eventHandle"/>
  </section>
</template>

<script>
export default {
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    eventHandle() {

    }
  }
}
</script>