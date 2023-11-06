import { GetTasksUseCase } from './GetTasksUseCase';
import { GetTasksRepoInterface } from '../../repos/getTasks/IGetTasksRepository';

const mockGetTasksRepo: GetTasksRepoInterface = {
  getTasks: jest.fn(),
};

const getTasksMock = mockGetTasksRepo.getTasks as jest.Mock;

const getTasksUseCase = new GetTasksUseCase(mockGetTasksRepo);

describe('GetTasksUseCase Testing', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return tasks from the repository', async () => {
    getTasksMock.mockResolvedValue([]);

    const result = await getTasksUseCase.execute();

    expect(result.tasks).toEqual([]);
    expect(mockGetTasksRepo.getTasks).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when the repository call fails', async () => {
    getTasksMock.mockRejectedValue(new Error('Repository error'));

    try {
      await getTasksUseCase.execute();
    } catch (error) {
      const thrownError = error as Error;
      expect(thrownError.message).toBe('Repository error');
      expect(mockGetTasksRepo.getTasks).toHaveBeenCalledTimes(1);
    }
  });
});
