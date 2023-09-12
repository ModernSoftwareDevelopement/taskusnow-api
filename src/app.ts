import express, { Express, Request, Response } from 'express';
import { userRouter } from './users/api/routes/userRouter';
import helmet from 'helmet';

const app: Express = express();

app.use(helmet());
app.use(express.json());

app.use(userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

export default app;
