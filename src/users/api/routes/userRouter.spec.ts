import { userRouter } from './userRouter';
import request from 'supertest';
import { createUserController } from '../controllers/createUser';
import app from '../../../app';
import { getUserByIdController } from '../controllers/getUserById';
import dotenv from 'dotenv';

describe('User Router', () => {
  beforeAll(() => {
    dotenv.config();
    process.env.API_USERNAME = 'your_username';
    process.env.API_PASSWORD = 'your_password';
    process.env.AUTH0_AUDIENCE = 'your_audience';
  });

  afterAll(() => {
    delete process.env.API_USERNAME;
    delete process.env.API_PASSWORD;
    delete process.env.AUTH0_AUDIENCE;
  });

  it('should define a route', async () => {
    expect(userRouter).toBeDefined();
  });

  it('should call create user controller when call POST /users', async () => {
    const mockExecute = jest.spyOn(createUserController, 'execute');
    const username = 'your_username';
    const password = 'your_password';
    const authHeader =
      'Basic ' + Buffer.from(username + ':' + password).toString('base64');

    await request(app)
      .post('/users')
      .send({
        email: 'liucuxiu@gmail.com',
      })
      .set({
        'Content-Type': 'application/json',
        Authorization: authHeader,
      });

    expect(mockExecute).toBeCalledTimes(1);
  });

  it('should call get user by id controller when call GET /users/:id', async () => {
    const mockExecute = jest.spyOn(getUserByIdController, 'execute');

    await request(app).get('/users/id');

    expect(mockExecute).toBeCalledTimes(1);
  });
});
