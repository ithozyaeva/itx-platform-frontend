import ky from 'ky'

export type UserRole = 'UNSUBSCRIBER' | 'SUBSCRIBER'

export interface TelegramUser {
  id: number
  telegramID: number
  tg: string
  birthday: string
  firstName: string
  lastName: string
  role: UserRole
}

export const authService = {
  async authenticate(token: string): Promise<{ user: TelegramUser, token: string }> {
    const response = await ky.post(`/api/auth/telegram`, { json: { token } })
    return await response.json()
  },

  clearAuthHeader() {
    localStorage.removeItem('tg_token')
  },

  getBotUrl(): string {
    return `https://t.me/itx_welcome_bot?start=from_site`
  },
}
