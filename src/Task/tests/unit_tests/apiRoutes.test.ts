import request from 'supertest';
import express, { Express } from 'express';
import apiRoutes from '../../routes/apiRoutes'
import { TaskRepository } from '../../core/infra/repositories/taskRepository';
import { TaskService } from '../../core/infra/services/taskService';
import { InMemoryDataSource } from '../../core/infra/dataSource/inMemoryTask';

const app: Express = express();

const inMemoryDataSource = new InMemoryDataSource();
const taskRepository = new TaskRepository(inMemoryDataSource);
const taskService = new TaskService(taskRepository);

app.use(express.json());
app.use('/api', apiRoutes);

// Mocking the TaskService functions for testing
jest.mock('../../core/infra/services/taskService', () => {
  return {
    TaskService: jest.fn().mockImplementation(() => {
      return {
        getTasks: jest.fn(),
        createTask: jest.fn(),
      };
    }),
  };
});

describe('API Routes Tests', () => {
  it('responds with tasks array for GET /api/task', async () => {
    const mockTasks = "";
    const mockGetTasks = taskService.getTasks as jest.Mock;
    mockGetTasks.mockResolvedValue(mockTasks);

    const response = await request(app).get('/api/task');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(mockTasks);
  });
  
});
