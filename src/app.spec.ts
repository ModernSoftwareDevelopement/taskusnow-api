import app from './app';
import request from 'supertest'; // supertest is a library for testing HTTP assertions

describe('Server setup', () => {
  it('should start the server', async () => {
    const response = await request(app).get('/'); // You can replace '/' with a route you want to test

    // Add assertions based on your application's behavior
    expect(response.status).toBe(200);
  });
});
