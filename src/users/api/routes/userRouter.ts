import { Request, Response, Router } from 'express';
import { createUserController } from '../controllers/createUser';
import { getUserByIdController } from '../controllers/getUserById';
import { apiAuthenticateMiddleware } from '../middleware/apiAuthenticate.middleware';

const userRouter = Router();

userRouter.post(
  '/users',
  apiAuthenticateMiddleware,
  (req: Request, res: Response) => {
    createUserController.execute(req, res).catch();
  },
);

userRouter.get('/users/:id', (req: Request, res: Response) => {
  getUserByIdController.execute(req, res).catch();
});

export { userRouter };
