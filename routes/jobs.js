const express = require('express');
const jwt = require('jsonwebtoken');
const Job = require('../models/Job');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.get('/', async (req, res) => {
  const jobs = await Job.findAll();
  res.json({ data: jobs });
});

router.post('/', authMiddleware, async (req, res) => {
  const job = await Job.create({ ...req.body, employerId: req.userId });
  res.status(201).json(job);
});

router.get('/:id', async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const job = await Job.findOne({ where: { id: req.params.id, employerId: req.userId } });
  if (!job) return res.status(404).json({ error: 'Job not found or unauthorized' });
  await job.update(req.body);
  res.json(job);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const job = await Job.findOne({ where: { id: req.params.id, employerId: req.userId } });
  if (!job) return res.status(404).json({ error: 'Job not found or unauthorized' });
  await job.destroy();
  res.json({ message: 'Job deleted' });
});

module.exports = router;