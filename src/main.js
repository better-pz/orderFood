import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import wxShare from './wxconfig'
import 'vant/lib/index.css'
import store from './store'


Vue.prototype.$wxShare = wxShare
Vue.use(Vant);

Vue.config.productionTip = false //阻止vue启动生产消息

new Vue({
  render: h => h(App),   
  router,
  store
}).$mount('#app')