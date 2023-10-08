import { GetTaskDTO } from './GetTaskDTO';

describe('GetTaskDTO Testing!', () => {
  it('should create an instance of GetTaskDTO with correct propertires', () => {
    const data = {
      title: 'Sample Task',
      description: 'This is a sample task',
      userid: 123,
    };

    const getTaskDTO = new GetTaskDTO(data);

    expect(getTaskDTO).toBeDefined();
    expect(getTaskDTO.title).toEqual('Sample Task');
    expect(getTaskDTO.description).toEqual('This is a sample task');
    expect(getTaskDTO.userid).toEqual(123);
  });
});
