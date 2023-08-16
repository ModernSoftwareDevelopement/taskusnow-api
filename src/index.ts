import express, { Express } from 'express';
import dotenv from 'dotenv';
import apiRoutes from './Task/routes/apiRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});