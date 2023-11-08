import { CreateTaskUseCase } from './CreateTaskUseCase';
import { CreateTaskDTO } from '../../api/dtos/CreateTaskDTO';
import { CreateTaskRepoInterface } from './../../repos/createTask/ICreateTaskRepository';
import { ValidationError } from '../../../middleware/ValdationError';

const mockCreateTaskRepo: CreateTaskRepoInterface = {
  createTask: jest.fn(),
};

const createTaskMock = mockCreateTaskRepo.createTask as jest.Mock;

const createTaskUseCase = new CreateTaskUseCase(mockCreateTaskRepo);

describe('CreateTaskUseCase Testing', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create a task with valid task data', async () => {
    const validCreateTaskDTO: CreateTaskDTO = {
      title: 'Task Title',
      description: 'Task Description',
      userid: 123,
    };
    createTaskMock.mockResolvedValue('generatedTaskID');

    const result = await createTaskUseCase.execute(validCreateTaskDTO);

    expect(result.taskId).toEqual('generatedTaskID');
    expect(mockCreateTaskRepo.createTask).toHaveBeenCalledTimes(1);
  });

  it('should throw a ValidationError when task data is invalid for title or description', async () => {
    const invalidCreateTaskDTO: CreateTaskDTO = {
      title: '',
      description: 'Task Description',
      userid: 123,
    };
    createTaskMock.mockRejectedValue('Empty or invalid title or description');

    try {
      await createTaskUseCase.execute(invalidCreateTaskDTO);
    } catch (error) {
      const typedError = error as Error;
      expect(error).toBeInstanceOf(ValidationError);
      expect(typedError.message).toBe('Empty or invalid title or description');
      expect(mockCreateTaskRepo.createTask).not.toHaveBeenCalled();
    }
  });

  it('should throw a ValidationError when task data is invalid for useid', async () => {
    const invalidCreateTaskDTO: CreateTaskDTO = {
      title: 'Task Title',
      description: 'Task Description',
      userid: 0,
    };
    createTaskMock.mockRejectedValue('Invalid userid');

    try {
      await createTaskUseCase.execute(invalidCreateTaskDTO);
    } catch (error) {
      const typedError = error as Error;
      expect(error).toBeInstanceOf(ValidationError);
      expect(typedError.message).toBe('Invalid userid');
      expect(mockCreateTaskRepo.createTask).not.toHaveBeenCalled();
    }
  });

  it('should throw an Error when the repository call fails', async () => {
    const validCreateTaskDTO: CreateTaskDTO = {
      title: 'Task Title',
      description: 'Task Description',
      userid: 123,
    };
    createTaskMock.mockRejectedValue(
      new Error('Something went wrong. Try again!'),
    );

    try {
      await createTaskUseCase.execute(validCreateTaskDTO);
    } catch (error) {
      const typedError = error as Error;
      expect(error).not.toBeInstanceOf(ValidationError);
      expect(typedError.message).toBe('Something went wrong. Try again!');
    }
  });
});
