import { Request, Response, Router } from 'express';
import { createUserController } from '../../useCases/createUser';

const userRouter = Router();

userRouter.get('/users', (req, res) => {
  res.send('Hello World!');
});

userRouter.post('/users', (req: Request, res: Response) =>
  createUserController.execute(req, res),
);

export { userRouter };
