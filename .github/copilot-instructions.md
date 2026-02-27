# Copilot Instructions — AWS Cloud Club MKU Website

## Project Overview

This is the **AWS Cloud Club MKU** website — a club landing page for Mount Kenya University's AWS student chapter. It is structured as a monorepo with two top-level directories:

- **`frontend/`** — A Create React App (React 19) project. Currently in early migration: the actual site content lives as static HTML in `frontend/public/index.html` (630+ lines), **not** yet in React components. The CRA `src/App.js` still contains the default boilerplate.
- **`backend/`** — An Express 5 + dotenv server (Node.js, CommonJS modules). Currently scaffolded with only `package.json` — no routes or entry file yet.

## Architecture & Key Decisions

- **Static-first, migration-pending**: The full site (navbar, hero, about, team, events, application form, contact, footer) is authored as vanilla HTML/CSS/JS in `frontend/public/index.html`. The `index.html` references `styles.css` and `app.js` in `public/`, but **these files don't exist yet** — they need to be created or the content migrated into React components.
- **React is the target**: The CRA scaffold in `src/` is set up with React 19, `@testing-library/react`, and Jest. The intent is to break the monolithic `index.html` into React components.
- **Backend is placeholder**: `backend/` has `express`, `cors`, and `dotenv` as dependencies but no source files. No `.env` file exists. When creating backend code, use CommonJS (`"type": "commonjs"` in package.json).
- **No shared package manager workspace**: `frontend/` and `backend/` have independent `package.json` files. Run `npm install` in each directory separately.

## Sections in the Static HTML (`frontend/public/index.html`)

The existing HTML defines these sections (in order), which should map to future React components:

1. **Navbar** — sticky nav with logo, section links, hamburger toggle
2. **Hero** — headline, stats counters (100+ members, 20+ events, 15+ certified), CTAs
3. **About** — 4 feature cards (Learn, Build, Connect, Grow)
4. **Core Team** — 5 team member cards (Captain, Vice Captain, Secretary, Treasurer, Tech Lead) with placeholder names and SVG fallback images via `onerror`
5. **Events** — upcoming event cards with dates, tags, descriptions
6. **Apply** — application status banner + role listings + multi-field application form with client-side validation (fields: name, email, regNumber, yearOfStudy, role, experience, motivation, linkedin, github)
7. **Contact** — email, location, social media links
8. **Footer** — branding and copyright with dynamic year (`#currentYear`)

## Developer Workflows

```bash
# Frontend (CRA)
cd frontend && npm install
npm start          # dev server on http://localhost:3000
npm test           # Jest + Testing Library (watch mode)
npm run build      # production build to frontend/build/

# Backend (Express) — no start script yet
cd backend && npm install
# When adding an entry point, create backend/index.js and add "start" script
```

## Conventions & Patterns

- **CSS class naming**: BEM-like with component prefixes — `.hero-title`, `.team-card`, `.event-card`, `.apply-form`, `.nav-logo`, `.btn-primary`, `.section-tag`. Follow this pattern when adding styles.
- **Color palette** (from HTML): AWS-themed — dark background `#282c34`/`#232F3E`, accent orange `#FF9900`, link blue `#61dafb`. Use CSS custom properties if refactoring styles.
- **Font**: Inter (300–800 weights) loaded from Google Fonts in `index.html`.
- **Image fallbacks**: Team member images use inline SVG fallbacks via `onerror` attribute. When migrating to React, handle image errors with `onError` prop or a reusable fallback component.
- **Security**: `index.html` includes a Content-Security-Policy meta tag restricting `script-src`, `style-src`, `font-src`, `img-src`. Update this CSP when adding new external resources.
- **Form validation**: The application form uses `novalidate` with planned custom JS validation (via the missing `app.js`). Field error spans follow the pattern `<span class="form-error" id="{fieldName}Error">`.
- **Testing**: Uses `@testing-library/react` with Jest. Tests use `screen.getByText()` pattern (see `App.test.js`).
- **ESLint**: Configured via `react-app` and `react-app/jest` presets in `frontend/package.json`.

## When Migrating to React Components

- Extract each section into its own component under `frontend/src/components/` (e.g., `Navbar.js`, `Hero.js`, `Team.js`, `Events.js`, `ApplicationForm.js`, `Contact.js`, `Footer.js`).
- Move CSS from the planned `styles.css` into component-level CSS files or a shared `styles/` directory following the existing class naming conventions.
- The form in the Apply section should submit to the Express backend — wire up `cors` and an API route (e.g., `POST /api/applications`).
- Team member data (names, roles, images, socials) and event data should be extracted into JSON/JS data files rather than hardcoded in JSX.
