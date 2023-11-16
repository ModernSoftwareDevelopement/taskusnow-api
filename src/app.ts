import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import { userRouter } from './users/api/routes/userRouter';
import { profileRouter } from './users/api/routes/profileRouter';
<<<<<<< HEAD
import { reviewRouter } from './reviews/api/routes/reviewRouter';
=======
import mongoose from 'mongoose';
import { setupTaskRoutes } from './Task/api/routes/taskRoutes';
import config from 'config';
>>>>>>> origin/develop

const app: Express = express();

const mongoUri: string = config.get('database.mongo.uri');
mongoose.connect(mongoUri).then(() => {
  console.log('connected Mongo!');
});

app.use(helmet());

app.use(express.json());

app.use(userRouter);
app.use(profileRouter);
<<<<<<< HEAD
app.use(reviewRouter);
=======
app.use('/api', setupTaskRoutes());
>>>>>>> origin/develop

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

export default app;
