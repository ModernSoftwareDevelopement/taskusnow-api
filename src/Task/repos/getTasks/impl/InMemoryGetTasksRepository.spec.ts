import { InMemoryGetTasksRepository } from './InMemoryGetTasksRepository';

const inMemoryGetTasksRepo: InMemoryGetTasksRepository = {
  getTasks: jest.fn(),
};

const getTasksMock = inMemoryGetTasksRepo.getTasks as jest.Mock;

describe('InMemoryGetTasksRepository Testing', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should get tasks', async () => {
    getTasksMock.mockResolvedValue([]);

    await inMemoryGetTasksRepo.getTasks();

    expect(inMemoryGetTasksRepo.getTasks).toHaveBeenCalled();
  });
});
