import { CreateTaskUseCase } from './CreateTaskUseCase';
import { CreateTaskDTO } from '../../api/dtos/CreateTaskDTO';
import { CreateTaskRepoInterface } from './../../repos/createTask/ICreateTaskRepository';
import { ValidationError } from '../../../middleware/ValdationError';
import { SchedulingOption } from '../../domain/entity/TaskInterface';

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
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.FLEXIBLE,
      timeslot: {
        startTime: '10:00 AM',
        endTime: '12:00 PM',
      },      
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
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.FLEXIBLE,
      timeslot: {
        startTime: '10:00 AM',
        endTime: '12:00 PM',
      },     
    };
    createTaskMock.mockRejectedValue([
      { field: 'title', error: 'Title is required.' },
    ]);

    try {
      await createTaskUseCase.execute(invalidCreateTaskDTO);
    } catch (error) {
      const typedError = error as Error;
      expect(error).toBeInstanceOf(ValidationError);    
      expect(JSON.parse(typedError.message)).toEqual([
        { field: 'title', error: 'Title is required.' },
      ]);  
      expect(mockCreateTaskRepo.createTask).not.toHaveBeenCalled();
    }
  });

  it('should throw a ValidationError when task data is invalid for userId', async () => {
    const invalidCreateTaskDTO: CreateTaskDTO = {
      title: 'Task Title',
      description: 'Task Description',
      user: {
        userId: '',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.FLEXIBLE,
      timeslot: {
        startTime: '10:00 AM',
        endTime: '12:00 PM',
      },  
    };
    createTaskMock.mockRejectedValue([
      { field: 'userId', error: 'User ID is required.' },
    ]);

    try {
      await createTaskUseCase.execute(invalidCreateTaskDTO);
    } catch (error) {
      const typedError = error as Error;
      expect(error).toBeInstanceOf(ValidationError);
      expect(JSON.parse(typedError.message)).toEqual([
        { field: 'userId', error: 'User ID is required.' },
      ]);
      expect(mockCreateTaskRepo.createTask).not.toHaveBeenCalled();
    }
  });

  it('should throw an Error when the repository call fails', async () => {
    const validCreateTaskDTO: CreateTaskDTO = {
      title: 'Task Title',
      description: 'Task Description',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.FLEXIBLE,
      timeslot: {
        startTime: '10:00 AM',
        endTime: '12:00 PM',
      },  
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
