const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

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
  if (!fullName || fullName.trim().length < 2) errors.fullName = 'Full name is required (min 2 characters)';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'A valid email is required';
  if (!regNumber || regNumber.trim().length < 3) errors.regNumber = 'Registration number is required';
  if (!yearOfStudy) errors.yearOfStudy = 'Year of study is required';
  if (!role) errors.role = 'Position is required';
  if (!experience || experience.trim().length < 20) errors.experience = 'Experience is required (min 20 characters)';
  if (!motivation || motivation.trim().length < 20) errors.motivation = 'Motivation is required (min 20 characters)';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Check for duplicate email
  const existing = applications.find(a => a.email === email && a.role === role);
  if (existing) {
    return res.status(409).json({
      success: false,
      message: 'An application with this email for this role already exists.',
    });
  }

  const application = {
    id: applicationId++,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    regNumber: regNumber.trim(),
    yearOfStudy,
    role,
    experience: experience.trim(),
    motivation: motivation.trim(),
    linkedin: linkedin?.trim() || null,
    github: github?.trim() || null,
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

app.listen(PORT, () => {
  console.log(`✅ AWS Cloud Club MKU Backend running on http://localhost:${PORT}`);
});
