// src/routes/api.ts
import express from 'express'
import UserController from '../modules/Users/UserController'
import ReviewController from '../modules/Reviews/ReviewController'
import UserRepositoryImpl from '../modules/Users/UserRepositoryImpl'
import ReviewRepositoryImpl from '../modules/Reviews/ReviewRepositoryImpl'
import CreateUserReview from '../modules/Reviews/usecases/CreateUserReview'
import GetUserReviews from '../modules/Reviews/usecases/GetUserReviews'
import CreateUser from '../modules/Users/usecases/CreateUser'

const router = express.Router()

const userRepository = new UserRepositoryImpl()
const reviewRepository = new ReviewRepositoryImpl()
const createUser = new CreateUser(userRepository)
const createUserReview = new CreateUserReview(reviewRepository)
const getUserReviews = new GetUserReviews(reviewRepository)

const userController = new UserController(userRepository, createUser)
const reviewController = new ReviewController(
  reviewRepository,
  createUserReview,
  getUserReviews,
)

router.post('/users', userController.createUser.bind(userController))
router.post('/reviews', reviewController.createReview.bind(reviewController))
router.get(
  '/reviews/byuserId/:userId',
  reviewController.getUserReviewsDetail.bind(reviewController),
)
// getUserReviewByUserId()

export default router
