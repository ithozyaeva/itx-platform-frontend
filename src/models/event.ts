import type { TelegramUser } from './profile'

export interface CommunityEvent {
  id: number
  title: string
  description: string
  date: string
  placeType: PlaceType
  place: string
  customPlaceType: string
  eventType: string
  open: boolean
  videoLink: string
  hosts: TelegramUser[]
  members: TelegramUser[]
}

export type PlaceType = 'ONLINE' | 'OFFLINE' | 'HYBRID'

export const PlaceTypeRu: Record<PlaceType, string> = {
  ONLINE: 'Онлайн',
  OFFLINE: 'Оффлайн',
  HYBRID: 'Гибрид',
}
