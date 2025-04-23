import type { TelegramUser } from '@/services/auth'
import type { RemovableRef } from '@vueuse/core'
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

export function useUser(): RemovableRef<null | TelegramUser> {
  return useLocalStorage<TelegramUser>('tg_user', null, { serializer: { read: JSON.parse, write: JSON.stringify } })
}

export function isUserSubscribed() {
  const user = useUser()

  return computed(() => user.value?.role !== 'UNSUBSCRIBER')
}
