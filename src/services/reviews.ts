import ky from 'ky'

export const reviewService = {
  async createReview(text: string) {
    try {
      const response = await ky.post('/api/reviews/add', { json: text })
      return (await response.json())
    }
    catch (err) {
      console.error('Произошла ошибка', err)
    }
  },
}
