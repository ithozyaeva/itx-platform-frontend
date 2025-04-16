<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow w-full max-w-[1440px] mx-auto">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { onMounted } from 'vue'

onMounted(() => {
  // Инициализация темы при запуске приложения
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark-theme')
  } else {
    document.documentElement.classList.remove('dark-theme')
  }
  if (!localStorage.getItem('tg_user')) {
    window.location.pathname = '/';
  }
})
</script>