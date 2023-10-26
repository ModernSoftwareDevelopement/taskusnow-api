import { CreateReviewUseCase } from '../../useCases/createReview/CreateReviewUseCase'
import { CreateReviewController } from './createReview/createReview'
import { createReviewRepository } from '../../repos'

const createReviewUseCase = new CreateReviewUseCase(createReviewRepository)
const createReviewController = new CreateReviewController(createReviewUseCase)

export { createReviewController }
