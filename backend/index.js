const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: false,
}));
app.use(express.json({ limit: '10kb' })); // Prevent large payloads

// Request validation middleware
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const sanitizeString = (str) => str?.trim().replace(/[<>]/g, '') || '';

// In-memory store (replace with DB in production)
let applications = [];
let applicationId = 1;

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Submit application
app.post('/api/applications', (req, res) => {
  const { fullName, email, regNumber, yearOfStudy, role, experience, motivation, linkedin, github } = req.body;

  // Validation
  const errors = {};
  if (!fullName || sanitizeString(fullName).length < 2) errors.fullName = 'Full name is required (min 2 characters)';
  if (!email || !validateEmail(email)) errors.email = 'A valid email is required';
  if (!regNumber || sanitizeString(regNumber).length < 3) errors.regNumber = 'Registration number is required';
  if (!yearOfStudy || !['1', '2', '3', '4'].includes(String(yearOfStudy))) errors.yearOfStudy = 'Valid year of study is required';
  if (!role) errors.role = 'Position is required';
  if (!experience || sanitizeString(experience).length < 20) errors.experience = 'Experience is required (min 20 characters)';
  if (!motivation || sanitizeString(motivation).length < 20) errors.motivation = 'Motivation is required (min 20 characters)';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Check for duplicate email
  const existing = applications.find(a => a.email === email.toLowerCase() && a.role === role);
  if (existing) {
    return res.status(409).json({
      success: false,
      message: 'An application with this email for this role already exists.',
    });
  }

  const application = {
    id: applicationId++,
    fullName: sanitizeString(fullName),
    email: sanitizeString(email).toLowerCase(),
    regNumber: sanitizeString(regNumber),
    yearOfStudy: String(yearOfStudy),
    role: sanitizeString(role),
    experience: sanitizeString(experience),
    motivation: sanitizeString(motivation),
    linkedin: sanitizeString(linkedin) || null,
    github: sanitizeString(github) || null,
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };

  applications.push(application);

  res.status(201).json({
    success: true,
    message: 'Application submitted successfully!',
    application: { id: application.id, fullName: application.fullName, role: application.role },
  });
});

// Get all applications (admin — in production, add auth)
app.get('/api/applications', (req, res) => {
  res.json({ success: true, count: applications.length, applications });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ AWS Cloud Club MKU Backend running on http://localhost:${PORT}`);
});
