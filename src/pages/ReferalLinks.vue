<script setup lang="ts">
import type { ReferalLink } from '@/models/referals'
import ReferalLinkCard from '@/components/referals/ReferalLinkCard.vue'
import ReferalLinkForm from '@/components/referals/ReferalLinkForm.vue'
import { referalLinkService } from '@/services/referals'
import { onMounted, ref } from 'vue'

const referalLinks = ref<ReferalLink[]>([])
const showAddForm = ref(false)
const totalLinks = ref(0)
const currentOffset = ref(0)
const ITEMS_PER_PAGE = 10

async function fetchReferalLinks() {
  try {
    const response = await referalLinkService.search(ITEMS_PER_PAGE, currentOffset.value)
    if (currentOffset.value === 0) {
      referalLinks.value = response.items
    }
    else {
      referalLinks.value = [...referalLinks.value, ...response.items]
    }
    totalLinks.value = response.total
  }
  catch (error) {
    console.error('Ошибка при загрузке реферальных ссылок:', error)
  }
}

async function loadMore() {
  currentOffset.value += ITEMS_PER_PAGE
  await fetchReferalLinks()
}

onMounted(() => {
  fetchReferalLinks()
})

function toggleAddForm() {
  showAddForm.value = !showAddForm.value
}

async function saveNewLink(newLink: Partial<ReferalLink>) {
  try {
    const addedLink = await referalLinkService.addLink(newLink)
    referalLinks.value.unshift(addedLink)
    showAddForm.value = false
  }
  catch (error) {
    console.error('Ошибка при добавлении реферальной ссылки:', error)
  }
}

function cancelAdd() {
  showAddForm.value = false
}

function handleLinkUpdated(updatedLink: ReferalLink) {
  const index = referalLinks.value.findIndex(link => link.id === updatedLink.id)
  if (index !== -1) {
    referalLinks.value[index] = updatedLink
  }
}

function handleLinkDeleted(deletedLinkId: number) {
  const index = referalLinks.value.findIndex(link => link.id === deletedLinkId)
  if (index !== -1) {
    referalLinks.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">
      Реферальные ссылки
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div class="bg-card rounded-lg border p-4 shadow-md ">
        <div
          v-if="!showAddForm"
          class="transition-shadow flex flex-col items-center justify-center gap-2 text-center cursor-pointer"
          style="min-height: 150px;"
          @click="toggleAddForm"
        >
          <span class="text-4xl">+</span>
          <span class="text-lg font-semibold">Добавить ссылку</span>
        </div>
        <ReferalLinkForm
          v-if="showAddForm"
          @save="saveNewLink"
          @cancel="cancelAdd"
        />
      </div>

      <ReferalLinkCard
        v-for="link in referalLinks"
        :key="link.id"
        :link="link"
        @updated="handleLinkUpdated"
        @deleted="handleLinkDeleted"
      />

      <div v-if="referalLinks.length < totalLinks" class="bg-card rounded-lg border p-4 hover:shadow-md flex justify-center atems-center cursor-pointer " @click="loadMore">
        <span variant="ghost" class="m-auto">
          Показать ещё
        </span>
      </div>
    </div>
  </div>
</template>
