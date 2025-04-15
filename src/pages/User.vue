<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { User, Crown, Edit, Settings } from 'lucide-vue-next'

interface ProfileUser {
  name: string
  subscription: string
  avatarUrl: string | null
  email: string
}

const user = ref<ProfileUser | null>(null)
const loading = ref(true)

onMounted(() => {
  // Мок запроса пользователя
  setTimeout(() => {
    user.value = {
      name: 'John Doe',
      subscription: 'Premium',
      avatarUrl: null,
      email: 'john.doe@example.com',
    }
    loading.value = false
  }, 700)
})
</script>

<template>
  <div class="min-h-screen pt-20 pb-10 bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="container mx-auto px-4 max-w-3xl">
      <div class="p-6 md:p-8 bg-white/60 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl">
        <div class="flex flex-col items-center space-y-6">
          <div v-if="loading" class="w-full flex justify-center py-16">
            <span class="text-gray-400">Загрузка...</span>
          </div>
          <template v-else>
            <div class="relative group">
              <div class="w-32 h-32 rounded-full border-4 border-white/80 shadow-md overflow-hidden flex items-center justify-center bg-purple-100 group-hover:scale-105 transition-transform">
                <template v-if="user?.avatarUrl">
                  <img :src="user.avatarUrl" :alt="user.name" class="w-full h-full object-cover" />
                </template>
                <template v-else>
                  <User class="w-16 h-16 text-purple-400" />
                </template>
              </div>
              <button 
                type="button"
                class="absolute bottom-0 right-0 rounded-full w-10 h-10 bg-white/80 hover:bg-white/90 flex items-center justify-center shadow transition-all border border-gray-200"
                aria-label="Edit avatar"
              >
                <Edit class="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div class="text-center">
              <h1 class="text-3xl font-semibold text-gray-900 mb-2">{{ user?.name }}</h1>
              <p class="text-gray-600 mb-4">{{ user?.email }}</p>
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
                <Crown class="w-5 h-5 text-purple-500" />
                <span class="text-purple-700 font-medium">{{ user?.subscription }} Subscription</span>
              </div>
            </div>
            <div class="w-full grid grid-cols-2 gap-4">
              <button type="button" class="w-full flex items-center gap-2 justify-center border border-gray-300 rounded-lg py-2 px-4 bg-white hover:bg-gray-50 transition text-gray-800">
                <Edit class="w-4 h-4" />
                Edit Profile
              </button>
              <button type="button" class="w-full flex items-center gap-2 justify-center border border-gray-300 rounded-lg py-2 px-4 bg-white hover:bg-gray-50 transition text-gray-800">
                <Settings class="w-4 h-4" />
                Manage Subscription
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
