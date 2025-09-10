<script setup lang="ts">
import type { CommunityEvent } from '@/models/event'
import { useDictionary } from '@/composables/useDictionary'
import { useUser } from '@/composables/useUser'
import { dateFormatter, wrapLinks } from '@/lib/utils'
import { eventsService } from '@/services/events'
import { Calendar, ChevronDown, MapPin } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import Button from '../ui/button/Button.vue'

const props = defineProps<{
  event: CommunityEvent
}>()
const event = ref(props.event)

const user = useUser()
const isMembersExpanded = ref(false)

const formattedDate = computed(() => dateFormatter.format(new Date(props.event.date)))

const isHost = computed(() => event.value.hosts.map(item => item.id).includes(user.value.id))
const isMember = computed(() => event.value.members.map(item => item.id).includes(user.value.id))
const isPassedEvent = computed(() => new Date(props.event.date) < new Date())

function toggleMembers() {
  isMembersExpanded.value = !isMembersExpanded.value
}

async function applyEvent(eventId: number) {
  event.value = await eventsService.applyEvent(eventId)
}
async function declineEvent(eventId: number) {
  event.value = await eventsService.declineEvent(eventId)
}

function getICS() {
  window.open(`${window.location.origin}/api/events/ics?eventId=${event.value.id}`, '_blank')
}

const { placeTypesObject } = useDictionary(['placeTypes'])
</script>

<template>
  <div class="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow flex flex-col gap-1">
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-lg font-semibold">
        {{ event.title }}
      </h3>
      <div class="space-x-2">
        <span
          class="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full"
        >
          {{ placeTypesObject[event.placeType] }}
        </span>
        <span
          v-if="event.eventType !== 'ONLINE' && !!event.customPlaceType"
          class="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full"
        >
          {{ event.customPlaceType }}
        </span>
        <Button v-if="!isPassedEvent" class="cursor-pointer" size="sm" variant="outline" @click="getICS">
          + Добавить в календарь
        </Button>
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
        <span class="text-bold">Cспикеры: </span>
        <span>{{ event.hosts.map(host => `${host.firstName} ${host.lastName}`).join(', ') }}</span>
      </div>
      <div v-if="event.videoLink">
        <span>Запись встречи:</span>
        <a :href="event.videoLink" target="_blank" class="underline">
          {{ event.videoLink }}
        </a>
      </div>
    </div>
    <div class="flex flex-col">
      <button
        class="flex items-center gap-2 text-left hover:text-primary transition-colors"
        @click="toggleMembers"
      >
        <span class="text-sm text-bold">Участники ({{ event.members.length }})</span>
        <ChevronDown
          class="w-4 h-4 transition-transform duration-200"
          :class="{ 'rotate-180': isMembersExpanded }"
        />
      </button>
      <div
        class="grid transition-all duration-200 ease-in-out"
        :class="[
          isMembersExpanded
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        ]"
      >
        <div class="overflow-hidden">
          <div class="mt-1 space-y-1 text-muted-foreground">
            <span>{{ event.members.map(member => `${member.firstName} ${member.lastName}`).join(', ') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isPassedEvent" class="self-end">
      <Button v-if="isMember" @click="declineEvent(event.id)">
        Отменить участие
      </Button>
      <Button v-if="!isMember && !isHost" @click="applyEvent(event.id)">
        Участвую!
      </Button>
    </div>
  </div>
</template>
