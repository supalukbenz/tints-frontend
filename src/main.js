import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import axios from 'axios';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false;
axios.defaults.baseURL = 'https://tint-api-3774d.ondigitalocean.app/api/';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
