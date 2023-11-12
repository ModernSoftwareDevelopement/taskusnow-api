import app from './app';
import dotenv from 'dotenv';
import config from 'config';

dotenv.config();

const port = config.get('app.port');

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
