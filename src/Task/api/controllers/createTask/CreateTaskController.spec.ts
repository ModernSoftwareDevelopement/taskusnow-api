import { CreateTaskUseCase } from '../../../useCases/createTask/CreateTaskUseCase';
import { CreateTaskDTO } from '../../dtos/CreateTaskDTO';
import { CreateTaskController } from './CreateTaskController';
import { CreateTaskRepoInterface } from '../../../repos/createTask/ICreateTaskRepository';
import httpMocks from 'node-mocks-http';

const mockCreateTaskRepo: CreateTaskRepoInterface = {
  createTask: jest.fn(),
};

const createTaskMock = mockCreateTaskRepo.createTask as jest.Mock;

const mockCreateTaskUseCase: CreateTaskUseCase = new CreateTaskUseCase(
  mockCreateTaskRepo,
);

const createTaskController = new CreateTaskController(mockCreateTaskUseCase);

const mockResponse = httpMocks.createResponse();

describe('CreateTaskController Testing', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create a task and return its ID', async () => {
    const taskDTO: CreateTaskDTO = {
      title: 'Task Title',
      description: 'Task Description',
      userid: 123,
    };

    const mockRequest = httpMocks.createRequest({
      body: taskDTO,
    });

    createTaskMock.mockResolvedValue('generatedTaskID');

    await createTaskController.execute(mockRequest, mockResponse);

    expect(mockResponse.statusCode).toBe(201);
    expect(mockResponse._getJSONData().taskId).toEqual('generatedTaskID');
    expect(mockCreateTaskRepo.createTask).toHaveBeenCalledWith(taskDTO);
  });

  it('should throw an error when something went wrong!', async () => {
    const taskDTO: CreateTaskDTO = {
      title: 'Task Title',
      description: 'Task Description',
      userid: 123,
    };

    const mockRequest = httpMocks.createRequest({
      body: taskDTO,
    });

    createTaskMock.mockRejectedValue(
      new Error('Something went wrong. Try again!'),
    );

    try {
      await createTaskController.execute(mockRequest, mockResponse);
    } catch (error) {
      const typedError = error as Error;
      expect(typedError.message).toBe('Something went wrong. Try again!');
      expect(mockCreateTaskRepo.createTask).toHaveBeenCalled();
    }
  });
});
