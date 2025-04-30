import type { Mentor, TelegramUser } from '@/models/profile'
import type { RemovableRef } from '@vueuse/core'
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

export function useUser<TUser extends TelegramUser | Mentor = TelegramUser>(): RemovableRef<null | TUser> {
  return useLocalStorage<TUser>('tg_user', null, { serializer: { read: JSON.parse, write: JSON.stringify } })
}

export function isUserSubscribed() {
  const user = useUser()

  return computed(() => user.value?.role !== 'UNSUBSCRIBER')
}

export function isUserMentor() {
  return computed(() => isMentor(useUser().value))
}

function isMentor(user: TelegramUser | Mentor): user is Mentor {
  return user.role === 'MENTOR'
}
