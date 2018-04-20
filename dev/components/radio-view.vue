<template>
  <section>
    <h4>Radio</h4>
    <vr-radio-group v-model="value" inline :options="options" group="fruit" />
    <vr-radio-group v-model="value">
      <vr-radio v-for="opt in options" :value="opt.value" :key="opt.value" name="group">
        {{ opt.label }}
      </vr-radio>
    </vr-radio-group>
  </section>
</template>

<script>
export default {
  data() {
    return {
      value: 'apple',
      checked: true,
      options: [
        { label: 'Apple', value: 'apple' },
        { label: 'Orange', value: 'orange' },
        { label: 'Melo', value: 'melo' }
      ]
    }
  }
}
</script>
