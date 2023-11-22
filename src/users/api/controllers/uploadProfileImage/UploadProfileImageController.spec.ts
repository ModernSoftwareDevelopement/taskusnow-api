import { IUpdateUserRepository } from '../../../repos/updateUser/IUpdateUserRepository';
import { UpdateUserProfileUseCase } from '../../../useCases/uploadUserProfile/UpdateUserProfileUseCase';
import { UploadProfileImageController } from './UploadProfileImageController';
import { ImageUploader } from '../../../../imageService/ImageUploader';
import httpMocks from 'node-mocks-http';

const updateUserRepositoryMock: IUpdateUserRepository = {
  updateUser: jest.fn(),
};

const imageUploaderMock: ImageUploader = {
  uploadImage: jest.fn(),
};

const uploadImageMock = imageUploaderMock.uploadImage as jest.Mock;

jest.mock(
  '../../../useCases/uploadUserProfile/UpdateUserProfileUseCase',
  () => {
    const useCase = {
      execute: jest.fn(),
    };
    return {
      UpdateUserProfileUseCase: jest.fn().mockImplementation(() => useCase),
    };
  },
);

const updateUserProfileUseCase = new UpdateUserProfileUseCase(
  updateUserRepositoryMock,
);
const uploadProfileImageController = new UploadProfileImageController(
  imageUploaderMock,
  updateUserProfileUseCase,
);

const executeMock = updateUserProfileUseCase.execute as jest.Mock;

describe('UploadProfileImageController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should response Please upload a file when there is no file', async () => {
    const mockRequest = httpMocks.createRequest({});
    const mockResponse = httpMocks.createResponse();

    await uploadProfileImageController.execute(mockRequest, mockResponse);

    expect(updateUserProfileUseCase.execute).not.toHaveBeenCalled();
    expect(mockResponse.statusCode).toBe(400);
    expect(mockResponse._getJSONData()).toEqual({
      message: 'Please upload a file',
    });
  });

  it('should response Invalid user id when there is no user id', async () => {
    const mockRequest = httpMocks.createRequest({
      file: {
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
      },
    });
    const mockResponse = httpMocks.createResponse();

    await uploadProfileImageController.execute(mockRequest, mockResponse);

    expect(updateUserProfileUseCase.execute).not.toHaveBeenCalled();
    expect(mockResponse.statusCode).toBe(400);
    expect(mockResponse._getJSONData()).toEqual({
      message: 'Invalid user id',
    });
  });

  it('should response Invalid user id when there is no user found', async () => {
    const mockRequest = httpMocks.createRequest({
      file: {
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
      },
      auth: {
        payload: {
          my_api_user_id: '123',
        },
      },
    });

    const mockResponse = httpMocks.createResponse();
    uploadImageMock.mockResolvedValue('https://test.com/test.jpg');
    executeMock.mockRejectedValue(new Error('User not found'));

    await uploadProfileImageController.execute(mockRequest, mockResponse);

    expect(updateUserProfileUseCase.execute).toHaveBeenCalledWith('123', {
      imageUrl: 'https://test.com/test.jpg',
    });

    expect(mockResponse.statusCode).toBe(500);
    expect(mockResponse._getJSONData()).toEqual({
      message: 'User not found',
    });
  });

  it('should response Unexpected error when there is an error ', async () => {
    const mockRequest = httpMocks.createRequest({
      file: {
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
      },
      auth: {
        payload: {
          my_api_user_id: '123',
        },
      },
    });

    const mockResponse = httpMocks.createResponse();
    uploadImageMock.mockRejectedValue(
      new Error('Unexpected error upload file'),
    );
    executeMock.mockRejectedValue(new Error('User not found'));

    await uploadProfileImageController.execute(mockRequest, mockResponse);

    expect(updateUserProfileUseCase.execute).not.toHaveBeenCalled();
    expect(mockResponse.statusCode).toBe(500);
    expect(mockResponse._getJSONData()).toEqual({
      message: 'Unexpected error upload file',
    });
  });

  it('should update a user successfully', async () => {
    const mockRequest = httpMocks.createRequest({
      file: {
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
      },
      auth: {
        payload: {
          my_api_user_id: '123',
        },
      },
    });

    const mockResponse = httpMocks.createResponse();
    uploadImageMock.mockResolvedValue('https://test.com/test.jpg');
    executeMock.mockResolvedValue({
      id: '123',
      imageUrl: 'https://test.com/test.jpg',
    });

    await uploadProfileImageController.execute(mockRequest, mockResponse);

    expect(updateUserProfileUseCase.execute).toHaveBeenCalledWith('123', {
      imageUrl: 'https://test.com/test.jpg',
    });
    expect(mockResponse.statusCode).toBe(201);
    expect(mockResponse._getJSONData()).toEqual({
      id: '123',
      imageUrl: 'https://test.com/test.jpg',
    });
  });
});
