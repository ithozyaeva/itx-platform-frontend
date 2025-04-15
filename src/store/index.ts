import { defineStore } from 'pinia'
import type { TelegramUser } from '../types/telegramUser'

interface State {
  user: TelegramUser | null
}

export const useMainStore = defineStore('main', {
  state: (): State => ({
    user: null,
  }),
  actions: {
    initFromLocalStorage() {
      const stored = localStorage.getItem('user')
      if (stored) {
        this.user = JSON.parse(stored)
      }
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
    setUser(userData: TelegramUser) {
      this.user = userData
    },
  }
})
