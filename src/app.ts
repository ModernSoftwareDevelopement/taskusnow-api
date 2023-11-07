import express, { Express, Request, Response } from 'express';
import { userRouter } from './users/api/routes/userRouter';
import helmet from 'helmet';
import { profileRouter } from './users/api/routes/profileRouter';
import { reviewRouter } from './reviews/api/routes/reviewRouter';

const app: Express = express();

app.use(helmet());
app.use(express.json());

app.use(userRouter);
app.use(profileRouter);
app.use(reviewRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

export default app;
