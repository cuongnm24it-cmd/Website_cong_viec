const express = require('express');
const jwt = require('jsonwebtoken');
const Course = require('../models/Course');

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
  const courses = await Course.findAll();
  res.json({ data: courses });
});

router.post('/', authMiddleware, async (req, res) => {
  const course = await Course.create({ ...req.body, creatorId: req.userId });
  res.status(201).json(course);
});

router.get('/:id', async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const course = await Course.findOne({ where: { id: req.params.id, creatorId: req.userId } });
  if (!course) return res.status(404).json({ error: 'Course not found or unauthorized' });
  await course.update(req.body);
  res.json(course);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const course = await Course.findOne({ where: { id: req.params.id, creatorId: req.userId } });
  if (!course) return res.status(404).json({ error: 'Course not found or unauthorized' });
  await course.destroy();
  res.json({ message: 'Course deleted' });
});

module.exports = router;