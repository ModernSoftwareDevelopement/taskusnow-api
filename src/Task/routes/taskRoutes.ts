import { Router } from 'express';
import { TaskRepository } from '../core/infra/repository/taskRepository';
import { TaskService } from '../core/infra/service/taskService';
import { InMemoryDataSource } from '../core/infra/datasource/inMemoryTask';

const router = Router();

const inMemoryDataSource = new InMemoryDataSource();

const taskRepository = new TaskRepository(inMemoryDataSource);

const taskService = new TaskService(taskRepository);


router.get('/task', (req, res) => {
  (async () => {
    try {
      const tasks = await taskService.getTasks();
      res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'An error occurred while fetching tasks.' });
    }
  })();
});

router.post('/task', (req, res) => {
  (async () => {
    try {
      const newTask = await taskService.createTask(req.body);
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating a task.' });
    }
  })();
});

export default router;
