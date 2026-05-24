# Public Repository Review

## Completed

- Replaced hardcoded production backend URLs with environment-driven configuration.
- Added `.env.example` with safe placeholders for Firebase and API settings.
- Expanded `.gitignore` for local env files, logs, build output, editor files, and caches.
- Removed an empty backend placeholder file.
- Removed unused poster, PDF, video, and promotional assets that were not referenced by the app.
- Removed high-risk debug logs that could expose registration, profile, document, user, or booking data in browser consoles.
- Rewrote the README for recruiter-facing project positioning, architecture, setup, status, and security notes.
- Ran `npm audit fix --omit=dev` to apply semver-compatible production dependency security updates.
- Removed unused `xlsx`, `jspdf`, `jspdf-autotable`, `file-saver`, and EmailJS packages after confirming export flows generate CSV/HTML directly.
- Added an MIT license and screenshot checklist.
- Compressed oversized public image assets to reduce repository weight and build performance warnings.

## Audit Notes

- No tracked `.env`, SSH key, certificate, private key, or local credential files were found.
- Current Firebase config is environment-based.
- The previous public backend URL appeared in tracked source and git history. The current tree is clean, but history should be reviewed before publishing.
- Remaining product images should be manually checked for licensing, brand permissions, and identifiable-person consent.
- `npm audit --omit=dev` reports 0 vulnerabilities after dependency cleanup.

## Suggested Pre-Public Checks

- Run a secret scanner such as `gitleaks` or GitHub secret scanning against the full history.
- Rotate any Firebase, backend, email, or deployment credentials that were ever used with this project privately.
- Add curated screenshots under `docs/screenshots/`.
- Confirm that the MIT license is acceptable for this portfolio project before publishing.
