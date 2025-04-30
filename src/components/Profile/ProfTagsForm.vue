<script setup lang="ts">
import type { Mentor, ProfTag } from '@/models/profile'
import type { AcceptableInputValue } from 'reka-ui'
import { Button } from '@/components/ui/button'
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/components/ui/tags-input'
import { useUser } from '@/composables/useUser'
import { profileSiervice } from '@/services/profile'
import { Edit } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'

const emit = defineEmits(['update:profTags'])
const localProfTags = ref<ProfTag[]>([...useUser<Mentor>().value?.profTags || []])
const allProfTags = ref<ProfTag[]>([])
const searchProfTag = ref('')
const openCombobox = ref(false)
const isEdit = ref<boolean>(false)

// Фильтрованные профессиональные теги
const filteredProfTags = computed(() => {
  if (!searchProfTag.value)
    return []

  return allProfTags.value.filter(tag =>
    tag.title.toLowerCase().includes(searchProfTag.value.toLowerCase())
    && !localProfTags.value.some(t => t.id === tag.id || t.title === tag.title),
  )
})

function addProfTag(newTags: AcceptableInputValue[]) {
  const uniqueTags: ProfTag[] = []
  const titleSet = new Set<string>()

  for (const tag of newTags as ProfTag[]) {
    if (!titleSet.has(tag.title)) {
      titleSet.add(tag.title)
      uniqueTags.push(tag)
    }
  }
  emit('update:profTags', uniqueTags)
  searchProfTag.value = ''
}

function pushTag(newTag: ProfTag) {
  localProfTags.value.push(newTag)
  emit('update:profTags', localProfTags.value)
}

// Удаление профессионального тега
function removeProfTag(tag: AcceptableInputValue) {
  tag = tag as ProfTag
  const index = localProfTags.value.findIndex(t => t.id === tag.id || t.title === tag.title)
  removeTag(index)
}
// Удаление тега
function removeTag(index: number) {
  const newTags = [...localProfTags.value]
  newTags.splice(index, 1)
  emit('update:profTags', newTags)
}

// Загрузка всех профессиональных тегов
async function loadProfTags() {
  try {
    const response = await profileSiervice.getAllProfTags()
    allProfTags.value = response
  }
  catch (error) {
    console.error('Ошибка при загрузке профессиональных тегов:', error)
  }
}

function render(profTag: AcceptableInputValue) {
  return (profTag as ProfTag).title
}
function convertValue(text: string) {
  return {
    title: text,
  }
}

onMounted(loadProfTags)

async function handleSubmit() {
  await profileSiervice.updateTags(localProfTags.value)
  isEdit.value = false
}
function toggleEdit() {
  localProfTags.value = [...useUser<Mentor>().value?.profTags || []]
  isEdit.value = !isEdit.value
}
</script>

<template>
  <div class="p-6 md:p-8 bg-white/60 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl h-fit">
    <div class="flex relative flex-col items-center space-y-3">
      <Edit class="absolute right-0 top-0 cursor-pointer text-gray-500 hover:text-gray-700" @click="toggleEdit" />
      <h5 class="text-2xl font-semibold text-gray-900">
        Проф теги
      </h5>
      <div class="w-full">
        <Combobox v-model="localProfTags" v-model:open="openCombobox" :ignore-filter="true">
          <ComboboxAnchor class="w-full" as-child>
            <TagsInput v-model:model-value="localProfTags" :display-value="render" :convert-value="convertValue" @update:model-value="addProfTag" @remove-tag="removeProfTag">
              <TagsInputItem v-for="item in localProfTags" :key="item.title" :value="item">
                <TagsInputItemText />
                <TagsInputItemDelete v-if="isEdit" />
              </TagsInputItem>
              <ComboboxInput v-model="searchProfTag" :readonly="!isEdit" class="w-full" as-child>
                <TagsInputInput placeholder="Теги..." :readonly="!isEdit" class="w-full box-shadow-0 p-0 shadow-none border-none focus-visible:ring-0 h-auto" />
              </ComboboxInput>
            </TagsInput>
            <ComboboxList v-if="filteredProfTags.length > 0" class="w-[--reka-popper-anchor-width]">
              <ComboboxEmpty />
              <ComboboxGroup>
                <ComboboxItem
                  v-for="profTag in filteredProfTags" :key="profTag.title" :value="profTag"
                  @select.prevent="(ev: any) => {
                    searchProfTag = ''
                    console.log(ev.detail)
                    pushTag(ev.detail.value)

                    if (filteredProfTags.length === 0) {
                      openCombobox = false
                    }
                  }"
                >
                  {{ profTag.title }}
                </ComboboxItem>
              </ComboboxGroup>
            </ComboboxList>
          </ComboboxAnchor>
        </Combobox>
      </div>
      <Button v-if="isEdit" class="mt-1 px-4 py-2 bg-purple-500 text-white rounded-md cursor-pointer hover:bg-purple-600 transition duration-300 active:scale-95" @click="handleSubmit">
        Сохранить изменения
      </Button>
    </div>
  </div>
</template>
