import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui';
import router from './router'
import store from './store'
import axios from './util/ajax'

//自定义组件
import './components/install'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(Element)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')