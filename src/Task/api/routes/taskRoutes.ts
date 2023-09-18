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
      getTasksController.execute(req, res).catch();
    }),
  );

  router.post(
    '/task',
    asyncMiddleware(async (req: Request, res: Response) => {
      createTaskController.execute(req, res).catch();
    }),
  );

  router.get(
    '/task',
    asyncMiddleware(async (req: Request, res: Response) => {
      getTaskbyTaskIDController.execute(req, res).catch();
    }),
  );
  return router;
};
