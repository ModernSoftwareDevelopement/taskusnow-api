import { GetCommentsUseCase } from './GetCommentsUseCase';
import { IGetCommentsRepository } from '../../repos/getComments/IGetCommentsRepository';

const commentsRepoMock: IGetCommentsRepository = {
  getComments: jest.fn(),
};

const getCommentsMock = commentsRepoMock.getComments as jest.Mock;

const getCommentsUseCase = new GetCommentsUseCase(commentsRepoMock);

describe('GetCommentsUseCase Testing', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return comments from the repository', async () => {
    getCommentsMock.mockResolvedValue([]);

    const result = await getCommentsUseCase.execute();

    expect(result.comments).toEqual([]);
    expect(commentsRepoMock.getComments).toHaveBeenCalledTimes(1);
  });
});
