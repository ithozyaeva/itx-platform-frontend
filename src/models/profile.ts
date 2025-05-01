export type UserRole = 'UNSUBSCRIBER' | 'SUBSCRIBER' | 'MENTOR'

export interface TelegramUser {
  id: number
  telegramID: number
  tg: string
  birthday: string
  firstName: string
  lastName: string
  role: UserRole
}

export interface Mentor extends TelegramUser {
  id: number
  occupation: string
  experience: string
  profTags: ProfTag[]
  contacts: Contacts[]
  services: Service[]
}

export interface Service {
  id: number
  name: string
  price: number
}

export interface Contacts {
  id: number
  type: number
  link: string
}

export interface ProfTag {
  id: number
  title: string
}
