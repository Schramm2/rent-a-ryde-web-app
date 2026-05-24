# Rent A Ryde Web App

Production-inspired 4x4 rental platform with booking flows, account management, admin operations, Firebase auth, and API-backed inventory workflows.

![Vue](https://img.shields.io/badge/Vue-3-42b883?logo=vuedotjs&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore%20%2B%20Storage-ffca28?logo=firebase&logoColor=111)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2020-f7df1e?logo=javascript&logoColor=111)
![Status](https://img.shields.io/badge/status-portfolio%20case%20study-blue)

## Overview

Rent A Ryde is a full-featured rental web application concept for an off-road vehicle hire business. The project replaces a static brochure-style experience with a transactional product surface where customers can explore vehicles, create accounts, request bookings, manage profiles, upload documents, and receive booking communication.

The repository currently contains the Vue frontend and service integration layer for a REST API, Firebase Authentication, Firestore role checks, and Firebase Storage-backed document handling. The backend is represented through API contracts and configurable endpoints rather than included as source in this public portfolio version.

My role covered the product UX, frontend architecture, Firebase integration, booking workflow logic, admin dashboard experience, service-layer organization, and public-readiness cleanup.

## Key Features

- Responsive marketing and booking experience for 4x4 rental customers.
- Firebase Authentication login, signup, password reset, and admin route protection.
- Firestore-backed admin role checks before dashboard access.
- Booking creation flow with vehicle selection, add-ons, date validation, local draft recovery, and email notification hooks.
- Admin dashboard for users, bookings, vehicles, add-ons, approvals, cancellations, and exports.
- Profile area with booking history, user settings, and document upload/preview support.
- API service layer for user, admin, booking, contact, and document workflows.
- Production-style environment configuration with safe public placeholders.

## Technical Highlights

- **Frontend architecture:** Vue 3 single-page app with route-level views, reusable navigation/toast/loading components, and service modules grouped by domain.
- **Auth and authorization:** Firebase Auth handles identity, while Firestore user documents provide role-based admin routing.
- **Booking domain logic:** Client-side date validation, overlap helpers, add-on availability calls, booking draft persistence, and confirmation/cancellation email orchestration.
- **Operational admin tooling:** Dashboard workflows cover booking lifecycle management, inventory CRUD, user lookup, export support through `xlsx`/`file-saver`, and PDF generation dependencies for document output.
- **API boundary:** Centralized API configuration keeps local, staging, and production endpoints out of source code.
- **Public safety:** Sensitive runtime configuration lives in ignored `.env` files with documented placeholders in `.env.example`.

## Screenshots / Demo

This repo includes product imagery used by the app. Curated product screenshots should be added under `docs/screenshots/` before linking this repo from a portfolio page.

<img src="src/assets/Vehicles/IMG-20250527-WA0142.jpg" alt="Rent A Ryde off-road vehicle preview" width="720">

Recommended captures to add:

- Home page hero and vehicle teaser.
- Vehicle detail/availability flow.
- Booking form with selected add-ons.
- Customer profile with document status.
- Admin dashboard booking-management table.
- Mobile navigation and booking flow.

Place future screenshots under `docs/screenshots/` and reference them from this section.

## Architecture

```text
Vue SPA
  |
  |-- Router guards
  |     |-- Firebase Auth session
  |     `-- Firestore user role lookup
  |
  |-- Domain views
  |     |-- Home / Vehicles / Booking / Profile
  |     `-- Admin dashboard
  |
  |-- Service layer
  |     |-- users, admin, bookings, documents, contact
  |     `-- shared API endpoint configuration
  |
  `-- External services
        |-- REST API backend
        |-- Firebase Auth
        |-- Firestore
        `-- Firebase Storage
```

The frontend keeps business workflows in domain services rather than embedding all network logic directly in components. This makes the API boundary easy to inspect, keeps environment-specific values out of source, and makes the user/admin flows easier to reason about.

## Local Development

### Prerequisites

- Node.js 18 or newer
- npm
- Firebase project configuration
- A compatible REST API backend, or mocked `/api` endpoints for frontend-only exploration

### Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Update `.env` with your Firebase client config and local API target:

```bash
VUE_APP_API_BASE_URL=http://localhost:3000
```

### Useful Commands

```bash
npm run dev      # Start Vue dev server
npm run lint     # Run ESLint
npm run build    # Create production build
npm run check    # Lint and build
```

## Environment Variables

All runtime configuration should live in `.env` files and stay out of git.

| Variable | Purpose |
| --- | --- |
| `VUE_APP_API_BASE_URL` | REST API origin used by direct service calls and the dev-server proxy. |
| `VUE_APP_FIREBASE_API_KEY` | Firebase client API key. |
| `VUE_APP_FIREBASE_AUTH_DOMAIN` | Firebase auth domain. |
| `VUE_APP_FIREBASE_PROJECT_ID` | Firebase project ID. |
| `VUE_APP_FIREBASE_STORAGE_BUCKET` | Firebase Storage bucket. |
| `VUE_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID. |
| `VUE_APP_FIREBASE_APP_ID` | Firebase app ID. |
| `VUE_APP_FIREBASE_MEASUREMENT_ID` | Optional Firebase measurement ID. |

## Engineering Notes

- The app intentionally separates Firebase identity from backend business operations. Auth state gates the UI, while backend services remain responsible for booking and inventory mutations.
- Booking availability is treated as a backend concern, with frontend helpers focused on validation and user feedback.
- Document upload code validates file type and size client-side, but production deployments should still enforce equivalent backend validation and storage rules.
- The public version avoids shipping production service URLs, secrets, hidden credentials, or unused marketing exports.

## Status

Portfolio case study / production-inspired prototype. The frontend is buildable and demonstrates the product architecture, but public users should provide their own Firebase project and compatible backend API to run every integrated workflow end to end.

## Security

- Do not commit `.env` files or real Firebase/backend credentials.
- Treat Firebase client config as public identifiers, but configure Firebase Auth, Firestore, and Storage rules defensively.
- Review image and brand asset licensing before making the repository public.
- Rotate any credentials that may have existed in older private history before publishing.
