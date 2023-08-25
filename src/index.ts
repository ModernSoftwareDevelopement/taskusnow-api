import express, { Express } from 'express';
import dotenv from 'dotenv';
import TaskRoutes from './Task/routes/taskRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', TaskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Express + TypeScript Server!');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});