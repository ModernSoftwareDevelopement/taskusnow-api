import express, { Express } from 'express';
import dotenv from 'dotenv';
import TaskRoutes from './Task/routes/taskRoutes';
import errorHandler  from './Task/middleware/error';
import { TaskService } from './Task/core/infra/service/taskService';
import { TaskRepository } from './Task//core/infra/repository/taskRepository';
import { InMemoryDataSource } from './Task//core/infra/datasource/inMemoryTask';

dotenv.config();

const inMemoryDataSource = new InMemoryDataSource();
const taskRepository = new TaskRepository(inMemoryDataSource);
const taskService = new TaskService(taskRepository);
const taskRoutes = TaskRoutes(taskService);

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/api', taskRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Welcome to the Express + TypeScript Server!');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});