import { userRouter } from './userRouter';
import request from 'supertest';
import { createUserController } from '../controllers/createUser';
import app from '../../../app';
import { getUserByIdController } from '../controllers/getUserById';

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

  it('should call get user by id controller when call GET /users/:id', async () => {
    const mockExecute = jest.spyOn(getUserByIdController, 'execute');

    await request(app).get('/users/id');

    expect(mockExecute).toBeCalledTimes(1);
  });
});
