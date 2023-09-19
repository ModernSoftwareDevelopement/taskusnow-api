import { GetTaskByTaskIDUseCase } from '../../../useCases/getTaskByID/GetTaskByTaskIDUseCase';
import { GetTaskDTO } from './../../../repos/dtos/GetTaskDTO';
import { GetTaskbyTaskIDController } from './GetTaskbyTaskIDController';
import { GetTaskByTaskIDRepoInterface } from './../../../repos/getTaskByTaskID/IGetTaskByTaskIDRepository';
import httpMocks from 'node-mocks-http';

const mockGetTaskByTaskIDRepo: GetTaskByTaskIDRepoInterface = {
  getTaskByTaskID: jest.fn(),
};

const getTaskByTaskIDModck =
  mockGetTaskByTaskIDRepo.getTaskByTaskID as jest.Mock;

const mockGetTaskByTaskIDUseCase: GetTaskByTaskIDUseCase =
  new GetTaskByTaskIDUseCase(mockGetTaskByTaskIDRepo);

const getTaskbyTaskIDController = new GetTaskbyTaskIDController(
  mockGetTaskByTaskIDUseCase,
);

const mockResponse = httpMocks.createResponse();

describe('GetTaskbyTaskIDController Testing', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should get a task with valid taskID', async () => {
    const taskID: string = 'generatedTaskID';

    const mockRequest = httpMocks.createRequest({
      query: {
        taskId: taskID,
      },
    });

    getTaskByTaskIDModck.mockResolvedValue({
      taskId: 'generatedTaskID',
      title: 'Task Title',
      description: 'Task Description',
      userid: 123,
    } as GetTaskDTO);

    await getTaskbyTaskIDController.execute(mockRequest, mockResponse);

    expect(mockResponse.statusCode).toBe(200);
    expect(mockGetTaskByTaskIDRepo.getTaskByTaskID).toHaveBeenCalled();
    expect(mockResponse._getJSONData()).toEqual({
      taskId: 'generatedTaskID',
      title: 'Task Title',
      description: 'Task Description',
      userid: 123,
    });
  });

  it('should throw an error when something went wrong!', async () => {
    const taskID: string = 'generatedTaskID';

    const mockRequest = httpMocks.createRequest({
      query: {
        taskId: taskID,
      },
    });

    getTaskByTaskIDModck.mockRejectedValue(
      new Error('Something went wrong. Try again!'),
    );

    try {
      await getTaskbyTaskIDController.execute(mockRequest, mockResponse);
    } catch (error) {
      const typedError = error as Error;
      expect(typedError.message).toBe('Something went wrong. Try again!');
      expect(mockGetTaskByTaskIDRepo.getTaskByTaskID).toHaveBeenCalled();
    }
  });
});
