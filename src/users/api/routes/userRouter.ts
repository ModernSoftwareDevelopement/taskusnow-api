import { Request, Response, Router } from 'express';
import { createUserController } from '../controllers';

const userRouter = Router();

userRouter.post('/users', (req: Request, res: Response) => {
  createUserController.execute(req, res).catch();
});

export { userRouter };
