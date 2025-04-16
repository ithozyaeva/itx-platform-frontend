<script setup lang="ts">
import { useUser } from '@/composables/useUser'
import { authService } from '@/services/auth'
import { Code, LogOut } from 'lucide-vue-next'

const user = useUser()

function logout() {
  authService.clearAuthHeader()
  user.value = null
  window.location.pathname = '/'
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container mr-auto ml-auto px-2 flex h-16 items-center justify-between">
      <div class="flex items-center gap-2 font-bold text-xl">
        <Code class="h-6 w-6" />
        <span>IT-ХОЗЯЕВА</span>
      </div>
      <Navigation />
      <div v-if="user" class="flex items-center">
        <span class="mr-3">
          {{ `${user.firstName} ${user.lastName[0]}.` }}
        </span>
        <LogOut class="h-6 w-6 cursor-pointer" @click="logout" />
      </div>
    </div>
  </header>
</template>
