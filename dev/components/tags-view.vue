<template>
  <section>
    <h4>Tags</h4>
    <vr-tag v-for="(tag, i) in tags" :intent="INTENT[i]" :key="i" size="large" minimal removeable interactive @remove="onRemove(tag)">{{ tag }}</vr-tag>
    <vr-button @click="reset">Reset</vr-button>
  </section>
</template>

<script>
const INITIAL_TAGS = ['@jkillian', '@adahiya', '@ggray', '@allorca', '@bdwyer', '@piotrk']
export default {
  data: () => ({
    tags: INITIAL_TAGS,
    INTENT: ['none', 'primary', 'success', 'warning', 'danger']
  }),

  methods: {
    onRemove(tag) {
      this.tags = this.tags.filter(t => t !== tag)
    },
    reset() {
      this.tags = INITIAL_TAGS
    }
  }
}
</script>

<style scoped>
.pt-tag {
  margin-right: 20px;
}
</style>

