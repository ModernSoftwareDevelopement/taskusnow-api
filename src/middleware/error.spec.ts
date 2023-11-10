import { Request, Response } from 'express';
import { errorHandler } from './error';

describe('Error Handler Test', () => {
  it('should log the error and send a response', () => {
    const req = {} as Request;
    const res = {
      statusCode: 500,
      status: jest.fn(function (code) {
        this.statusCode = code;
        return this;
      }),
      send: jest.fn(),
    } as unknown as Response;

    const simulatedError = new Error('Test error message');

    errorHandler(simulatedError, req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Something went wrong.');
  });
});
