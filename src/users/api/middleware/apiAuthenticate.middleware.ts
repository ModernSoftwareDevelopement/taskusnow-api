import { NextFunction, Request, Response } from 'express';
import config from 'config';

const apiAuthenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const token = authorization;
  const username = config.get('apiAuth.username');
  const password = config.get('apiAuth.password');

  const authHeader =
    'Basic ' + Buffer.from(username + ':' + password).toString('base64');

  if (token !== authHeader) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  next();
};

export { apiAuthenticateMiddleware };
