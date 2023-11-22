import { InMemoryCreateReviewRepositoryImpl } from './createReview/impl/InMemoryCreateReviewRepositoryImpl';
import { InMemoryGetReviewByUserIdRepositoryImpl } from './getReviewByUserId/impl/InMemoryGetReviewByUserIdRepositoryImpl';
const createReviewRepository = new InMemoryCreateReviewRepositoryImpl();
const getReviewByUserIdRepository = new InMemoryGetReviewByUserIdRepositoryImpl();

export { createReviewRepository, getReviewByUserIdRepository };
