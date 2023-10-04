import { CreateTaskController } from './createTask/CreateTaskController';
import { GetTasksController } from './getTasks/GetTasksController';
import { GetTaskbyTaskIDController } from './getTask/GetTaskbyTaskIDController';
import { CreateTaskUseCase } from './../../useCases/createTask/CreateTaskUseCase';
import { GetTaskByTaskIDUseCase } from './../../useCases/getTaskByID/GetTaskByTaskIDUseCase';
import { GetTasksUseCase } from '../../useCases/getTasks/GetTasksUseCase';
import { CreateTaskRepo, GetTaskRepo, GetTasksRepo } from '../../repos/index';

const createTaskUseCase = new CreateTaskUseCase(CreateTaskRepo);
const getTaskByTaskIDUseCase = new GetTaskByTaskIDUseCase(GetTaskRepo);
const getTasksUseCase = new GetTasksUseCase(GetTasksRepo);

const createTaskController = new CreateTaskController(createTaskUseCase);
const getTasksController = new GetTasksController(getTasksUseCase);
const getTaskbyTaskIDController = new GetTaskbyTaskIDController(
  getTaskByTaskIDUseCase,
);

export { createTaskController, getTaskbyTaskIDController, getTasksController };
