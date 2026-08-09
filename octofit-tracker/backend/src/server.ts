import cors from 'cors';
import express from 'express';
import dbConfig from './config/database.ts';
import apiRouter from './routes/api.ts';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running', apiBaseUrl });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', port, apiBaseUrl });
});

app.listen(port, () => {
  console.log(`Backend running on ${apiBaseUrl}`);
  dbConfig;
});
