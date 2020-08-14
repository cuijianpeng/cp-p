import Vue from 'vue';
import Vuex from 'vuex'
import App from './App';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router.js'

Vue.use(Vuex);
Vue.use(ElementUI);

new Vue({
    el: '#chrome-plugin-insertPage',
    router,
    render: h => h(App)
});