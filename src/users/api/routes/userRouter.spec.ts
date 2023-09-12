import { userRouter } from './userRouter';
import express from 'express';
import request from 'supertest';
import { createUserController } from '../controllers';

const app = express();
app.use(express.json());
app.use(userRouter);

describe('User Router', () => {
  it('should define a route', async () => {
    expect(userRouter).toBeDefined();
  });

  it('should call create user controller when call POST /users', async () => {
    const mockExecute = jest.spyOn(createUserController, 'execute');

    await request(app).post('/users').send({
      email: 'liucuxiu@gmail.com',
    });

    expect(mockExecute).toBeCalledTimes(1);
  });
});
