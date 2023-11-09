import { Router, Request, Response } from 'express';
import {
  createPostController,
  getPostByIDController,
  getAllPostsController,
} from '../controllers';

const postRouter = Router();

postRouter.get('/', (res: Response) => {
  getAllPostsController.execute(res).catch();
});

postRouter.post('/', (req: Request, res: Response) => {
  createPostController.execute(req, res).catch();
});

postRouter.get('/:id', (req: Request, res: Response) => {
  getPostByIDController.execute(req, res).catch();
});

export { postRouter };
