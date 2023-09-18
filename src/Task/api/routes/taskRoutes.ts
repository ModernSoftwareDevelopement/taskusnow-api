import { Router, Request, Response } from 'express';
import {
  createTaskController,
  getTasksController,
  getTaskbyTaskIDController,
} from '../controllers';
import { asyncMiddleware } from '../../../middleware/async';

export const setupTaskRoutes = () => {
  const router = Router();

  router.get(
    '/tasks',
    asyncMiddleware(async (req: Request, res: Response) => {
      await getTasksController.execute(req, res);
    }),
  );

  router.post(
    '/task',
    asyncMiddleware(async (req: Request, res: Response) => {
      await createTaskController.execute(req, res);
    }),
  );

  router.get(
    '/task',
    asyncMiddleware(async (req: Request, res: Response) => {
      await getTaskbyTaskIDController.execute(req, res);
    }),
  );
  return router;
};
