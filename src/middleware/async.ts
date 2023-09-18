import { NextFunction, Request, Response } from 'express';
import { ValidationError } from './ValdationError';

export function asyncMiddleware(
  handler: (req: Request, res: Response) => Promise<void>,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (ex) {
      if (ex instanceof ValidationError) {
        res.status(400).json({ error: 'Bad request', message: ex.message });
      } else {
        next(ex);
      }
    }
  };
}
