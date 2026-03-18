# Local Testing Guide

Run the full stack locally using Firebase emulators.

## 1. Start Firebase Emulators

From the project root:

```bash
cd firebase
firebase emulators:start
```

This starts:
- **Functions** on `http://localhost:5001`
- **Firestore** on `http://localhost:8080`
- **Emulator UI** at `http://127.0.0.1:4000`

## 2. Start Admin Dashboard

In another terminal:

```bash
cd apps/admin-dashboard
npm run dev
```

The dashboard runs at `http://localhost:3000` and is configured (via `.env.local`) to call the Functions emulator at `http://localhost:5001/vsds-platform/us-central1`.

## 3. Environment Variables

### Firebase Functions (`firebase/functions/config.env`)

Copy `.env.example` to `config.env` and fill in your values. We use `config.env` because Firebase's built-in loader fails on `.env`/`.env.local` with long values (e.g. JWTs).

- `WATI_API_URL`, `WATI_API_KEY`, `WATI_CHANNEL_NUMBER`, `WATI_WEBHOOK_SECRET` — WhatsApp (WATI)
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_WEBHOOK_SECRET` — Email (Resend)
- `GCP_PROJECT`, `CLOUD_FUNCTIONS_URL` — Google Cloud (use real values for deploy)

### Admin Dashboard (`apps/admin-dashboard/.env.local`)

For local emulator:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/vsds-platform/us-central1
```

## 4. Firestore Emulator

Set `FIRESTORE_EMULATOR_HOST=localhost:8080` if your code needs to target the emulator explicitly. The Functions emulator typically does this automatically.

## Troubleshooting

- **"Failed to load environment variables from .env"** — Use `.env.local` instead; the code loads it via dotenv at startup.
- **Functions not loading** — Restart the emulator after changing `.env.local`.
- **Dashboard API errors** — Confirm the emulator is running and `NEXT_PUBLIC_API_BASE_URL` points to `http://localhost:5001/vsds-platform/us-central1`.
