import { Request, Response, Router } from 'express';
import { createUserController } from '../../useCases/createUser';

const userRouter = Router();

userRouter.post('/users', (req: Request, res: Response) => createUserController.execute(req, res));

export {
  userRouter
};
