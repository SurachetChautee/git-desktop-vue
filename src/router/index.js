import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Report from '@/views/Report'
import Maps from '@/views/Map'
import Register from '@/views/Register'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/report',
    name:'Report',
    component:Report
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: Maps
  },
  {
    path:'/register',
    name: 'register',
    component:Register

  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
