<template>
  <section>
    <h4>Toaster</h4>
    <vr-button @click="appendToast(primaryOption)" intent="primary">Procure toast</vr-button>
    <vr-button @click="appendToast(successOption)" intent="success">Move files</vr-button>
    <vr-toaster ref="toaster" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      primaryOption: {
        message: ['One toast created. ', this.$createElement('em', 'Toasty.')],
        intent: 'primary',
        action: {
          text: this.$createElement('strong', 'Yum.'),
          handler: () => window.open('https://www.google.com/search?q=toast&source=lnms&tbm=isch')
        }
      },
      successOption: {
        message: `Moved 6 files.`,
        intent: 'success',
        iconName: 'tick'
      }
    }
  },
  methods: {
    appendToast(option) {
      const Toaster = this.$refs.toaster
      Toaster.show(option)
    }
  }
}
</script>