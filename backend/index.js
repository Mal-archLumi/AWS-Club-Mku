const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);
const CLUB_EMAIL = process.env.CLUB_EMAIL || 'onboarding@resend.dev'; // Use Resend test email by default

// Security: Helmet for HTTP headers
app.use(helmet());

// Rate limiting for application submissions (max 5 per 15 minutes per IP)
const applicationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'Too many application submissions from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  skip: (req) => process.env.NODE_ENV === 'development', // Skip in development
});

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

// Submit application with email notification
app.post('/api/applications', applicationLimiter, async (req, res) => {
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

  const sanitizedData = {
    fullName: sanitizeString(fullName),
    email: sanitizeString(email).toLowerCase(),
    regNumber: sanitizeString(regNumber),
    yearOfStudy: String(yearOfStudy),
    role: sanitizeString(role),
    experience: sanitizeString(experience),
    motivation: sanitizeString(motivation),
    linkedin: sanitizeString(linkedin) || null,
    github: sanitizeString(github) || null,
  };

  const application = {
    id: applicationId++,
    ...sanitizedData,
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };

  // Send email to club inbox
  try {
    console.log('📧 Sending email to club inbox:', CLUB_EMAIL);
    const { data: clubData, error: clubError } = await resend.emails.send({
      from: 'AWS Cloud Club MKU <onboarding@resend.dev>',
      to: [CLUB_EMAIL],
      replyTo: sanitizedData.email,
      subject: `New Application: ${sanitizedData.role} - ${sanitizedData.fullName}`,
      html: `
        <h2>New Leadership Application</h2>
        <p><strong>Position:</strong> ${sanitizedData.role}</p>
        <p><strong>Applicant:</strong> ${sanitizedData.fullName}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Registration Number:</strong> ${sanitizedData.regNumber}</p>
        <p><strong>Year of Study:</strong> Year ${sanitizedData.yearOfStudy}</p>
        <h3>Experience</h3>
        <p>${sanitizedData.experience}</p>
        <h3>Motivation</h3>
        <p>${sanitizedData.motivation}</p>
        ${sanitizedData.linkedin ? `<p><strong>LinkedIn:</strong> ${sanitizedData.linkedin}</p>` : ''}
        ${sanitizedData.github ? `<p><strong>GitHub:</strong> ${sanitizedData.github}</p>` : ''}
      `,
      idempotencyKey: `app-${application.id}`,
    });
    
    if (clubError) {
      console.error('❌ Club email error:', clubError);
    } else {
      console.log('✅ Club email sent:', clubData.id);
    }

    // Send confirmation email to applicant
    const applicantEmail = process.env.NODE_ENV === 'production' ? sanitizedData.email : 'delivered@resend.dev';
    console.log('📧 Sending confirmation email to:', applicantEmail);
    const { data: appData, error: appError } = await resend.emails.send({
      from: 'AWS Cloud Club MKU <onboarding@resend.dev>',
      to: [applicantEmail],
      subject: `Application Received - ${sanitizedData.role}`,
      html: `
        <h2>Application Received</h2>
        <p>Hi ${sanitizedData.fullName},</p>
        <p>Thank you for applying for the <strong>${sanitizedData.role}</strong> position at AWS Cloud Club MKU.</p>
        <p>We've received your application and will review it carefully. We typically respond within 5-7 business days.</p>
        <p>Best regards,<br>AWS Cloud Club MKU Team</p>
      `,
      idempotencyKey: `confirm-${application.id}`,
    });
    
    if (appError) {
      console.error('❌ Applicant email error:', appError);
    } else {
      console.log('✅ Applicant confirmation email sent:', appData.id);
    }

  } catch (emailError) {
    console.error('❌ Email sending error:', emailError);
    // Don't fail the application submission if email fails
    console.warn('⚠️  Application saved but email notification failed');
  }

  applications.push(application);

  res.status(201).json({
    success: true,
    message: 'Application submitted successfully! Check your email for confirmation.',
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
