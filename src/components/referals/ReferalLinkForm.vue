<script setup lang="ts">
import type { ReferalLink } from '@/models/referals'
import ProfTagsInput from '@/components/common/ProfTagsInput.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GradeRUNames } from '@/models/referals'
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object as () => Partial<ReferalLink>,
    required: true,
  },
  title: {
    type: String,
    default: 'Новая реферальная ссылка',
  },
})

const emit = defineEmits(['update:modelValue', 'save', 'cancel'])

const formData = ref<Partial<ReferalLink>>({
  company: props.modelValue.company || '',
  grade: props.modelValue.grade || 'junior',
  profTags: props.modelValue.profTags || [],
  vacationsCount: props.modelValue.vacationsCount || 0,
})

watch(() => props.modelValue, (newValue) => {
  formData.value = {
    company: newValue.company || '',
    grade: newValue.grade || 'junior',
    profTags: newValue.profTags || [],
    vacationsCount: newValue.vacationsCount || 1,
  }
}, { deep: true })

watch(formData, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })

function handleSave() {
  emit('save', formData.value)
}

function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <div class="flex flex-col gap-4" style="min-height: 150px;">
    <h3 class="text-lg font-semibold">
      {{ title }}
    </h3>
    <div class="flex flex-col gap-2">
      <div>
        <Label for="company" class="block text-sm font-medium text-muted-foreground">Компания</Label>
        <Input id="company" v-model="formData.company" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div>
        <Label for="grade" class="block text-sm font-medium text-muted-foreground">Грейд</Label>
        <Select id="grade" v-model="formData.grade" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <SelectTrigger>
            <SelectValue placeholder="Выберите грейд" />
          </SelectTrigger>
          <SelectContent class="w-full">
            <SelectItem value="senior">
              {{ GradeRUNames.senior }}
            </SelectItem>
            <SelectItem value="middle">
              {{ GradeRUNames.middle }}
            </SelectItem>
            <SelectItem value="junior">
              {{ GradeRUNames.junior }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label class="block text-sm font-medium text-muted-foreground">Навыки</Label>
        <ProfTagsInput v-model="formData.profTags" />
      </div>
      <div>
        <Label for="vacations" class="block text-sm font-medium text-muted-foreground">Количество вакансий</Label>
        <Input id="vacations" v-model.number="formData.vacationsCount" type="number" min="1" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
    </div>
    <div class="flex justify-end gap-2 mt-4">
      <Button class="px-4 py-2 border rounded-md text-sm font-medium" @click="handleCancel">
        Отменить
      </Button>
      <Button class="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium" @click="handleSave">
        Сохранить
      </Button>
    </div>
  </div>
</template>
