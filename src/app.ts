import express, { Express, Request, Response } from 'express';
import { userRouter } from './users/api/routes/userRouter';

const app: Express = express();

app.use(express.json());

app.use(userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

export default app;
