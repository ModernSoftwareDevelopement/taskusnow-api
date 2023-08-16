import { Router } from 'express';
import { TaskRepository } from './../core/infra/repositories/taskRepository';
import { TaskService } from './../core/infra/services/taskService';
import { InMemoryDataSource } from './../core/infra/dataSource/inMemoryTask';

const router = Router();

const inMemoryDataSource = new InMemoryDataSource();

// Create a TaskRepository instance with the ExampleDataSource
const taskRepository = new TaskRepository(inMemoryDataSource);

// Create a TaskService instance with the TaskRepository
const taskService = new TaskService(taskRepository);

// GET /task
router.get('/task', (req, res) => {
  (async () => {
    try {
      const tasks = await taskService.getTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching tasks.' });
    }
  })();
});

// POST /task
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
