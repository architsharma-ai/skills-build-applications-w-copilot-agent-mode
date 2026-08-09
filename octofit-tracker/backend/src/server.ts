import express from 'express';
import mongoose from 'mongoose';
import dbConfig from './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', port });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
  dbConfig;
});
