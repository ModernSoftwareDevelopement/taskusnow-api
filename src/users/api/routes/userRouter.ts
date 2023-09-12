import { Request, Response, Router } from 'express';
import { createUserController } from '../controllers';

const userRouter = Router();

userRouter.post('/users', (req: Request, res: Response) => {
  createUserController.execute(req, res).catch((err: unknown) => {
    res.status(500).json({
      message: (err as Error).message, //fix this to common error message later
    });
  });
});

export { userRouter };
