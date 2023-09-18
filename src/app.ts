import express, { Express, Request, Response } from 'express';
import { setupTaskRoutes } from './Task/api/routes/taskRoutes';
import helmet from 'helmet';

const app: Express = express();

app.use(helmet());
app.use(express.json());

app.use('/api', setupTaskRoutes());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

export default app;
