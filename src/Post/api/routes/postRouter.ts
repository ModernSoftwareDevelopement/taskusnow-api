import { Router, Request, Response } from 'express';
import {
  createPostController,
  getPostByIDController,
  getAllPostsController,
} from '../controllers';

const postRouter = Router();

postRouter.get('/', (req: Request, res: Response) => {
  getAllPostsController.execute(req, res).catch();
});

postRouter.post('/', (req: Request, res: Response) => {
  createPostController.execute(req, res).catch();
});

postRouter.get('/:id', (req: Request, res: Response) => {
  getPostByIDController.execute(req, res).catch();
});

export { postRouter };
