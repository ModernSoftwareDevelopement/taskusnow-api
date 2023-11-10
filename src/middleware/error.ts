import { Request, Response } from 'express';
import winston from 'winston';

const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

export const errorHandler = function (err: Error, req: Request, res: Response) {
  errorLogger.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(res.statusCode).send('Something went wrong.');
};
