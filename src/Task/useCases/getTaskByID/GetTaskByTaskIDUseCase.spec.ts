import { GetTaskByTaskIDUseCase } from './GetTaskByTaskIDUseCase';
import { GetTaskByTaskIDRepoInterface } from '../../repos/getTaskByTaskID/IGetTaskByTaskIDRepository';
import { GetTaskDTO } from '../../repos/dtos/GetTaskDTO';

const mockGetTaskByTaskIDRepo: GetTaskByTaskIDRepoInterface = {
  getTaskByTaskID: jest.fn(),
};

const getTaskbyTaskIDMock =
  mockGetTaskByTaskIDRepo.getTaskByTaskID as jest.Mock;

const getTaskByTaskIDUseCase = new GetTaskByTaskIDUseCase(
  mockGetTaskByTaskIDRepo,
);

describe('GetTaskByTaskIDUseCase', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return a task by task ID from the repository', async () => {
    const taskId: string = 'generatedTaskID';
    const mockTask: GetTaskDTO = {
      taskId: 'generatedTaskID',
      title: 'Task Title',
      description: 'Task Description',
      userid: 123,
    };
    getTaskbyTaskIDMock.mockResolvedValue(mockTask);

    const result = await getTaskByTaskIDUseCase.execute(taskId);

    expect(result).toEqual({
      taskId: 'generatedTaskID',
      title: 'Task Title',
      description: 'Task Description',
      userid: 123,
    });
    expect(mockGetTaskByTaskIDRepo.getTaskByTaskID).toHaveBeenCalledWith(
      taskId,
    );
  });

  it('should throw an error when the repository call fails', async () => {
    const taskId = '456';
    getTaskbyTaskIDMock.mockRejectedValue(
      new Error(`Task with ID ${taskId} not found`),
    );

    try {
      await getTaskByTaskIDUseCase.execute(taskId);
    } catch (error) {
      const typedError = error as Error;
      expect(typedError.message).toBe(`Task with ID ${taskId} not found`);
      expect(mockGetTaskByTaskIDRepo.getTaskByTaskID).toHaveBeenCalledWith(
        taskId,
      );
    }
  });
});
