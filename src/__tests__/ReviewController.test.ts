// src/__tests__/ReviewController.test.ts
import request from 'supertest'
import app from '../server' // Make sure to export your Express app instance

describe('Review API', () => {
  it('should create a new review', async () => {
    const response = await request(app)
      .post('/api/reviews')
      .send({ userId: 'user123', text: 'Great review!' })

    expect(response.status).toBe(201)
    expect(response.text).toBe('Review created successfully')
  })
})
