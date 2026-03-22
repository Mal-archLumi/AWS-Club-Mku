# AWS Cloud Club MKU — Official Website

A production-ready web application for Mount Kenya University's AWS Student Chapter. Features a responsive landing page with team showcase, event listings, membership applications, and integrated email notifications.

**Live Demo**: [AWS Cloud Club MKU](https://awsclubmku.dev) *(deployment in progress)*

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [API Documentation](#api-documentation)
- [Email Service (Resend)](#email-service-resend)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (recommended 18+)
- npm 8+
- Git

### Development Setup (5 minutes)

```bash
# Clone the repository
git clone https://github.com/Mal-archLumi/AWS-Club-Mku.git
cd AWS-Club-Mku

# Setup frontend
cd frontend
npm install
npm start  # Opens http://localhost:3000

# In another terminal, setup backend
cd backend
npm install
npm start  # Runs on http://localhost:5000
```

---

## 📁 Project Structure

```
AWS-Club-Mku/
├── frontend/                    # React 19 application (Create React App)
│   ├── public/
│   │   ├── index.html          # Main HTML entry point
│   │   ├── images/             # Static assets (logos, team photos)
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Navbar/         # Navigation bar with AWS logo
│   │   │   ├── Hero/           # Hero section with CTA
│   │   │   ├── About/          # Feature cards
│   │   │   ├── Team/           # Team member showcase
│   │   │   ├── Events/         # Upcoming events listing
│   │   │   ├── Apply/          # Membership application form
│   │   │   ├── Contact/        # Contact info with Google Maps
│   │   │   └── Footer/         # Footer with branding
│   │   ├── data/               # Static data files
│   │   │   ├── teamMembers.js
│   │   │   ├── events.js
│   │   │   └── roles.js
│   │   ├── App.js              # Root component
│   │   ├── App.css             # Global styles
│   │   └── index.js
│   ├── package.json
│   ├── .env.local              # Local development environment (ignored by git)
│   └── .gitignore
├── backend/                     # Express.js API server
│   ├── index.js                # Main server file with routes
│   ├── package.json
│   ├── .env                    # Environment variables (ignored by git)
│   ├── .env.example            # Template for .env
│   └── .gitignore
├── SECURITY.md                 # Security policy and measures
├── README.md                   # This file
└── .gitignore
```

---

## 💻 Technology Stack

### Frontend
- **React** 19.2.4 — UI framework
- **React Scripts** 5.0.1 — Build tooling
- **CSS3** — Styling with BEM methodology
- **Testing Library** — Component testing
- **Jest** — Test runner

### Backend
- **Express.js** 5.2.1 — Web framework
- **Node.js** — JavaScript runtime
- **Resend** 6.9.4 — Transactional email service
- **Helmet** — Security HTTP headers
- **CORS** — Cross-origin resource sharing
- **express-rate-limit** — API rate limiting

### Infrastructure
- **Environment**: Node.js with `--watch` for development
- **Database**: In-memory store (production: upgrade to MongoDB/PostgreSQL)
- **Email**: Resend API for transactional emails
- **Hosting**: Ready for Vercel (frontend) + Render/Railway (backend)

---

## ✨ Features

### 🎨 Landing Page
- **Responsive Design** — Works on mobile, tablet, and desktop
- **AWS Branding** — Integrated AWS logo throughout
- **Dark Theme** — AWS-inspired color scheme

### 🧑‍💼 Team Section
- Team member cards with roles and social links
- SVG fallback avatars
- Click-to-email team members

### 📅 Events
- Upcoming events showcase
- Event date, description, and category tags
- Call-to-action buttons

### 📝 Application Form
- Multi-field form validation (client & server)
- Position selection from available roles
- XSS protection and input sanitization
- Real-time error feedback

### 📧 Email Notifications
- **Club Confirmation**: Admin receives application details
- **Applicant Confirmation**: Applicant receives acknowledgment
- **Resend Integration**: Production-ready email service
- **Test Mode**: Automatic email routing in development

### 📍 Contact Section
- Embedded Google Maps
- Clickable location link
- Email contact card
- Social media links (Twitter/X, LinkedIn)
- Hover animations

### 🔒 Security
- Helmet.js security headers
- Input validation & sanitization
- Rate limiting (5 requests/15 mins per IP)
- CORS configuration
- Environment variable protection

---

## 📦 Installation & Setup

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your backend URL:
# REACT_APP_API_URL=http://localhost:5000
```

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables:
# PORT=5000
# CLIENT_URL=http://localhost:3000
# RESEND_API_KEY=your_api_key_here
# CLUB_EMAIL=your_club_email@company.com
# NODE_ENV=development
```

#### Getting Resend API Key

1. **Sign up** at [resend.com](https://resend.com)
2. **Create API Key** in dashboard
3. **Copy key** (format: `re_xxxxxxxxxxxx`)
4. **Paste** into `backend/.env`

For development, use test email `onboarding@resend.dev` for `CLUB_EMAIL`.

---

## 🔧 Development

### Start Development Servers

**Terminal 1 — Frontend:**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
# Hot reload on file changes
```

**Terminal 2 — Backend:**
```bash
cd backend
npm start
# Runs on http://localhost:5000
# Auto-restart with nodemon
```

### Available Scripts

**Frontend:**
```bash
npm start          # Development server
npm test           # Run tests in watch mode
npm run build      # Production build
npm run eject      # Eject from CRA (one-way)
```

**Backend:**
```bash
npm start          # Start server with --watch
npm run dev        # Alternative dev mode
npm run test       # Run test suite (if configured)
```

### File Watching & Hot Reload

- **Frontend**: Automatic reload on changes (built into CRA)
- **Backend**: Automatic restart on changes via nodemon

---

## 🚢 Production Deployment

### Frontend Deployment (Vercel)

```bash
# Build production bundle
cd frontend
npm run build

# This creates optimized build in frontend/build/
# Deploy the build/ folder to Vercel
```

1. Push to GitHub
2. Connect repository to Vercel
3. Set `REACT_APP_API_URL` environment variable to production backend URL
4. Deploy automatically on push

### Backend Deployment (Render / Railway)

1. **Push code** to GitHub
2. **Connect service** to GitHub repository
3. **Set environment variables**:
   ```
   PORT=5000
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-domain.com
   RESEND_API_KEY=re_xxxxxxxxxxxx
   CLUB_EMAIL=applications@awsclubmku.com
   ```
4. **Set start command**: `npm start`
5. **Deploy** automatically on push

### Email Service Setup for Production

1. **Verify Domain** in Resend dashboard (DKIM, SPF, DMARC)
2. **Update CLUB_EMAIL** to verified domain email
3. **Set NODE_ENV=production** in backend
4. **Change applicant email** to real address (auto-routing)

---

## 📡 API Documentation

### Base URL
```
Development:  http://localhost:5000
Production:   https://api.awsclubmku.com
```

### Endpoints

#### Health Check
```
GET /api/health
```
**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-22T10:30:45.123Z"
}
```

#### Submit Application
```
POST /api/applications
```

**Rate Limit**: 5 requests per 15 minutes per IP

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "regNumber": "BCS/001/2022",
  "yearOfStudy": "2",
  "role": "Cloud Developer",
  "experience": "I have 2 years of experience with AWS services including EC2, S3, and Lambda. I'm passionate about cloud architecture.",
  "motivation": "I want to join the AWS Club to deepen my cloud knowledge, network with like-minded students, and contribute to the club's growth.",
  "linkedin": "https://linkedin.com/in/johndoe",
  "github": "https://github.com/johndoe"
}
```

**Validation Rules:**
- `fullName`: Min 2 characters
- `email`: Valid email format
- `regNumber`: Min 3 characters
- `yearOfStudy`: Must be 1, 2, 3, or 4
- `role`: Must match available roles
- `experience`: Min 20 characters
- `motivation`: Min 20 characters
- `linkedin`, `github`: Optional

**Success Response (201):**
```json
{
  "success": true,
  "applicationId": "app-1",
  "message": "Application submitted successfully! Check your email for confirmation.",
  "data": {
    "id": "app-1",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "errors": {
    "email": "A valid email is required",
    "experience": "Experience is required (min 20 characters)"
  }
}
```

**Error Response (429 - Rate Limited):**
```
Too many application submissions from this IP, please try again later.
```

---

## 📧 Email Service (Resend)

### How It Works

When an application is submitted, **two emails** are automatically sent:

#### 1. Club Confirmation Email
**To:** `CLUB_EMAIL` (club inbox)
**Subject:** New Application: John Doe
**Content:** Full application details for review

#### 2. Applicant Confirmation Email
**To:** Applicant's email address
**Subject:** AWS Cloud Club Application Received
**Content:** Thank you message with application details

### Development vs Production

| Aspect | Development | Production |
|--------|---|---|
| **Club Email To** | `onboarding@resend.dev` (Resend test inbox) | Your verified domain email |
| **Applicant Email To** | `delivered@resend.dev` (Resend test inbox) | Applicant's real email |
| **Testing** | No real emails sent | Real emails delivered |
| **Configuration** | `NODE_ENV=development` | `NODE_ENV=production` |

### Email Templates

The email templates are defined in `/backend/index.js`:

**Club Email** (lines 115-125)
**Applicant Email** (lines 130-140)

Templates use basic HTML for compatibility. To customize, edit the email objects in `index.js`.

### Troubleshooting Resend

**"Unable to fetch data" error:**
- Check API key is valid (starts with `re_`)
- Verify `RESEND_API_KEY` in `.env`
- Ensure Resend account has credits

**Emails not sent:**
- Check backend logs for `{ data: {...}, error: null }`
- Verify email addresses in `CLUB_EMAIL` and applicant email
- In development, check `delivered@resend.dev` inbox

**Domain emails not working:**
- Verify domain in Resend dashboard
- Check DNS records (DKIM, SPF, DMARC)
- Test with `onboarding@resend.dev` first

---

## 🔒 Security

Full security documentation is in [`SECURITY.md`](./SECURITY.md).

### Key Security Features

✅ **Helmet.js** — 15+ HTTP security headers  
✅ **Input Validation** — Email and string validation  
✅ **Input Sanitization** — XSS prevention  
✅ **Rate Limiting** — 5 requests/15 mins per IP  
✅ **CORS** — Restricted to frontend origin  
✅ **Environment Variables** — Secrets in `.env` (git-ignored)  
✅ **No Dependencies Vulnerabilities** — Backend audit clean  

### Reported Security Issues

If you discover a security vulnerability, please email security@awsclubmku.com instead of using the issue tracker.

---

## 🐛 Troubleshooting

### Frontend won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Backend won't connect
```bash
# Check backend is running on port 5000
lsof -i :5000

# Verify .env has CLIENT_URL set correctly
cat backend/.env | grep CLIENT_URL

# Check frontend .env.local has correct API_URL
cat frontend/.env.local | grep REACT_APP_API_URL
```

### Application form submission fails
**Error:** "Could not connect to server"
- Ensure backend is running: `cd backend && npm start`
- Check backend API URL in frontend `.env.local`
- Verify CORS is enabled (should be by default)

**Error:** "Too many requests"
- Wait 15 minutes for rate limit to reset
- Or restart backend server

### Emails not sending
**Check 1:** Resend API key
```bash
echo $RESEND_API_KEY  # Should output: re_xxxxxxxxxx
```

**Check 2:** Backend logs
```bash
# Look for: ✅ Club email sent: [ID]
# Or: ❌ Club email error: [message]
```

**Check 3:** Email inboxes (development)
- Club email: Check `onboarding@resend.dev` inbox at resend.com
- Applicant email: Check `delivered@resend.dev` inbox

---

## 🤝 Contributing

We welcome contributions! Here's how to help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Code Style

- **Frontend**: Follow React best practices, use functional components
- **Backend**: Use async/await, proper error handling
- **CSS**: BEM naming convention (`.component-name-element`)
- **Comments**: Document complex logic

---

## 📄 License

This project is licensed under the MIT License — see [`LICENSE`](./LICENSE) file for details.

---

## 👥 Team

**AWS Cloud Club MKU** is maintained by Mount Kenya University's AWS Student Chapter.

- **Captain**: [Name]
- **Vice Captain**: [Name]
- **Secretary**: [Name]
- **Treasurer**: [Name]
- **Tech Lead**: [Name]

---

## 📞 Support & Contact

- **Email**: info@awsclubmku.com
- **Location**: Mount Kenya University, Thika
- **Twitter/X**: [@AWSMku](https://x.com/AWSMku)
- **LinkedIn**: [AWS Cloud Club MKU](https://www.linkedin.com/company/aws-cloud-club-mku/)

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Resend Email API](https://resend.com/docs)
- [AWS Cloud Fundamentals](https://aws.amazon.com/getting-started/)
- [Create React App Docs](https://create-react-app.dev)

---

**Last Updated:** March 22, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅

