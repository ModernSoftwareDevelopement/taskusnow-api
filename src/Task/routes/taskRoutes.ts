import { Router, Request, Response } from "express";
import { TaskService } from "../core/infra/service/taskService";
import { asyncMiddleware } from "../middleware/async";

export const setupTaskRoutes = (taskService: TaskService) => {
  const router = Router();

  router.get(
    "/tasks",
    asyncMiddleware(async (req: Request, res: Response): Promise<void> => {
      const tasks = await taskService.getTasks();
      res.json(tasks);
    })
  );

  router.post(
    "/task",
    asyncMiddleware(async (req: Request, res: Response): Promise<void> => {
      const newTask = await taskService.createTask(req.body);
      res.status(201).json(newTask);
    })
  );

  return router;
};
