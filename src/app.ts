import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import { setupTaskRoutes } from './Task/api/routes/taskRoutes';
import { postRouter } from './Post/api/routes/postRouter';

const app: Express = express();

app.use(helmet());
app.use(express.json());

app.use('/api/task', setupTaskRoutes());
app.use('/api/posts', postRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

export default app;
