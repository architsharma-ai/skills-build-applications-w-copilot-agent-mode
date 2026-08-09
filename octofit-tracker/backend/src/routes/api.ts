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

const leaderboard = [
  { id: '1', userId: '1', score: 1500, rank: 1 },
  { id: '2', userId: '2', score: 1200, rank: 2 }
];

const teams = [
  { id: '1', name: 'Octo Runners', members: ['1', '2'] },
  { id: '2', name: 'Core Crushers', members: ['2'] }
];

const workouts = [
  { id: '1', name: 'Morning Run', duration: 30, difficulty: 'Medium' },
  { id: '2', name: 'Yoga Flow', duration: 45, difficulty: 'Easy' }
];

router.get('/users', (req, res) => {
  res.json(users);
});

router.get('/activities', (req, res) => {
  res.json(activities);
});

router.get('/leaderboard', (req, res) => {
  res.json(leaderboard);
});

router.get('/teams', (req, res) => {
  res.json(teams);
});

router.get('/workouts', (req, res) => {
  res.json(workouts);
});

export default router;
