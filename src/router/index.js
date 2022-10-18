import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // props:true,
  },
  {
    path: '/graphs',
    name: 'graphs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/edit-page',
    name: 'edit-page',
    component: () => import( '../views/EditView.vue')
  },
  {
    path: '/diary',
    name: 'diary',
    component: () => import('../views/DiaryView.vue')
  },
  {
    path: '/goals',
    name: 'goals',
    component: () => import('../views/GoalsView.vue')
  },
  {
    path: '/time',
    name: 'time',
    component: ()=>import('../views/TimeStudyingView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
