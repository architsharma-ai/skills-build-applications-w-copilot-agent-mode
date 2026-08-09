import express from 'express';
import dbConfig from './config/database.ts';
import apiRouter from './routes/api.ts';
import apiConfig from './config/apiConfig.ts';

const app = express();
const port = apiConfig.port;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running', apiBaseUrl: apiConfig.apiBaseUrl });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', port, apiBaseUrl: apiConfig.apiBaseUrl });
});

app.listen(port, () => {
  console.log(`Backend running on ${apiConfig.apiBaseUrl}`);
  dbConfig;
});
