const express = require('express');
const jwt = require('jsonwebtoken');
const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

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

router.post('/', authMiddleware, upload.single('resume'), async (req, res) => {
  const { jobId, coverLetter, notes } = req.body;
  const resumeUrl = req.file ? `/uploads/${req.file.filename}` : '';

  if (!jobId) {
    return res.status(400).json({ error: 'jobId is required' });
  }

  const application = await Application.create({
    jobId,
    candidateId: req.userId,
    coverLetter,
    resumeUrl,
    notes,
  });

  await Job.increment('applicants', { where: { id: jobId } });

  const job = await Job.findByPk(jobId, { include: [{ model: User, as: 'employer' }] });
  if (job && job.employer && job.employer.email) {
    await global.sendEmail(
      job.employer.email,
      'New Application Received',
      `A new application for ${job.title} from candidate ID: ${req.userId}.`
    );
  }

  res.status(201).json(application);
});

router.get('/', authMiddleware, async (req, res) => {
  const user = await User.findByPk(req.userId);
  let applications;
  if (user.userType === 'candidate') {
    applications = await Application.findAll({
      where: { candidateId: req.userId },
      include: [{ model: Job, as: 'job' }],
    });
  } else if (user.userType === 'employer') {
    const jobs = await Job.findAll({ where: { employerId: req.userId } });
    const jobIds = jobs.map(j => j.id);
    applications = await Application.findAll({
      where: { jobId: jobIds },
      include: [
        { model: User, as: 'candidate' },
        { model: Job, as: 'job' },
      ],
    });
  } else {
    return res.status(400).json({ error: 'Invalid user type' });
  }
  res.json({ data: applications });
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { status, interviewDate } = req.body;
  const app = await Application.findByPk(req.params.id, { include: [{ model: Job, as: 'job' }] });
  if (!app || app.job.employerId !== req.userId) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }
  await app.update({ status, interviewDate });

  const candidate = await User.findByPk(app.candidateId);
  if (candidate && candidate.email) {
    await global.sendEmail(
      candidate.email,
      'Application Update',
      `Your application for ${app.job.title} is now ${status}.`
    );
  }

  res.json(app);
});

module.exports = router;