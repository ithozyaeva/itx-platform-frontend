<script setup lang="ts">
import { useUser } from '@/composables/useUser'
import { Crown, Edit, User } from 'lucide-vue-next'

const user = useUser()
</script>

<template>
  <div class="min-h-screen pt-20 pb-10">
    <div class="container mx-auto px-4 max-w-3xl">
      <div class="p-6 md:p-8 bg-white/60 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl">
        <div class="flex flex-col items-center space-y-6">
          <template v-if="user">
            <div class="relative group">
              <div
                class="w-32 h-32 rounded-full border-4 border-white/80 shadow-md overflow-hidden flex items-center justify-center bg-purple-100 group-hover:scale-105 transition-transform"
              >
                <User class="w-16 h-16 text-purple-400" />
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
              <h1 class="text-3xl font-semibold text-gray-900 mb-2">
                {{ user?.firstName }} {{ user?.lastName }}
              </h1>
              <p class="text-gray-600 mb-4">
                {{ user?.username }}
              </p>
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
                <Crown class="w-5 h-5 text-purple-500" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
