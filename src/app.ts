import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import { setupTaskRoutes } from './Task/api/routes/taskRoutes';
import { postRouter } from './Post/api/routes/postRouter';
import { userRouter } from './users/api/routes/userRouter';
import { profileRouter } from './users/api/routes/profileRouter';

const app: Express = express();

app.use(helmet());
app.use(express.json());

//app.use('/api/user/profile', postRouter);
app.use('/api/user', userRouter);
app.use('/api/task', setupTaskRoutes());
app.use('/api/posts', postRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

export default app;
