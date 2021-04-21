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
axios.defaults.baseURL = 'http://127.0.0.1:5000/api/';

// const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYxODk5NDAzNiwianRpIjoiN2M3NTQxNGMtODBhZC00ZDliLTg2NWEtZGY0ZjgyZmNhOGFhIiwibmJmIjoxNjE4OTk0MDM2LCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiNjA3MDNhNjc2ZGY1NWIzNGFlMjZhY2U3IiwiZXhwIjoxNjE5ODU4MDM2fQ.uFajDMIfXVJSqcv50WY6IdmFpL7mEkDi5VhARa-F3u0";
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
