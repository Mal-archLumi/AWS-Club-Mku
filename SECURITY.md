# Security Policy

## Overview

This document outlines the security measures and best practices implemented in the AWS Cloud Club MKU website project.

## Security Features

### 1. Environment Variables Protection
- **Private Secrets**: Sensitive data (API keys, secrets) stored in `.env` files
- **Git Protection**: All `.env` files are in `.gitignore` to prevent accidental commits
- **Template Files**: `.env.example` files provide templates for configuration
- **Git History Cleaned**: Removed `.env` files from entire git history using `git filter-branch`

### 2. Backend Security (Express.js)

#### Helmet.js Middleware
- Implements 15+ security HTTP headers
- Prevents clickjacking attacks (X-Frame-Options)
- Enables XSS protection (X-XSS-Protection)
- Enforces strict Content-Security-Policy
- See: `/backend/index.js` line 17

#### Input Validation & Sanitization
- Email validation via regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- String sanitization: Removes `<>` characters to prevent XSS
- Minimum length validation (2-20 characters per field)
- Valid year of study (1-4) enumeration
- See: `/backend/index.js` lines 27-30

#### Rate Limiting
- Max 5 requests per 15 minutes per IP address
- Applies to `/api/applications` endpoint
- Prevents spam and brute force attacks
- Disabled in development for testing
- See: `/backend/index.js` lines 19-27

#### CORS Configuration
- Restricted to configured frontend origin only
- Methods limited to GET and POST
- No credentials allowed
- See: `/backend/index.js` line 33

#### Payload Size Limiting
- Maximum 10KB request body size
- Prevents memory exhaustion attacks
- See: `/backend/index.js` line 36

#### Email Idempotency
- Prevents duplicate email sends
- Uses idempotency keys with application ID
- See: `/backend/index.js` lines 120-122

#### Duplicate Prevention
- Checks for existing applications per email + role combination
- Prevents database pollution
- See: `/backend/index.js` lines 90-97

### 3. Frontend Security (React)

#### Content-Security-Policy
- Configured in `public/index.html`
- Restricts script, style, font, and image sources
- Prevents injection attacks
- See: `/frontend/public/index.html` lines 5-10

#### Environment Variables
- `REACT_APP_API_URL` for backend communication
- Never expose sensitive data in client-side code
- See: `frontend/.env.local` (in .gitignore)

#### Form Validation
- Client-side validation before submission
- Error messages displayed to users
- See: `/frontend/src/components/Apply/Apply.js`

#### Secure External Links
- Google Maps embedded with iframe sandbox
- Social media links open in new tabs with `rel="noopener noreferrer"`
- Prevents referrer policy leaks
- See: `/frontend/src/components/Contact/Contact.js`

### 4. Dependency Management

#### Frontend Vulnerabilities
- 26 minor vulnerabilities in dev/build tools (react-scripts dependencies)
- **Not production risks** - only affect build process
- Production build is minified and doesn't include build tools
- Run `npm audit` periodically to monitor updates

#### Backend Vulnerabilities
- **Zero vulnerabilities** in production dependencies
- All core packages (express, cors, dotenv, resend, helmet, rate-limit) are secure
- See: `npm audit` output

### 5. Email Service Security (Resend)

#### Test vs Production Mode
- **Development**: Uses Resend test domains (`onboarding@resend.dev`, `delivered@resend.dev`)
- **Production**: Uses verified custom domain (`NODE_ENV=production`)
- Prevents test emails from reaching real users during development

#### API Key Protection
- Stored only in `.env` (never in code)
- Not exposed in environment variables passed to frontend
- Rotated regularly on production
- See: `.env.example` for setup

#### Verified Domain Requirement
- Production emails require verified domain in Resend console
- Additional DKIM/SPF/DMARC configuration needed
- See: https://resend.com/docs/dashboard/domains

### 6. API Endpoints

#### Health Check
- `GET /api/health` - No authentication required (monitoring)
- Returns status and timestamp

#### Applications Submission
- `POST /api/applications` - Protected by rate limiting
- Validates all fields
- Sanitizes input
- Sends confirmation emails to both club and applicant
- Returns 201 (Created) on success

#### Unimplemented
- No authentication/authorization system yet
- All endpoints are public
- Prepare authentication middleware before production

## Production Deployment Checklist

- [ ] Set `NODE_ENV=production` in backend `.env`
- [ ] Update `CLIENT_URL` to production domain
- [ ] Update `CLUB_EMAIL` to verified custom domain email
- [ ] Verify domain in Resend console (DKIM, SPF, DMARC)
- [ ] Update CSP headers in `public/index.html` for production domain
- [ ] Run `npm audit` on both frontend and backend
- [ ] Test form submission with rate limiting
- [ ] Test emails to real addresses (using production mode)
- [ ] Enable HTTPS only in production
- [ ] Set secure environment variables in hosting platform
- [ ] Review helmet.js defaults for compliance needs
- [ ] Monitor error logs for suspicious activity

## Vulnerability Reporting

If you discover a security vulnerability, please email **security@awsclubmku.local** with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

**Do not** publicly disclose vulnerabilities before we have time to address them.

## Regular Security Audits

- Run `npm audit` monthly on both frontend and backend
- Keep dependencies updated to latest secure versions
- Review `.gitignore` files quarterly
- Check git history for accidental secret commits
- Monitor Resend API for suspicious activity

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [Helmet.js Documentation](https://helmetjs.github.io/)
- [Resend Documentation](https://resend.com/docs)

---

Last Updated: 2026-03-22
