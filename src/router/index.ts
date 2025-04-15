import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import Home from '../pages/User.vue'
import { useMainStore } from '../store'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const store = useMainStore()

  if(!store.user) {
    store.initFromLocalStorage()
  }

  if(to.meta.requiresAuth && !store.user) {
    next('/login')
  } else {
    next()
  }
})

export default router