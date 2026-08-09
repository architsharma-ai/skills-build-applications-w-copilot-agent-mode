import { Router } from 'express';

const router = Router();

const users = [
  { id: '1', name: 'Alex Octo', email: 'alex@octofit.app' },
  { id: '2', name: 'Sam Tracker', email: 'sam@octofit.app' }
];

const activities = [
  { id: '1', userId: '1', type: 'run', duration: 30, date: '2026-08-09' },
  { id: '2', userId: '2', type: 'yoga', duration: 45, date: '2026-08-09' }
];

router.get('/users', (req, res) => {
  res.json(users);
});

router.get('/activities', (req, res) => {
  res.json(activities);
});

export default router;
