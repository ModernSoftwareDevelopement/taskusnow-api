import { Request, Response, Router } from 'express';
import { createUserController } from '../controllers/createUser';
import { getUserByIdController } from '../controllers/getUserById';

const userRouter = Router();

userRouter.post('/users', (req: Request, res: Response) => {
  createUserController.execute(req, res).catch();
});

userRouter.get('/users/:id', (req: Request, res: Response) => {
  getUserByIdController.execute(req, res).catch();
});

export { userRouter };
