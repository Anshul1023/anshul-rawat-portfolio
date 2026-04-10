# Anshul Rawat Portfolio

Premium single-page developer portfolio for **Anshul Rawat**, built with a modern frontend stack and an Express-based contact API.

## Stack

- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS
- Motion: Framer Motion + GSAP
- 3D: Three.js
- Backend: Node.js + Express
- Email: Nodemailer over SMTP

## Project structure

```text
anshul-rawat-portfolio/
├── backend/
│   ├── src/
│   │   ├── config/env.js
│   │   ├── middleware/errorHandler.js
│   │   ├── routes/contact.js
│   │   ├── services/emailService.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── Anshul-Rawat-Resume.pdf
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── sections/
│   │   │   └── ui/
│   │   ├── data/portfolio.ts
│   │   ├── hooks/useActiveSection.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── .gitignore
├── package.json
└── README.md
```

## Features

- Cinematic hero with lazy-loaded 3D background
- Smooth-scroll single-page navigation
- Dark premium visual system with glassmorphism accents
- Scroll progress indicator and custom cursor
- Interactive skill orbit and animated experience timeline
- 3D tilt project cards with expandable modal details
- Contact form wired to `POST /send-email`
- SMTP-ready backend with validation, Helmet, CORS, and rate limiting
- Resume download, SEO tags, and deployment-friendly split architecture

## Local setup

### 1. Install dependencies

From the project root:

```bash
npm install
```

### 2. Configure environment variables

Frontend:

```bash
# Git Bash
cp frontend/.env.example frontend/.env
# Windows Command Prompt
copy frontend\\.env.example frontend\\.env
```

Backend:

```bash
# Git Bash
cp backend/.env.example backend/.env
# Windows Command Prompt
copy backend\\.env.example backend\\.env
```

Update the backend `.env` with your SMTP credentials.

### 3. Run the full stack app

```bash
npm run dev
```

Expected local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- Health check: `http://localhost:8080/health`

## Environment variables

### Frontend

`frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:8080
```

### Backend

`backend/.env`

```env
PORT=8080
CORS_ORIGIN=http://localhost:5173
CONTACT_TO_EMAIL=anshulrawat5124@gmail.com
CONTACT_FROM_EMAIL=portfolio@anshulrawat.dev
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

## Contact API

### `POST /send-email`

Request body:

```json
{
  "name": "Recruiter Name",
  "email": "recruiter@example.com",
  "message": "Hi Anshul, I would like to discuss an opportunity."
}
```

Behavior:

- Validates fields with `zod`
- Rate limits repeated submissions
- Sends a formatted message to `anshulrawat5124@gmail.com`

## Build commands

```bash
npm run check
npm run build
```

## Deployment guide

### Frontend

Deploy the `frontend` workspace to Vercel.

- Root directory: `frontend`
- Framework preset: `Vite`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_BASE_URL=https://your-backend-domain.com`

### Backend

Deploy the `backend` workspace to Render.

- Blueprint file: `render.yaml`
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm run start`
- Node version: `18+`
- Expose port from `PORT`
- Set all SMTP variables from `backend/.env.example`
- Set `CORS_ORIGIN` to the deployed frontend URL

### Recommended production pairing

- Frontend: Vercel
- Backend: Render or Railway
- Email: Gmail SMTP, Resend SMTP, or SendGrid SMTP relay

## Performance notes

- Three.js scene is lazy loaded to reduce initial JavaScript cost
- Vendor chunk splitting isolates animation and 3D packages
- Interactions favor lightweight transforms instead of layout-heavy animation
- Contact backend is separated from static frontend hosting for simpler scaling

## Customization

Key content lives in:

- `frontend/src/data/portfolio.ts`
- `frontend/public/Anshul-Rawat-Resume.pdf`
- `backend/.env`

Swap project links, add more sections, or connect the contact form to a different email provider without changing the frontend structure.
