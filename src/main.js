import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as uiv from 'uiv'
Vue.use(uiv)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue({})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
