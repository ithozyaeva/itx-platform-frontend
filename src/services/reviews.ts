import axios from 'axios'

export const reviewService = {
  async createReview(text: string) {
    try {
      const response = await axios.post('/api/reviews/add', { text })
      return response.data
    }
    catch (err) {
      console.error('Произошла ошибка', err)
    }
  },
}
