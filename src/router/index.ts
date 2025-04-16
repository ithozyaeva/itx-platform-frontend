import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/User.vue'
import { useMainStore } from '../store'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const store = useMainStore()

  if (!store.user) {
    store.initFromLocalStorage()
  }

  if (to.meta.requiresAuth && !store.user) {
    next('/login')
  }
  else {
    next()
  }
})

export default router
