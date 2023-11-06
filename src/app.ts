import express, { Express, Request, Response } from 'express';
import { userRouter } from './users/api/routes/userRouter';
import helmet from 'helmet';
import cors from 'cors';
import { profileRouter } from './users/api/routes/profileRouter';
import mongoose from 'mongoose';

const app: Express = express();

const mongoUri: string = 'mongodb://localhost:27017/taskusnow';
mongoose.connect(mongoUri).then(() => {
  console.log('connected Mongo!');
});

app.use(helmet());

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(profileRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

export default app;
