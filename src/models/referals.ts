import type { ProfTag, TelegramUser } from './profile'

export interface ReferalLink {
  id: number
  author: TelegramUser
  company: string
  grade: Grade
  profTags: ProfTag[]
  status: ReferalLinkStatus
  vacationsCount: number
  updatedAt: string
}

type Grade = 'senior' | 'junior' | 'middle'

type ReferalLinkStatus = 'active' | 'freezed'

export const GradeRUNames: Record<Grade, string> = {
  senior: 'Сеньор',
  junior: 'Джун',
  middle: 'Мидл',
}

export const ReferalLinkStatusNames: Record<ReferalLinkStatus, string> = {
  active: 'В поиске',
  freezed: 'Заморожен',
}
