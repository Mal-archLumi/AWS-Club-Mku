# Contributing to AWS Cloud Club MKU Website

Thank you for your interest in contributing to the AWS Cloud Club MKU website! This document provides guidelines and instructions for contributing to the project.

## 🎯 Code of Conduct

By participating, you agree to maintain a respectful and inclusive environment for all contributors.

---

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork the repository on GitHub
# Then clone your fork:
git clone https://github.com/YOUR-USERNAME/AWS-Club-Mku.git
cd AWS-Club-Mku

# Add upstream remote
git remote add upstream https://github.com/Mal-archLumi/AWS-Club-Mku.git
```

### 2. Create Feature Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` — New features
- `bugfix/` — Bug fixes
- `docs/` — Documentation updates
- `refactor/` — Code refactoring
- `test/` — Test improvements

### 3. Setup Development Environment

```bash
# Frontend setup
cd frontend
npm install
npm start  # http://localhost:3000

# Backend setup (in another terminal)
cd backend
npm install
cp .env.example .env
npm start  # http://localhost:5000
```

---

## 📝 Making Changes

### Frontend Changes

**Component Structure:**
```javascript
// src/components/YourComponent/YourComponent.js
import React from 'react';
import './YourComponent.css';

const YourComponent = () => {
  return (
    <div className="your-component">
      {/* Component content */}
    </div>
  );
};

export default YourComponent;
```

**CSS Naming (BEM):**
```css
/* src/components/YourComponent/YourComponent.css */
.your-component {
  /* Block */
}

.your-component-header {
  /* Block element */
}

.your-component-header--active {
  /* Block element with modifier */
}
```

**Guidelines:**
- Use functional components with hooks
- Keep components focused and reusable
- Add PropTypes or TypeScript types
- Write comments for complex logic
- Test responsive design on mobile/tablet/desktop

### Backend Changes

**File Structure:**
```javascript
// backend/routes/yourRoute.js (if creating new routes)
const express = require('express');
const router = express.Router();

// Validation middleware
const validateInput = (req, res, next) => {
  // Validation logic
  next();
};

// Route handlers
router.post('/', validateInput, async (req, res) => {
  // Handler logic
});

module.exports = router;
```

**Guidelines:**
- Use async/await for asynchronous code
- Always validate and sanitize input
- Return consistent JSON responses
- Include error handling
- Log important events
- Document API endpoints

### CSS Conventions

**Colors (AWS Theme):**
```css
--primary-dark: #232F3E;    /* Dark background */
--secondary-dark: #282c34;  /* Lighter dark */
--accent-orange: #FF9900;   /* AWS orange */
--link-blue: #61dafb;       /* Accent blue */
--text-light: #ffffff;      /* Light text */
--text-muted: #999999;      /* Muted text */
```

**Spacing:**
- Use multiples of 8px (8, 16, 24, 32, 40, 48, 56, 64)
- `rem` units for responsive scaling
- `em` for component-relative sizes

**Responsive Breakpoints:**
```css
/* Mobile first approach */
.component { /* Default: < 640px */ }
@media (min-width: 640px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large desktop */ }
```

---

## ✅ Testing

### Frontend Tests

```bash
cd frontend

# Run tests in watch mode
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test YourComponent.test.js
```

**Test Template:**
```javascript
import { render, screen } from '@testing-library/react';
import YourComponent from './YourComponent';

test('renders component correctly', () => {
  render(<YourComponent />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### Manual Testing Checklist

- [ ] Feature works on Chrome, Firefox, Safari
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1024px+)
- [ ] Form validation works
- [ ] Error messages display correctly
- [ ] No console errors/warnings
- [ ] Accessibility (keyboard navigation, screen readers)

---

## 🔍 Code Quality

### ESLint

The project uses ESLint for code quality. Run before committing:

```bash
# Check for lint errors
npm run lint  # if available

# Or use create-react-app's built-in linting
npm start  # Shows lint errors in console
```

### Common Issues

**Unused variables:**
```javascript
// ❌ Bad
const unusedVar = 5;

// ✅ Good
const neededVar = 5;
console.log(neededVar);
```

**Missing dependencies in hooks:**
```javascript
// ❌ Bad
useEffect(() => {
  console.log(someVar);
}, []); // Missing dependency!

// ✅ Good
useEffect(() => {
  console.log(someVar);
}, [someVar]); // Included dependency
```

**Proper error handling:**
```javascript
// ❌ Bad
const response = await fetch(url);
const data = await response.json();

// ✅ Good
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error('API error');
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Fetch failed:', error);
  throw error;
}
```

---

## 📤 Committing Changes

### Commit Messages

Use clear, descriptive commit messages:

```bash
# Format
git commit -m "type: brief description"

# Examples
git commit -m "feat: add AWS logo to navbar"
git commit -m "fix: resolve form submission error"
git commit -m "docs: update README with API docs"
git commit -m "refactor: simplify email validation logic"
git commit -m "test: add unit tests for Hero component"
```

**Types:**
- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation
- `style:` — Code style (formatting, whitespace)
- `refactor:` — Code refactoring
- `test:` — Adding/updating tests
- `chore:` — Maintenance tasks
- `perf:` — Performance improvements

### Before Pushing

```bash
# Update from upstream
git fetch upstream
git rebase upstream/main

# Run tests
npm test

# Check linting (frontend)
npm start  # Check console for errors

# Review your changes
git diff

# Push to your fork
git push origin feature/your-feature-name
```

---

## 🔄 Pull Request Process

### 1. Create Pull Request

- Push to your fork
- Open PR on GitHub
- Base: `Mal-archLumi/AWS-Club-Mku:main`
- Compare: `YOUR-USERNAME/AWS-Club-Mku:feature/your-feature`

### 2. PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Code refactoring

## Related Issues
Fixes #issue_number

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing Done
- [ ] Tested on mobile
- [ ] Tested on desktop
- [ ] Form validation works
- [ ] No console errors

## Screenshots (if UI changes)
[Add screenshots here]

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] Comments added for complex logic
- [ ] No console errors/warnings
- [ ] Tests pass locally
- [ ] Documentation updated
```

### 3. Review Process

- Maintainers will review your PR
- Address feedback promptly
- Force-push is fine for addressing feedback
- Once approved, maintainer will merge

### 4. After Merge

```bash
# Delete feature branch locally
git branch -d feature/your-feature-name

# Delete on GitHub
git push origin --delete feature/your-feature-name

# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main
```

---

## 📚 Common Contribution Scenarios

### Adding a New Page/Section

1. Create component: `src/components/NewSection/NewSection.js`
2. Create styles: `src/components/NewSection/NewSection.css`
3. Import in `App.js`
4. Add to navigation if needed
5. Update `README.md` project structure section
6. Test responsiveness and accessibility

### Fixing a Bug

1. Create issue if one doesn't exist
2. Create branch: `bugfix/description`
3. Write test that reproduces bug
4. Fix the bug
5. Verify test passes
6. Submit PR with before/after explanation

### Updating Documentation

1. Create branch: `docs/description`
2. Make changes to `.md` files
3. Preview on GitHub
4. Submit PR

### Adding Email Template Customization

1. Edit `/backend/index.js` around lines 100-145
2. Modify HTML template
3. Test with `npm start` in backend
4. Submit form and check `delivered@resend.dev`
5. Document template variables in `README.md`

---

## 🔒 Security Considerations

### Before Submitting

**Never commit:**
- `.env` files with real API keys
- Passwords or secrets
- Personal information
- API credentials

**Always:**
- Use environment variables for secrets
- Validate and sanitize user input
- Escape HTML in output
- Use HTTPS in production
- Review dependencies for vulnerabilities: `npm audit`

### If You Discover a Security Issue

Please email `security@awsclubmku.com` instead of opening a public issue.

---

## 🆘 Need Help?

- **Questions?** Open a GitHub Discussion
- **Found a bug?** Open an Issue with details
- **Need mentoring?** Ask in the issue/PR
- **Email**: info@awsclubmku.com

---

## 📊 Development Workflow Summary

```
1. Fork repository
   ↓
2. Create feature branch
   ↓
3. Make changes & test locally
   ↓
4. Commit with clear messages
   ↓
5. Push to your fork
   ↓
6. Open Pull Request
   ↓
7. Address review feedback
   ↓
8. Maintainer merges PR
   ↓
9. Delete feature branch
```

---

## 🎉 Thank You!

Your contributions help make the AWS Cloud Club MKU website better for everyone. We appreciate your time and effort!

**Happy Contributing!** 🚀
