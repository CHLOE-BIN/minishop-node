import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index.vue'
import Home from '../views/home.vue'
import Error from '../views/404.vue'
import Phone from '../views/phone.vue'
import User from '../views/user.vue'
import Tv from '../views/tv.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    }, {
      path: '/index',
      name: 'index',
      component: Index,
    }, {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/error',
      name: 'error',
      component: Error
    }, {
      path: '/phone',
      name: 'phone',
      component: Phone
    }, {
      path: '/tv',
      name: 'tv',
      component: Tv
    }, {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})

export default router
