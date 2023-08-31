// src/controllers/ReviewController.ts
import express from 'express'
import ReviewRepository from './interface/ReviewRepository'
import CreateUserReview from './usecases/CreateUserReview'
import GetUserReviews from './usecases/GetUserReviews'

class ReviewController {
  constructor(
    private reviewRepository: ReviewRepository,
    private createUserReview: CreateUserReview,
    private getUserReviews: GetUserReviews,
  ) {}

  async createReview(req: express.Request, res: express.Response) {
    const { userId, text } = req.body
    await this.createUserReview.execute(userId, text)
    res.status(201).send('Review created successfully')
  }

  async getUserReviewsDetail(req: express.Request, res: express.Response) {
    const { userId } = req.params
    const reviews = await this.getUserReviews.execute(userId)

    res.json(reviews)
  }
}

export default ReviewController
