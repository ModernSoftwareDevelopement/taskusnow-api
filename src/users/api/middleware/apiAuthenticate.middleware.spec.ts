import { Request, Response, NextFunction } from 'express';
import { apiAuthenticateMiddleware } from './apiAuthenticate.middleware';
import dotenv from 'dotenv';

describe('apiAuthenticateMiddleware', () => {
  beforeAll(() => {
    dotenv.config();
    process.env.API_USERNAME = 'your_username';
    process.env.API_PASSWORD = 'your_password';
  });

  afterAll(() => {
    delete process.env.API_USERNAME;
    delete process.env.API_PASSWORD;
  });
  it('should return a 401 response if the "authorization" header is missing', () => {
    const req = {
      headers: {},
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;

    apiAuthenticateMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return a 401 response if the provided token is incorrect', () => {
    const req = {
      headers: { authorization: 'InvalidToken' },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;

    apiAuthenticateMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() if the provided token is correct', () => {
    const username = 'your_username';
    const password = 'your_password';
    const authHeader =
      'Basic ' + Buffer.from(username + ':' + password).toString('base64');

    const req = {
      headers: { authorization: authHeader },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;

    apiAuthenticateMiddleware(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
