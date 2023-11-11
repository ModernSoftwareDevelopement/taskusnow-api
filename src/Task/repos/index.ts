import { InMemoryCreateTaskRepository } from './createTask/impl/InMemoryCreateTaskRepository';
import { InMemoryGetTaskByTaskIDRepository } from './getTask/impl/InMemoryGetTaskByTaskIDRepository';
import { InMemoryGetTasksRepository } from './getTasks/impl/InMemoryGetTasksRepository';

const CreateTaskRepo = new InMemoryCreateTaskRepository();
const GetTaskRepo = new InMemoryGetTaskByTaskIDRepository();
const GetTasksRepo = new InMemoryGetTasksRepository();

export { CreateTaskRepo, GetTaskRepo, GetTasksRepo };
