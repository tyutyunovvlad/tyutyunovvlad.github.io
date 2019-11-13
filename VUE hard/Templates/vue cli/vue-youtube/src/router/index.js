import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {layout:'empty'},
    component:() => import('../views/login.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout:'main'},
    component:() => import('../views/categories.vue')
  },
  {
    path: '/detail-record',
    name: 'detail-record',
    meta: {layout:'main'},
    component:() => import('../views/detail-record.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout:'main'},
    component:() => import('../views/history.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {layout:'main'},
    component:() => import('../views/Home.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout:'main'},
    component:() => import('../views/planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout:'main'},
    component:() => import('../views/profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout:'main'},
    component:() => import('../views/record.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout:'empty'},
    component:() => import('../views/register.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes  
})

export default router
