import type { TelegramUser } from './auth'
import { useUser } from '@/composables/useUser'
import { apiClient } from './api'

const localStorageUser = useUser()

export const profileSiervice = {
  async getMe() {
    try {
      const response = await apiClient.get('members/me')
      return await response.json()
    }
    catch (err) {
      console.error('Произошла ошибка', err)
    }
  },
  async updateMe(newUser: { firstName: string, lastName: string, birthday: string }) {
    const response = await apiClient.patch('members/me', { json: newUser })
    const data = await response.json<TelegramUser>()
    localStorageUser.value = data

    return data
  },
}
