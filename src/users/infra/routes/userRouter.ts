import { Request, Response, Router } from 'express';
import { createUserController } from '../../useCases/createUser';
import { validateJwt } from '../../authService/middleware/auth0.middleware';

const userRouter = Router();

userRouter.post('/users', async (req: Request, res: Response) => createUserController.execute(req, res));

userRouter.get('/users-private', validateJwt, async (req: Request, res: Response) => {
  res.send('user private');
});

export {
  userRouter
};
