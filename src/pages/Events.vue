<script setup lang="ts">
import type { CommunityEvent } from '@/models/event'
import EventCard from '@/components/events/EventCard.vue'
import { eventsService } from '@/services/events'
import { onMounted, ref } from 'vue'

const pastEvents = ref<CommunityEvent[]>([])
const futureEvents = ref<CommunityEvent[]>([])
async function loadEvents() {
  pastEvents.value = (await eventsService.searchOld(30, 0)).items
  futureEvents.value = (await eventsService.searchNext(30, 0)).items
}

onMounted(loadEvents)
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">
      События сообщества
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-2xl font-semibold mb-4">
          Архив событий
        </h2>
        <div v-if="pastEvents.length === 0" class="text-muted-foreground">
          Нет архивных событий
        </div>
        <div v-else class="space-y-4">
          <EventCard
            v-for="event in pastEvents"
            :key="event.id"
            :event="event"
          />
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-4">
          Предстоящие события
        </h2>
        <div v-if="futureEvents.length === 0" class="text-muted-foreground">
          Нет предстоящих событий
        </div>
        <div v-else class="space-y-4">
          <EventCard
            v-for="event in futureEvents"
            :key="event.id"
            :event="event"
          />
        </div>
      </div>
    </div>
  </div>
</template>
