import { Response, Router, Request } from 'express';
import { createReviewController } from '../controllers';
import { getReviewByUserIdController } from '../controllers';
const reviewRouter = Router();

reviewRouter.post('/reviews', (req: Request, res: Response) => {
  createReviewController.execute(req, res).catch();
});

reviewRouter.get('/reviews/users/:userId', (req: Request, res: Response) => {
  getReviewByUserIdController.execute(req, res).catch();
});
export { reviewRouter };
