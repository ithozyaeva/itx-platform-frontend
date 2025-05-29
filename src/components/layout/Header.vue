<script setup lang="ts">
import Logo from '@/assets/it-x-logo.svg'
import { useSidebar } from '@/composables/useSidebar'
import { useUser } from '@/composables/useUser'
import { authService } from '@/services/auth'
import { LogOut } from 'lucide-vue-next'

const user = useUser()
const { toggleSidebar } = useSidebar()

function logout() {
  authService.clearAuthHeader()
  user.value = null
  window.location.pathname = '/'
}
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container mr-auto ml-auto px-2 flex h-16 items-center justify-between space-x-2">
      <button
        class="p-2 rounded-md bg-background border border-border md:hidden"
        @click="toggleSidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-6 h-6"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>
      <a href="/" class="flex items-center gap-2 font-bold text-xl">
        <img :src="Logo" class="w-20">
      </a>
      <Navigation />
      <div v-if="user" class="flex items-center gap-3">
        <span class="mr-3">
          {{ `${user.firstName} ${user.lastName[0] ?? ""}` }}
        </span>
        <LogOut class="h-6 w-6 cursor-pointer" @click="logout" />
      </div>
    </div>
  </header>
</template>
