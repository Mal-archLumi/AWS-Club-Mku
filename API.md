# API Documentation

## Overview

The AWS Cloud Club MKU API is a RESTful backend built with Express.js that handles membership applications, email notifications, and health checks.

**Base URL:**
- Development: `http://localhost:5000`
- Production: `https://api.awsclubmku.com` (to be configured)

---

## Authentication & Security

### CORS Configuration

The API enforces Cross-Origin Resource Sharing (CORS) to prevent unauthorized requests:

```
Allowed Origins: Configured via CLIENT_URL environment variable
Allowed Methods: GET, POST
Credentials: Disabled
```

### Rate Limiting

- **Endpoint:** `/api/applications` (POST)
- **Limit:** 5 requests per 15 minutes per IP address
- **Status Code:** 429 (Too Many Requests)
- **Development:** Disabled for testing

### Headers Security (Helmet.js)

All responses include security headers:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
```

---

## Endpoints

### 1. Health Check

**Endpoint:**
```
GET /api/health
```

**Purpose:**
Verify API is running and responsive. Useful for monitoring and deployment health checks.

**Request:**
```bash
curl http://localhost:5000/api/health
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2026-03-22T10:30:45.123Z"
}
```

**Use Cases:**
- Uptime monitoring
- Load balancer health checks
- Deployment verification

---

### 2. Submit Application

**Endpoint:**
```
POST /api/applications
```

**Purpose:**
Submit a membership application with automatic email notifications sent to both the club and applicant.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "regNumber": "BCS/001/2022",
  "yearOfStudy": "2",
  "role": "Cloud Developer",
  "experience": "I have 2 years of experience with AWS services including EC2, S3, and Lambda. I'm passionate about cloud architecture and best practices.",
  "motivation": "I want to join the AWS Club to deepen my cloud knowledge, network with like-minded students, and contribute to the club's growth and activities.",
  "linkedin": "https://linkedin.com/in/johndoe",
  "github": "https://github.com/johndoe"
}
```

#### Field Specifications

| Field | Type | Required | Rules | Example |
|-------|------|----------|-------|---------|
| `fullName` | String | Yes | Min 2 chars, Max 100 chars | "John Doe" |
| `email` | String | Yes | Valid email format | "john@example.com" |
| `regNumber` | String | Yes | Min 3 chars, Max 50 chars | "BCS/001/2022" |
| `yearOfStudy` | String | Yes | Must be "1", "2", "3", or "4" | "2" |
| `role` | String | Yes | Must match available role | "Cloud Developer" |
| `experience` | String | Yes | Min 20 chars, Max 1000 chars | "I have 2 years..." |
| `motivation` | String | Yes | Min 20 chars, Max 1000 chars | "I want to join..." |
| `linkedin` | String | No | Valid URL format | "https://linkedin.com/..." |
| `github` | String | No | Valid URL format | "https://github.com/..." |

#### Available Roles

Roles are defined in `/backend/index.js`. Common roles include:
- Cloud Developer
- DevOps Engineer
- Solutions Architect
- Cloud Security Specialist
- Data Engineer
- UI/UX Designer
- Project Manager

To add/modify roles, update `/frontend/src/data/roles.js` and sync with backend.

#### Request Examples

**JavaScript/Fetch:**
```javascript
const applicationData = {
  fullName: "Jane Smith",
  email: "jane@example.com",
  regNumber: "BCS/045/2023",
  yearOfStudy: "3",
  role: "DevOps Engineer",
  experience: "I have 1.5 years of hands-on experience with Docker, Kubernetes, and AWS deployment pipelines. I've successfully deployed microservices architectures and implemented CI/CD workflows.",
  motivation: "I'm eager to collaborate with fellow cloud enthusiasts, share knowledge, and help junior members learn DevOps best practices.",
  linkedin: "https://linkedin.com/in/janesmith",
  github: "https://github.com/janesmith"
};

const response = await fetch('http://localhost:5000/api/applications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(applicationData)
});

const result = await response.json();
console.log(result);
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "regNumber": "BCS/001/2022",
    "yearOfStudy": "2",
    "role": "Cloud Developer",
    "experience": "I have 2 years of AWS experience...",
    "motivation": "I want to join the AWS Club...",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe"
  }'
```

**Python:**
```python
import requests
import json

url = "http://localhost:5000/api/applications"
data = {
    "fullName": "John Doe",
    "email": "john@example.com",
    "regNumber": "BCS/001/2022",
    "yearOfStudy": "2",
    "role": "Cloud Developer",
    "experience": "I have 2 years of AWS experience...",
    "motivation": "I want to join the AWS Club...",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe"
}

response = requests.post(url, json=data)
print(response.json())
```

#### Success Response (201 Created)

```json
{
  "success": true,
  "applicationId": "app-1",
  "message": "Application submitted successfully! Check your email for confirmation.",
  "data": {
    "id": "app-1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "regNumber": "BCS/001/2022",
    "yearOfStudy": "2",
    "role": "Cloud Developer",
    "timestamp": "2026-03-22T10:30:45.123Z"
  }
}
```

#### Error Responses

**400 Bad Request — Validation Error:**
```json
{
  "success": false,
  "errors": {
    "email": "A valid email is required",
    "experience": "Experience is required (min 20 characters)",
    "yearOfStudy": "Valid year of study is required"
  }
}
```

**400 Bad Request — Duplicate Application:**
```json
{
  "success": false,
  "message": "You have already applied for this role. Please wait for a response or apply for a different role.",
  "errors": {
    "role": "Duplicate application for this role from this email"
  }
}
```

**429 Too Many Requests — Rate Limited:**
```
HTTP/1.1 429 Too Many Requests
RateLimit-Limit: 5
RateLimit-Remaining: 0
RateLimit-Reset: 1679560245

Too many application submissions from this IP, please try again later.
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Server error. Please try again later.",
  "error": "Internal server error details..."
}
```

#### Error Codes Reference

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Success (GET requests) |
| 201 | Created | Application created successfully |
| 400 | Bad Request | Validation failed or duplicate |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Unexpected server error |

---

## Email Notifications

When an application is submitted, the API automatically sends two emails via **Resend**:

### Email 1: Club Confirmation

**Recipient:** `CLUB_EMAIL` from environment
**Subject:** New Application: [Applicant Name]
**Purpose:** Notify club leadership of new applications
**Triggers:** After successful application submission

**Template (Development):**
```
Sent to: onboarding@resend.dev (Resend test inbox)
```

**Template (Production):**
```
Sent to: applications@awsclubmku.com (configured domain)
```

**Email Content:**
```
New Application Received

Name: John Doe
Email: john@example.com
Registration Number: BCS/001/2022
Year of Study: 2nd Year
Position Applied: Cloud Developer

Experience:
I have 2 years of experience with AWS services...

Motivation:
I want to join the AWS Club to deepen my cloud knowledge...

LinkedIn: https://linkedin.com/in/johndoe
GitHub: https://github.com/johndoe

--- 
Application ID: app-1
Submitted: 2026-03-22 10:30 AM
```

### Email 2: Applicant Confirmation

**Recipient:** Applicant's email address
**Subject:** AWS Cloud Club Application Received
**Purpose:** Confirm receipt to applicant
**Triggers:** After successful application submission

**Template (Development):**
```
Sent to: delivered@resend.dev (Resend test inbox for testing)
```

**Template (Production):**
```
Sent to: [applicant's email] (real inbox)
```

**Email Content:**
```
Thank You for Your Application

Hi John,

Thank you for applying to join the AWS Cloud Club at Mount Kenya University!

We've received your application for the Cloud Developer position. Our selection committee will review your application and get back to you within 5-7 business days.

Your Application Details:
- Position: Cloud Developer
- Year of Study: 2nd Year
- Submitted: 2026-03-22 10:30 AM

In the meantime, feel free to:
- Check out our events: awsclubmku.com/events
- Connect on LinkedIn: linkedin.com/company/aws-cloud-club-mku
- Follow us on Twitter: @AWSMku

Best regards,
AWS Cloud Club MKU
```

### Email Service Configuration

**Service:** [Resend](https://resend.com)

**Environment Variables:**
```env
RESEND_API_KEY=re_xxxxxxxxxxxx  # API key from Resend dashboard
CLUB_EMAIL=onboarding@resend.dev # Development test inbox
NODE_ENV=development            # Switches email routing
```

**Development Mode:**
- Both emails go to Resend test inboxes
- No real emails sent
- Check `onboarding@resend.dev` and `delivered@resend.dev` in Resend dashboard

**Production Mode:**
- Club email goes to verified domain
- Applicant emails go to real email addresses
- Requires domain verification in Resend

---

## Data Validation Rules

### Client-Side Validation
Frontend validates before sending to API. User sees error messages in real-time.

### Server-Side Validation
Backend validates all fields again for security (never trust client).

### Validation Logic

```javascript
// Email validation regex
/^[^\s@]+@[^\s@]+\.[^\s@]+$/

// String sanitization
Remove: < and > characters
Trim: Leading/trailing whitespace

// Length rules
fullName: 2-100 characters
email: Valid format
regNumber: 3-50 characters
yearOfStudy: Exactly "1", "2", "3", or "4"
role: Must be in available roles list
experience: 20-1000 characters
motivation: 20-1000 characters
linkedin: Valid URL (optional)
github: Valid URL (optional)
```

### Duplicate Prevention

Applications are considered duplicates if:
- **Email** + **Role** combination already exists
- Prevents users from applying multiple times for same position
- User can apply for different roles

---

## Response Format

All API responses follow a consistent JSON structure:

### Success Response
```json
{
  "success": true,
  "message": "Operation succeeded",
  "data": { /* response data */ },
  "applicationId": "app-1"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "fieldName": "Specific error for this field"
  }
}
```

---

## Rate Limiting Details

### How It Works

- **Window:** 15 minutes (900 seconds)
- **Max Requests:** 5 per window per IP address
- **Tracking:** By client IP address
- **Headers:** Returns RateLimit-* headers

### Response Headers

```
RateLimit-Limit: 5           # Total allowed requests
RateLimit-Remaining: 3       # Requests left in window
RateLimit-Reset: 1679560245  # Unix timestamp when window resets
```

### Handling Rate Limits

**On 429 Response:**
1. Wait until `RateLimit-Reset` timestamp
2. Or restart server (clears limits in development)
3. Or wait 15 minutes

**Development Mode:**
Skip rate limiting by setting `NODE_ENV=development`

---

## Error Handling Best Practices

### Frontend Error Handling

```javascript
try {
  const response = await fetch('/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    
    if (response.status === 400) {
      // Handle validation errors
      console.log('Validation errors:', errorData.errors);
    } else if (response.status === 429) {
      // Handle rate limit
      console.log('Rate limited. Try again later.');
    } else {
      // Handle other errors
      console.log('Error:', errorData.message);
    }
    return;
  }

  const successData = await response.json();
  console.log('Application submitted:', successData);
} catch (error) {
  console.error('Network error:', error);
}
```

### Common Error Scenarios

| Scenario | Status | Message | Action |
|----------|--------|---------|--------|
| Invalid email | 400 | "A valid email is required" | Fix email format |
| Too short text | 400 | "min X characters" | Expand text |
| Duplicate role | 400 | "Already applied for this role" | Apply for different role |
| Rate limit | 429 | "Too many requests" | Wait 15 minutes |
| Server error | 500 | "Server error" | Retry in a moment |
| No connection | Network Error | "Failed to fetch" | Check backend is running |

---

## Development & Testing

### Testing the API

**Start Backend:**
```bash
cd backend
npm install
npm start  # Runs on http://localhost:5000
```

**Test with Postman:**
1. Create new POST request
2. URL: `http://localhost:5000/api/applications`
3. Headers: `Content-Type: application/json`
4. Body: JSON application data
5. Send & check response

**Test with Frontend:**
1. Start frontend: `npm start` (port 3000)
2. Fill application form
3. Submit
4. Check console for API response
5. Check backend logs for email status

### Debugging

**Check API logs:**
```bash
# Terminal running backend
# Look for:
✅ Club email sent: [ID]
✅ Applicant email sent: [ID]
❌ Error: [message]
```

**Test email delivery:**
- Development: Check `onboarding@resend.dev` inbox at resend.com
- Production: Check actual email address

---

## Deployment

### Backend Deployment (Render/Railway)

1. Set environment variables on platform
2. Set start command: `npm start`
3. Deploy from GitHub

### Environment Variables (Production)

```env
PORT=5000
NODE_ENV=production
CLIENT_URL=https://awsclubmku.com
RESEND_API_KEY=re_xxxxxxxxxxxx
CLUB_EMAIL=applications@awsclubmku.com
```

---

## Support & Troubleshooting

### Common Issues

**"Cannot reach server"**
- Ensure backend is running: `npm start`
- Check port 5000 is not in use
- Verify CLIENT_URL in backend .env

**"Email not sending"**
- Check RESEND_API_KEY is correct
- Verify CLUB_EMAIL format
- Check Resend account has credits

**"Rate limit error"**
- Wait 15 minutes or restart server
- Disable in development: `NODE_ENV=development`

### Getting Help

- Check API logs for error messages
- Review this documentation
- Open GitHub issue with details
- Email: info@awsclubmku.com

---

**Last Updated:** March 22, 2026  
**API Version:** 1.0.0  
**Status:** Production Ready ✅
