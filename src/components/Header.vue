<script setup lang="ts">
import { isUserSubscribed, useUser } from '@/composables/useUser'
import { authService } from '@/services/auth'
import { reviewService } from '@/services/reviews'
import { Code, LogOut } from 'lucide-vue-next'
import { ref } from 'vue'
import ReviewModal from './ReviewModal.vue'

const user = useUser()
const isModalOpen = ref(false)
const isSubscribed = ref(isUserSubscribed())

function logout() {
  authService.clearAuthHeader()
  user.value = null
  window.location.pathname = '/'
}

async function handleSaveReview(text: string) {
  await reviewService
    .createReview(text)
    .finally(() => {
      isModalOpen.value = false
    })
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
      <div v-if="user" class="flex items-center gap-3">
        <button
          v-if="isSubscribed"
          class="cursor-pointer border border-gray-300 rounded-md px-4 py-1 hover:bg-gray-100 transition duration-300 active:scale-95"
          @click="isModalOpen = true"
        >
          Добавить отзыв
        </button>
        <span class="mr-3">
          {{ `${user.firstName} ${user.lastName[0] ?? ""}` }}
        </span>
        <LogOut class="h-6 w-6 cursor-pointer" @click="logout" />
      </div>
    </div>
  </header>

  <ReviewModal :is-open="isModalOpen" @close="isModalOpen = false" @save="handleSaveReview" />
</template>
