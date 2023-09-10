import { Router, Request, Response } from "express";
import { TaskService } from "../core/infra/service/taskService";
import { asyncMiddleware } from "../middleware/async";

export const setupTaskRoutes = (taskService: TaskService) => {
  const router = Router();

  router.get(
    "/tasks",
    asyncMiddleware(async (req: Request, res: Response) => {
      const tasks = await taskService.getTasks();
      res.json(tasks);
    })
  );

  router.post(
    "/task",
    asyncMiddleware(async (req: Request, res: Response) => {      
      const newTask = await taskService.createTask(req.body);
      res.status(201).json(newTask);
    })
  );

  router.get(
    "/task",
    asyncMiddleware(async (req: Request, res: Response) => {
      const taskID: string = req.query.taskID as string; 

      const task = await taskService.getTaskByTaskID(taskID);

      if (!task) {
        res.status(404).json({ error: 'Task not found' });
      }

      res.status(200).json(task);
    })
  );
  return router;
};
