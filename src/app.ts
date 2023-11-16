import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import { userRouter } from './users/api/routes/userRouter';
import { profileRouter } from './users/api/routes/profileRouter';
import mongoose from 'mongoose';
import { setupTaskRoutes } from './Task/api/routes/taskRoutes';
import config from 'config';
import { reviewRouter } from './reviews/api/routes/reviewRouter';

const app: Express = express();

const mongoUri: string = config.get('database.mongo.uri');
mongoose.connect(mongoUri).then(() => {
  console.log('connected Mongo!');
});

app.use(helmet());

app.use(express.json());

app.use(userRouter);
app.use(profileRouter);
app.use('/api', setupTaskRoutes());
app.use(reviewRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

export default app;
