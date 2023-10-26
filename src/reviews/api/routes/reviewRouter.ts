import { Response, Router, Request } from 'express'
import { createReviewController } from '../controllers'
const reviewRouter = Router()

reviewRouter.post('/reviews', (req: Request, res: Response) => {
  createReviewController.execute(req, res).catch()
})

export { reviewRouter }
