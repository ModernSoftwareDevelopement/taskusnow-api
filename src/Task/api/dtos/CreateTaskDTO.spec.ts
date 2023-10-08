import { CreateTaskDTO } from './CreateTaskDTO';

describe('CreateTaskDTO Testing!', () => {
  it('should create an instance of CreateTaskDTO', () => {
    const data = {
      title: 'Sample Task',
      description: 'This is a sample task',
      userid: 123,
    };

    const createTaskDTO = new CreateTaskDTO(data);

    expect(createTaskDTO).toBeDefined();
    expect(createTaskDTO.title).toEqual('Sample Task');
    expect(createTaskDTO.description).toEqual('This is a sample task');
    expect(createTaskDTO.userid).toEqual(123);
  });
});
