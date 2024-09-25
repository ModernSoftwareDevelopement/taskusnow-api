import { Request, Response, NextFunction } from 'express';
import { apiAuthenticateMiddleware } from './apiAuthenticate.middleware';
import config from 'config';

jest.mock('config');

describe('apiAuthenticateMiddleware', () => {
  beforeAll(() => {
    config.get = jest.fn().mockImplementation((key: string) => {
      if (key === 'apiAuth.username') {
        return 'liucuxiu_username';
      }
      if (key === 'apiAuth.password') {
        return 'liucuxiu_password';
      }
      return null;
    });
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
      headers: { authorization: 'InvaliDtoken' },
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
    const username = 'liucuxiu_username';
    const password = 'liucuxiu_password';
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
