<script setup lang="ts">
import { useUser } from '@/composables/useUser'
import { profileSiervice } from '@/services/profile'
import { Edit } from 'lucide-vue-next'
import { onMounted, reactive, ref } from 'vue'

const user = useUser()

const isEdit = ref<boolean>(false)

onMounted(() => {
  profileSiervice.getMe()
})

const editedUser = reactive({
  firstName: user.value?.firstName,
  lastName: user.value?.lastName,
  birthday: user.value?.birthday,
})

function handleSubmit() {
  profileSiervice.updateMe(editedUser)
  isEdit.value = false
}
</script>

<template>
  <div class="min-h-screen pt-20 pb-10">
    <div class="container mx-auto px-4 max-w-3xl">
      <div class="p-6 md:p-8 bg-white/60 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl">
        <div class="flex relative flex-col items-center space-y-6">
          <template v-if="user">
            <Edit class="absolute right-0 top-0 cursor-pointer text-gray-500 hover:text-gray-700" @click="isEdit = !isEdit" />
            <div class="flex justify-between">
              <div
                class="w-32 h-32 rounded-full border-4 border-white/80 shadow-md overflow-hidden flex items-center justify-center bg-purple-100 group-hover:scale-105 transition-transform"
              >
                <img :src="`https://t.me/i/userpic/160/${user.tg}.jpg`">
              </div>
            </div>
            <div class="text-center">
              <h1 v-if="!isEdit" class="text-3xl font-semibold text-gray-900">
                {{ user?.firstName }} {{ user?.lastName }}
              </h1>
              <template v-else>
                <input v-model="editedUser.firstName" type="text" placeholder="Имя" class="w-full px-4 py-2 border rounded">
                <input v-model="editedUser.lastName" type="text" placeholder="Фамилия" class="w-full px-4 py-2 border rounded mt-2">
              </template>
              <p class="text-gray-600 mb-4 mt-2">
                {{ user?.tg }}
              </p>
              <p v-if="!isEdit && !!user.birthday" class="text-gray-600 mb-4">
                Дата рождения: {{ new Date(user?.birthday).toLocaleDateString() }}
              </p>
              <template v-else-if="isEdit">
                <input v-model="editedUser.birthday" type="date" class="w-full px-4 py-2 border rounded">
              </template>
              <button v-if="isEdit" class="mt-5 px-4 py-2 bg-purple-500 text-white rounded-md cursor-pointer hover:bg-purple-600 transition duration-300 active:scale-95" @click="handleSubmit">
                Сохранить изменения
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
