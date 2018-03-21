<template>
  <vr-application>
    <vr-button>
      <vr-spinner size="small"></vr-spinner>
    </vr-button>
    <vr-button-group>
      <vr-button>1</vr-button>
      <vr-button>1</vr-button>
      <vr-button>1</vr-button>
    </vr-button-group>
  </vr-application>
</template>

<script>
import VrButton from '../src/components/button/button';
import VrApplication from '../src/components/application/app';
import VrSpinner from '../src/components/spinner/spinner';
import VrButtonGroup from '../src/components/buttonGroup/buttonGroup';
export default {
  components: { VrApplication, VrButton, VrSpinner, VrButtonGroup },
  data() {
    return {
      msg: 'hello'
    };
  }
};
</script>

<style>

</style>
