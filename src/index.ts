import express, { Express } from "express";
import dotenv from "dotenv";
import { setupTaskRoutes } from "./Task/routes/taskRoutes";
import { errorHandler } from "./Task/middleware/error";
import { TaskService } from "./Task/core/infra/service/taskService";
import { TaskRepository } from "./Task//core/infra/repository/taskRepository";
import { InMemoryDataSource } from "./Task//core/infra/datasource/inMemoryTask";
import helmet from 'helmet';

dotenv.config();

const inMemoryDataSource = new InMemoryDataSource();
const taskRepository = new TaskRepository(inMemoryDataSource);
const taskService = new TaskService(taskRepository);
const taskRoutes = setupTaskRoutes(taskService);

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.disable('x-powered-by');

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Express + TypeScript Server!");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use("/api", taskRoutes);

app.use(errorHandler);
