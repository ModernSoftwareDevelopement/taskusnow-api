import { Router, Request, Response } from 'express';
import {
  createTaskController,
  getTasksController,
  getTaskbyTaskIDController,
} from '../controllers';

export const setupTaskRoutes = () => {
  const router = Router();

  router.get('/', (req: Request, res: Response) => {
    getTasksController.execute(req, res).catch();
  });

  router.post('/', (req: Request, res: Response) => {
    createTaskController.execute(req, res).catch();
  });

  router.get('/', (req: Request, res: Response) => {
    getTaskbyTaskIDController.execute(req, res).catch();
  });
  return router;
};
