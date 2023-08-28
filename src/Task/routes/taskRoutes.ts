import { NextFunction, Request, Response, Router } from "express";
import { TaskService } from "../core/infra/service/taskService";
import ValidationError from "../middleware/ValdationError";

const router = Router();

const setupTaskRoutes = (taskService: TaskService) => {
  router.get("/tasks", (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      try {
        const tasks = await taskService.getTasks();
        res.json(tasks);
      } catch (error: unknown) {
        next(error);
      }
    })();
  });

  router.post("/task", (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      try {
        const newTask = await taskService.createTask(req.body);
        res.status(201).json(newTask);
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          res.status(400).json({ error: "Bad request", message: error.message });
        } else {
          next(error);
        }
      }
    })();
  });

  return router;
};

export default setupTaskRoutes;
