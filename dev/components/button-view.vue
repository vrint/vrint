<template>
  <section>
    <h4>Button</h4>
    <vr-button>button</vr-button>
    <vr-button iconName="add">button</vr-button>
    <vr-button iconName="add" :minimal="true">button</vr-button>
    <vr-button intent="primary">button</vr-button>
    <vr-button intent="primary" iconName="add">button</vr-button>
    <vr-button intent="primary" :minimal="true" iconName="add">button</vr-button>
    <vr-button intent="success">button</vr-button>
    <vr-button intent="success" iconName="add">button</vr-button>
    <vr-button intent="success" :minimal="true" iconName="add">button</vr-button>
    <vr-button intent="warning">button</vr-button>
    <vr-button intent="warning" iconName="add">button</vr-button>
    <vr-button intent="warning" iconName="add" :minimal="true">button</vr-button>
    <vr-button intent="danger">button</vr-button>
    <vr-button intent="danger" iconName="add">button</vr-button>
    <vr-button intent="danger" iconName="add" :minimal="true">button</vr-button>
    <br>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.pt-button {
  vertical-align: bottom;
}
</style>
