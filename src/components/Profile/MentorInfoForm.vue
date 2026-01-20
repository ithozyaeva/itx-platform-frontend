<script setup lang="ts">
import type { Mentor } from '@/models/profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@/composables/useUser'
import { profileSiervice } from '@/services/profile'
import { Edit } from 'lucide-vue-next'
import { reactive, ref, watchEffect } from 'vue'

const user = useUser<Mentor>()
const isEdit = ref<boolean>(false)

const editedUser = reactive({
  occupation: user.value?.occupation,
  experience: user.value?.experience,
})

watchEffect(() => {
  editedUser.occupation = user.value?.occupation
  editedUser.experience = user.value?.experience
})

function handleSubmit() {
  profileSiervice.updateMentorInfo(editedUser)
  isEdit.value = false
}
</script>

<template>
  <div class="p-6 md:p-8 bg-white/60 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl w-full">
    <div class="flex relative flex-col items-center space-y-6">
      <Edit class="absolute right-0 top-0 cursor-pointer text-gray-500 hover:text-gray-700" @click="isEdit = !isEdit" />
      <div class="space-y-2 w-full mt-2">
        <Label for="occupation">Специализация</Label>
        <Input
          id="occupation"
          v-model="editedUser.occupation"
          placeholder="фронт/бек/другое"
          :readonly="!isEdit"
          max-length="255"
        />
      </div>
      <div class="space-y-2 w-full">
        <Label for="experience">Опыт работы</Label>
        <Textarea
          id="experience"
          v-model="editedUser.experience"
          placeholder="Кто Вы, где работали, кем. Желательно вкратце"
          rows="4"
          :readonly="!isEdit"
          max-length="255"
        />
      </div>
      <Button v-if="isEdit" class="mt-1 px-4 py-2 bg-purple-500 text-white rounded-md cursor-pointer hover:bg-purple-600 transition duration-300 active:scale-95" @click="handleSubmit">
        Сохранить изменения
      </Button>
    </div>
  </div>
</template>
