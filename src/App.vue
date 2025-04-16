<script setup lang="ts">
import Header from '@/components/Header.vue'
import { useUser } from '@/composables/useUser'
import { authService } from '@/services/auth'
import { onMounted } from 'vue'

const tg_user = useUser()

onMounted(() => {
  // Инициализация темы при запуске приложения
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark-theme')
  }
  else {
    document.documentElement.classList.remove('dark-theme')
  }

  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')
  if (token) {
    authService
      .authenticate(token)
      .then(({ user, token: authToken }) => {
        tg_user.value = user
        authService.setAuthHeader(authToken)
        window.history.replaceState({}, document.title, window.location.pathname)
      })
      .catch((error) => {
        console.error('Authentication failed:', error)
      })
  }
  else if (!tg_user.value) {
    window.location.pathname = '/'
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow w-full max-w-[1440px] mx-auto">
      <router-view />
    </main>
  </div>
</template>
