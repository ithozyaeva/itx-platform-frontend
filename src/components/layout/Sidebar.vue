<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/composables/useSidebar'
import { isUserSubscribed } from '@/composables/useUser'
import { reviewService } from '@/services/reviews'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReviewModal from '../ReviewModal.vue'

const { sidebarItems, isOpen, toggleSidebar } = useSidebar()
const route = useRoute()
const router = useRouter()

function navigateTo(path: string) {
  router.push(path)
  isOpen.value = false
}

const isModalOpen = ref(false)
const isSubscribed = isUserSubscribed()

async function handleSaveReview(text: string) {
  await reviewService
    .createReview(text)
    .finally(() => {
      isModalOpen.value = false
    })
}
</script>

<template>
  <div>
    <div
      class="fixed md:static h-screen border-r border-gray-200 transition-all duration-300 w-full md:w-52 bg-background z-40"
      :class="[
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <div class="flex flex-col justify-between items-center pb-2 h-full">
        <div class="w-full">
          <div class="flex items-center justify-between p-4 md:hidden">
            <h2 class="text-lg font-semibold">
              Меню
            </h2>
            <button class="p-2" @click="toggleSidebar">
              <X class="w-6 h-6" />
            </button>
          </div>
          <div class="flex-1 overflow-y-auto py-4">
            <ul class="space-y-2">
              <li v-for="item in sidebarItems" :key="item.path">
                <Button
                  variant="ghost"
                  class="w-full justify-start py-2 cursor-pointer"
                  :class="[
                    route.path.startsWith(item.path) ? 'bg-accent' : '',
                  ]"
                  @click="navigateTo(item.path)"
                >
                  <component :is="item.icon" class="h-5 w-5 mr-2" />
                  <span>{{ item.title }}</span>
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <button
          v-if="isSubscribed"
          class="cursor-pointer border border-gray-300 rounded-md px-4 py-1 hover:bg-gray-100 transition duration-300 active:scale-95"
          @click="isModalOpen = true"
        >
          Добавить отзыв
        </button>
      </div>
    </div>
    <ReviewModal :is-open="isModalOpen" @close="isModalOpen = false" @save="handleSaveReview" />
  </div>
</template>
