import Vue from 'vue';
import App from './App';
import Vrint from 'vrint';

Vue.config.performance = true;

Vue.use(Vrint);

new Vue({
  render: h => h(App)
}).$mount('#app');
