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

    expect(result).toEqual([]);
    expect(mockGetTasksRepo.getTasks).toHaveBeenCalledTimes(1);
  });
});
