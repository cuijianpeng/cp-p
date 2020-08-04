import Vue from 'vue';
import Vuex from 'vuex'
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Vuex);
Vue.use(ElementUI);

new Vue({
    el: '#chrome-plugin-insertPage',
    render: h => h(App)
});