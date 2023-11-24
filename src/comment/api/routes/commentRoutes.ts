import { Router, Request, Response } from 'express';
import {
  getCommentsController,
} from '../controllers';

export const setupCommentRoutes = () => {
  const router = Router();

  router.get('/comments', (req: Request, res: Response) => {
    getCommentsController.execute(req, res).catch();
  });

  return router;
};
