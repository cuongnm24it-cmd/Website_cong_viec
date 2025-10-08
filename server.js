const express = require('express');
const sequelize = require('./db');
const User = require('./models/User');
const Job = require('./models/Job');
const Course = require('./models/Course');
const Application = require('./models/Application');
const UserSavedJobs = require('./models/UserSavedJobs');
const dotenv = require('dotenv');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads folder if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer setup for file uploads (e.g., resumes)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error('Chỉ cho phép hình ảnh và PDF'));
  }
});

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email function (made global for use in routes)
global.sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error('Email sending error:', err);
  }
};

// Connect to MySQL and sync models
(async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected successfully to skillconnect db');

    // Define associations
    User.associate({ Job, Application, Course, UserSavedJobs });
    Job.associate({ User, Application, UserSavedJobs });
    Course.associate({ User });
    Application.associate({ User, Job });
    UserSavedJobs.associate({ User, Job });

    // Sync database (use { force: true } only in development to drop and recreate tables)
    await sequelize.sync({ force: true });
    console.log('Database synced');
  } catch (err) {
    console.error('MySQL connection or sync error:', err);
    process.exit(1);
  }
})();

// Global debug middleware for all routes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('Files:', req.files);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/applications', require('./routes/applications'));

// Upload endpoint (for resumes, etc.)
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(`Error at ${req.method} ${req.url}:`, error);
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ error: `Lỗi upload file: ${error.message}` });
  }
  if (error.message === 'Chỉ cho phép hình ảnh và PDF') {
    return res.status(400).json({ error: error.message });
  }
  res.status(500).json({ error: `Lỗi server: ${error.message}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));