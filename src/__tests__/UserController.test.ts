// src/__tests__/UserController.test.ts
import request from 'supertest'
import app from '../server' // Make sure to export your Express app instance

describe('User API', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ id: 'user123', name: 'Test User' })

    expect(response.status).toBe(201)
    expect(response.text).toBe('User created successfully')
  })
})
