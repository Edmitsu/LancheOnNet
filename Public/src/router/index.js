import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/retirada',
    name: 'Retirada_pedidos',
    component: () => import(/* webpackChunkName: "Combos" */ '../views/Retirada_pedidos.vue')
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Pedidos" */ '../views/Pedidos.vue')
  },
  {
    path: '/combos',
    name: 'Combos',
    component: () => import(/* webpackChunkName: "Combos" */ '../views/Combos.vue')
  },
  {
    path: '/porções',
    name: 'Porções',
    component: () => import(/* webpackChunkName: "Porções" */ '../views/Porções.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
