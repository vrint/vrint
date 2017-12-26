<template>
  <div id="app">
    <Button intent="primary">text</Button>
    <Button intent="success">text</Button>
    <Button intent="error">text</Button>
    <Button intent="warning">text</Button>
  </div>
</template>

<script>
import { Button } from '@/components';
export default {
  name: 'app',
  components: { Button }
}
</script>
