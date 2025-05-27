<script setup lang="ts">
import type { CommunityEvent } from '@/models/event'
import { wrapLinks } from '@/lib/utils'
import { PlaceTypeRu } from '@/models/event'
import { Calendar, MapPin, Users } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  event: CommunityEvent
}>()

const formattedDate = computed(() => {
  return new Date(props.event.date).toLocaleString()
})
</script>

<template>
  <div class="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-lg font-semibold">
        {{ event.title }}
      </h3>
      <div class="space-x-2">
        <span
          class="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full"
        >
          {{ PlaceTypeRu[event.placeType] }}
        </span>
        <span
          v-if="event.eventType !== 'ONLINE'"
          class="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full"
        >
          {{ event.customPlaceType }}
        </span>
      </div>
    </div>
    <p class="text-muted-foreground mb-4">
      {{ event.description }}
    </p>
    <div class="space-y-2 text-sm">
      <div class="flex items-center gap-2">
        <Calendar />
        <span>{{ formattedDate }}</span>
      </div>
      <div class="flex items-center gap-2">
        <MapPin />
        <span v-if="event.placeType === 'OFFLINE'">{{ event.place }}</span>
        <a v-if="event.placeType === 'ONLINE'" :href="event.place" target="_blank" class="underline">{{ event.place }}</a>
        <p v-if="event.placeType === 'HYBRID'" v-html="wrapLinks(event.place)" />
      </div>
      <div class="flex items-center gap-2">
        <Users />
        <span>{{ event.hosts.map(host => `${host.firstName} ${host.lastName}`).join(', ') }}</span>
      </div>
      <div v-if="event.videoLink">
        <span>Запись встречи:</span>
        <a :href="event.videoLink" target="_blank" class="underline">
          {{ event.videoLink }}
        </a>
      </div>
    </div>
  </div>
</template>
