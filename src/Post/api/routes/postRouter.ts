import { Router, Request, Response } from 'express';
import { createPostController, getPostByIDController } from '../controllers';

const postRouter = Router();

postRouter.post('/', (req: Request, res: Response) => {
  createPostController.execute(req, res).catch();
});

postRouter.get('/:id', (req: Request, res: Response) => {
  getPostByIDController.execute(req, res).catch();
});

export { postRouter };
