import { InMemoryCreateReviewRepository } from './createReview/impl/InMemoryCreateReviewRepository'
import { InMemoryCreateReviewRepositoryInterface } from './createReview/InMemoryCreateReviewRepositoryInterface'

const createReviewRepository = new InMemoryCreateReviewRepository()

export { createReviewRepository }
