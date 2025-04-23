import axios from 'axios'

export type UserRole = 'UNSUBSCRIBER' | 'SUBSCRIBER'

export interface TelegramUser {
  id: number
  telegramID: number
  tg: string
  firstName: string
  lastName: string
  role: UserRole
}

export const authService = {
  async authenticate(token: string): Promise<{ user: TelegramUser, token: string }> {
    const response = await axios.post(`/api/auth/telegram`, { token })
    return response.data
  },

  setAuthHeader(authToken: string) {
    axios.defaults.headers.common['X-Telegram-User-Token'] = authToken
  },

  clearAuthHeader() {
    delete axios.defaults.headers.common['X-Telegram-User-Token']
  },

  getBotUrl(): string {
    return `https://t.me/itx_welcome_bot?start=from_site`
  },
}
