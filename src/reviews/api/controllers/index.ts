import { CreateReviewUseCase } from '../../useCases/createReview/CreateReviewUseCase';
import { CreateReviewController } from './createReview/createReview';
import {
  createReviewRepository,
  getReviewByUserIdRepository,
} from '../../repos';
import { GetReviewByUserIdController } from './getReviewByUserId/getReviewByUserId';
import { GetReviewByUserIdUseCase } from '../../useCases/getReviewByUserId/GetReviewByUserIdUseCase';

const createReviewUseCase = new CreateReviewUseCase(createReviewRepository);
const createReviewController = new CreateReviewController(createReviewUseCase);

const getReviewUseCase = new GetReviewByUserIdUseCase(
  getReviewByUserIdRepository
);
const getReviewByUserIdController = new GetReviewByUserIdController(
  getReviewUseCase
);

export { createReviewController, getReviewByUserIdController };
