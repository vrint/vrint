<template>
  <div id="app">
    <Button icon-name="add">Add</Button>
    <Button intent="primary" type="large">
      <Icon icon-name="arrow-right"/>
      text
    </Button>
    <Button intent="success" :size="100">text</Button>
    <Button intent="error" width="200px" height="40px">text</Button>
    <Button intent="warning">
        hello world
    </Button>
    <Button type="fill">
        hello world
    </Button>

    {{ value }}
    <Select v-model="value" :options="options">请选择</Select>
  </div>
</template>

<script>
import { Button, Icon, Select } from '@/components';
export default {
  name: 'app',
  data() {
    return {
      value: '1',
      options: [
        {
          label: '选项一',
          value: '1',
        },
        {
          label: '选项二',
          value: '2'
        }
      ]
    }
  },
  components: { Button, Icon, Select }
}
</script>
