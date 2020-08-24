import Vue from 'vue'
import App from './App'
import store from '../store'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Vuex);
Vue.use(ElementUI);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})