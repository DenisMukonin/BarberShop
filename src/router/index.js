import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('../views/Clients'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/client/:id',
    name: 'Client',
    component: () => import('../views/Client'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/record-info',
    name: 'RecordInfo',
    component: () => import('../views/RecordInfo'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
    meta: {
      layout: 'empty',
      auth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register'),
    meta: {
      layout: 'empty',
      auth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
