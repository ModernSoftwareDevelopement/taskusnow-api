import { GetTasksUseCase } from '../../../useCases/getTasks/GetTasksUseCase';
import { GetTaskDTO } from '../../../repos/dtos/GetTaskDTO';
import { GetTasksController } from './GetTasksController';
import { GetTasksRepoInterface } from '../../../repos/getTasks/IGetTasksRepository';
import httpMocks from 'node-mocks-http';

const mockGetTasksRepo: GetTasksRepoInterface = {
  getTasks: jest.fn(),
};

const getTasksMock = mockGetTasksRepo.getTasks as jest.Mock;

const modckGetTasksUseCase: GetTasksUseCase = new GetTasksUseCase(
  mockGetTasksRepo,
);

const getTasksController = new GetTasksController(modckGetTasksUseCase);

const mockResponse = httpMocks.createResponse();

describe('GetTasksController Testing', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should get array of tasks', async () => {
    const mockTasks = {
      tasks: [
        {
          taskId: 'generatedTaskID',
          title: 'Task Title',
          description: 'Task Description',
          userid: 123,
        },
      ],
    };

    const mockRequest = httpMocks.createRequest();

    getTasksMock.mockResolvedValue(mockTasks);

    await getTasksController.execute(mockRequest, mockResponse);

    expect(mockResponse.statusCode).toBe(200);
    expect(mockGetTasksRepo.getTasks).toHaveBeenCalled();
  });

  it('should throw an error when something went wrong!', async () => {
    const mockRequest = httpMocks.createRequest();

    getTasksMock.mockRejectedValue(
      new Error('Something went wrong. Try again!'),
    );

    try {
      await getTasksController.execute(mockRequest, mockResponse);
    } catch (error) {
      const typedError = error as Error;
      expect(typedError.message).toBe('Something went wrong. Try again!');
      expect(mockGetTasksRepo.getTasks).toHaveBeenCalled();
    }
  });
});
