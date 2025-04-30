import { apiClient } from './api'

export const reviewService = {
  async createReview(text: string) {
    try {
      const response = await apiClient.post('reviews/add', { json: { text } })
      return (await response.json())
    }
    catch (err) {
      console.error('Произошла ошибка', err)
    }
  },
}
