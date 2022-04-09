import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './components/Dashboard'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'cur',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard
    }
  ]
})

export default router
