import { setupTaskRoutes } from "./Task/routes/taskRoutes";
import { errorHandler } from "./Task/middleware/error";
import { TaskService } from "./Task/core/infra/service/taskService";
import { TaskRepository } from "./Task//core/infra/repository/taskRepository";
import { InMemoryDataSource } from "./Task//core/infra/datasource/inMemoryTask";
import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

const inMemoryDataSource = new InMemoryDataSource();
const taskRepository = new TaskRepository(inMemoryDataSource);
const taskService = new TaskService(taskRepository);
const taskRoutes = setupTaskRoutes(taskService);

const app: Express = express();
const port = process.env.PORT ?? 4000;

const allowedOrigins: string[] = ["http://127.0.0.1:5173/"];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.disable("x-powered-by");

app.use(cors(corsOptions));

app.use(helmet());
app.use(express.json());

app.get("/", (req, 
  res) => {
  res.send("Welcome to the Express + TypeScript Server!");
});

app.use("/api", taskRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
