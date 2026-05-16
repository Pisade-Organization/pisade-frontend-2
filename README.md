# Pisade — Tutoring Platform

A full-stack tutoring marketplace where students book lessons with approved tutors, pay via wallet top-up or Stripe, and communicate through real-time chat.

```
backend/   NestJS 10 + Fastify + Prisma 7 + PostgreSQL — port 4000
frontend/  Next.js 16 App Router + React 19 + NextAuth — port 3000
```

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture](#architecture)
3. [Environment Variables](#environment-variables)
4. [Authentication](#authentication)
5. [Tutor Onboarding](#tutor-onboarding)
6. [Student Dashboard](#student-dashboard)
7. [Tutor Discovery & Browsing](#tutor-discovery--browsing)
8. [Bookings & Lesson Lifecycle](#bookings--lesson-lifecycle)
9. [Payments & Wallet](#payments--wallet)
10. [Chat](#chat)
11. [File Uploads](#file-uploads)
12. [Notifications](#notifications)
13. [Admin Operations](#admin-operations)
14. [Subjects & Languages](#subjects--languages)
15. [Manual Testing Guide](#manual-testing-guide)

---

## Quick Start

### Backend

```bash
cd backend
cp .env.template .env          # fill in all vars (see Environment Variables)
npm install
npx prisma migrate dev         # apply migrations + run seed
npm run start:dev              # watch mode on :4000
```

### Frontend

```bash
cd frontend
cp .env.template .env.local    # fill in all vars
npm install
npm run dev                    # Next.js dev on :3000
```

Swagger UI (optional): set `ENABLE_SWAGGER=true` in backend `.env`, then visit `http://localhost:4000/docs`.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Browser / Mobile                                   │
│  Next.js 16 App Router  (port 3000)                 │
│  NextAuth  │  Redux Toolkit  │  React Query         │
└──────────────────┬──────────────────────────────────┘
                   │ REST + Socket.IO
┌──────────────────▼──────────────────────────────────┐
│  NestJS 10 + Fastify  (port 4000)                   │
│  AtGuard (JWT)  │  ApiResponseInterceptor            │
│  HttpExceptionFilter  │  Socket.IO (IoAdapter)       │
└────┬──────────┬──────────────┬────────────┬─────────┘
     │          │              │            │
  Prisma     Stripe         AWS S3      Nodemailer
  Postgres   Webhooks       CloudFront   (SMTP)
```

**Response envelope** — every REST response is wrapped:
```json
{ "success": true, "data": { ... }, "meta": { "timestamp": "...", "path": "..." } }
```
Errors:
```json
{ "success": false, "error": { "status": 400, "message": "...", "details": [...] } }
```

---

## Environment Variables

### `backend/.env`

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | yes | PostgreSQL connection string |
| `AT_SECRET` | yes | Signs access tokens (15 min expiry) |
| `RT_SECRET` | yes | Signs refresh tokens (7 day expiry) |
| `JWT_SECRET` | yes | Signs magic-link tokens |
| `GOOGLE_CLIENT_ID` | yes | Google OAuth app client ID |
| `GOOGLE_CLIENT_SECRET` | yes | Google OAuth app secret |
| `GOOGLE_CALLBACK_URL` | yes | e.g. `http://localhost:4000/auth/google/callback` |
| `FRONTEND_URL` | yes | e.g. `http://localhost:3000` (used in email links) |
| `MAIL_HOST` | yes | SMTP host |
| `MAIL_PORT` | yes | SMTP port |
| `MAIL_USER` | yes | SMTP username |
| `MAIL_PASS` | yes | SMTP password |
| `MAIL_FROM` | yes | From address for all outgoing mail |
| `AWS_ACCESS_KEY_ID` | yes | S3 credentials |
| `AWS_SECRET_ACCESS_KEY` | yes | S3 credentials |
| `AWS_REGION` | yes | e.g. `ap-southeast-1` |
| `AWS_S3_BUCKET` | yes | S3 bucket name |
| `CLOUDFRONT_S3_URL` | yes | CDN base URL (no trailing slash) |
| `STRIPE_SECRET_KEY` | yes | Stripe secret key (`sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | yes | Stripe webhook signing secret (`whsec_...`) |
| `STRIPE_RETURN_URI` | yes | Redirect URL after Stripe 3DS |
| `CORS_ORIGINS` | no | Comma-separated origins, default `http://localhost:3000` |
| `PORT` | no | Server port, default `4000` |
| `ENABLE_SWAGGER` | no | Set `true` to enable `/docs` |

### `frontend/.env.local`

| Variable | Required | Description |
|---|---|---|
| `NEXTAUTH_URL` | yes | e.g. `http://localhost:3000` |
| `NEXTAUTH_SECRET` | yes | Random string (`openssl rand -base64 32`) |
| `BACKEND_URL` | yes | Server-side backend URL (no `NEXT_PUBLIC_`) |
| `NEXT_PUBLIC_BACKEND_URL` | yes | Browser-side backend URL |
| `GOOGLE_CLIENT_ID` | yes | Same Google OAuth client ID as backend |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | yes | Same value, exposed to browser |
| `GOOGLE_CLIENT_SECRET` | yes | Google OAuth secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | yes | Stripe publishable key (`pk_test_...`) |
| `EMAIL_*` | no | Email fallback config |

---

## Authentication

### Flows

**Magic Link**
1. User enters email on sign-in page → `POST /auth/magic-link` (body: `{ email, intent? }`)
2. Backend sends email with link: `{FRONTEND_URL}/auth/verify?token=JWT`
3. User clicks → frontend calls `POST /auth/verify-magic-link` with the token
4. Backend returns `{ access_token, refresh_token, user }`
5. Frontend stores tokens in NextAuth session (httpOnly cookie)

**Google OAuth**
1. User clicks "Sign in with Google" → browser Google consent screen
2. Google returns ID token → frontend calls `POST /auth/google/callback` with `{ googleToken, intent? }`
3. Backend verifies with Google, creates account if new, returns tokens

**Token Refresh**
- Access token expires in 15 min; NextAuth refreshes automatically ~90s before expiry via `POST /auth/refresh`
- Refresh token valid 7 days; permanent failures (401/403) counted — session invalidated after 5 failures in 15 min

**Endpoints**

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/auth/magic-link` | public | Request magic link email |
| GET/POST | `/auth/verify-magic-link` | public | Verify magic link token |
| POST | `/auth/google/callback` | public | Exchange Google token |
| GET | `/auth/google/signin` | public | Initiate Google OAuth redirect |
| POST | `/auth/refresh` | RT token | Refresh access token |
| POST | `/auth/logout` | JWT | Revoke session |
| POST | `/auth/recover-account` | public | Recover deactivated account |

---

## Tutor Onboarding

New tutors complete a 9-step form before being reviewed by an admin. The middleware pins non-approved tutors to `/tutor/onboarding`.

| Step | Data Collected |
|---|---|
| 1 | Personal info, teaching subject, languages |
| 2 | Profile avatar upload |
| 3 | Certifications (files) |
| 4 | Diplomas / academic credentials (files) |
| 5 | Bio / teaching philosophy (long text) |
| 6 | Intro video + thumbnail |
| 7 | Timezone + weekly availability schedule |
| 8 | Hourly lesson price (THB) + withdrawal account info |
| 9 | ID / Passport for KYC |

**Endpoints** (all require TUTOR role JWT)

| Method | Path | Description |
|---|---|---|
| GET | `/onboarding/current-step` | Which step to resume at |
| GET/PATCH | `/onboarding/step/1` … `/onboarding/step/9` | Read/save each step |
| POST | `/v1/me/tutor-profile/submissions` | Submit for admin review |

After submission, tutor status becomes `REVIEWING`. Admin approves via `PATCH /v1/admin/tutors/:id/approve`, setting status to `APPROVED` and publishing the profile.

---

## Student Dashboard

Authenticated student home screen aggregating lesson data.

| Method | Path | Description |
|---|---|---|
| GET | `/dashboard/summary` | Total completed / scheduled / cancelled lessons |
| GET | `/dashboard/next-lesson` | Next upcoming lesson (or null) |
| GET | `/dashboard/today-lessons` | Lessons for today |
| GET | `/dashboard/weekly-plan?start=YYYY-MM-DD` | 7-day lesson plan |
| GET | `/dashboard/favorite-tutors` | All favorited tutors |
| GET | `/dashboard/favorite-tutors/paginated` | Paginated favorites |
| GET | `/dashboard/current-tutors` | Tutors student currently learns with |
| GET | `/dashboard/transactions` | Student transaction history |

---

## Tutor Discovery & Browsing

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/v1/tutors` | public | Browse approved tutors (filter by subject, language, price) |
| GET | `/v1/tutors/:id` | public | Tutor profile detail (bio, subjects, availability, reviews) |

---

## Bookings & Lesson Lifecycle

```
PENDING_PAYMENT → CONFIRMED → COMPLETED
                           ↘ CANCELLED
      ↘ EXPIRED (15 min timeout if not paid)
```

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/bookings` | STUDENT | Create booking, lock tutor slot for 15 min |
| POST | `/bookings/:id/checkout` | STUDENT | Pay for booking (see Payments) |
| PATCH | `/bookings/:id/cancel` | STUDENT/TUTOR | Cancel with reason |
| PATCH | `/bookings/:id/reschedule` | STUDENT/TUTOR | Move to new time slot |
| GET | `/bookings` | JWT | List bookings (filtered by role) |
| GET | `/bookings/:id` | JWT | Single booking detail |

**Cron tasks** (via `@nestjs/schedule`):
- Expire `PENDING_PAYMENT` lessons older than 15 min
- Auto-complete `CONFIRMED` lessons whose end time has passed

---

## Payments & Wallet

This is the most complex part of the platform. Read carefully.

### Commission Model

| Tutor Rank | Platform Fee | Tutor Receives |
|---|---|---|
| STARTER | 20% | 80% |
| PRO | 15% | 85% |
| MASTER | 10% | 90% |

Commission is deducted from tutor wallet at lesson completion via a `COMMISSION` transaction.

---

### Student Wallet

Every student has a wallet with a THB balance (stored as integer, no decimals).

| Method | Path | Description |
|---|---|---|
| GET | `/wallet/me` | Wallet balance and info |
| GET | `/wallet/me/transactions` | Transaction history (paginated, filter by type/status) |
| GET | `/wallet/me/summary` | Balance + totals (topups, payments, refunds) |
| POST | `/wallet/topup` | Initiate PromptPay QR top-up |
| POST | `/wallet/topup/verify` | Poll / verify top-up completion |

**Top-Up Flow**

```
POST /wallet/topup  { amount: 500 }
  └─ Backend creates TOPUP transaction (PENDING)
  └─ Backend creates Stripe PaymentIntent with PromptPay payment method
  └─ Returns: { qrCodeUrl, providerRef: "pi_xxx" }

[User scans QR in PromptPay app and pays]

[Stripe fires webhook: payment_intent.succeeded]
  └─ Backend finds transaction by providerRef
  └─ Transaction → SUCCESS
  └─ wallet.balance += 500

POST /wallet/topup/verify  { providerRef: "pi_xxx" }
  └─ Polls current status (for immediate frontend feedback)
```

---

### Booking Checkout (Combined Wallet + Stripe)

```
POST /bookings/:id/checkout  { paymentMethodId?: "pm_xxx" }

CASE A — Wallet covers full price:
  └─ wallet.balance -= lessonPrice
  └─ PAYMENT transaction → SUCCESS
  └─ Lesson → CONFIRMED immediately

CASE B — Wallet insufficient:
  └─ wallet.balance -= whatever is available (partial)
  └─ Stripe PaymentIntent for remaining amount (PromptPay or saved card)
  └─ Returns: { clientSecret, qrCodeUrl }
  └─ Lesson stays PENDING_PAYMENT

[Stripe fires webhook: payment_intent.succeeded]
  └─ TOPUP transaction → SUCCESS
  └─ wallet.balance += stripe amount
  └─ Lesson → CONFIRMED
  └─ Student + Tutor notified
```

---

### Tutor Wallet & Withdrawals

| Method | Path | Description |
|---|---|---|
| GET | `/tutor-wallet/summary` | Balance, total earnings, commission taken, pending payouts |
| GET | `/tutor-wallet/withdrawals` | Withdrawal request history |
| POST | `/tutor-wallet/withdraw` | Request withdrawal (PromptPay or bank transfer) |

**Withdrawal Flow**

```
POST /tutor-wallet/withdraw
  {
    amount: 1000,
    method: "PROMPTPAY" | "BANK_TRANSFER",
    accountInfo: { phoneNumber: "08x-xxx-xxxx" } | { bankName, accountNumber, accountName }
  }
  └─ WITHDRAW transaction created (PENDING)
  └─ Funds reserved (deducted from available balance, not yet paid out)

[Admin processes offline — marks transaction SUCCESS]
  └─ Funds removed from pending, payout complete
```

---

### Saved Payment Methods (Stripe Cards)

| Method | Path | Description |
|---|---|---|
| GET | `/payments/methods` | List all saved cards |
| POST | `/payments/methods` | Save a card (body: `{ paymentMethodId, setAsDefault? }`) |
| PUT | `/payments/methods/default` | Set default card |
| GET | `/payments/methods/default` | Get current default card |
| DELETE | `/payments/methods/:id` | Remove saved card |

---

### Stripe Webhook

| Method | Path | Auth |
|---|---|---|
| POST | `/payments/stripe/webhook` | public (signature required) |

Handled events:
- `payment_intent.succeeded` → credit wallet, confirm lesson if applicable
- `payment_intent.payment_failed` → mark transaction FAILED, notify student
- `payment_intent.canceled` → mark transaction FAILED

**Note:** Webhook signature is verified via `STRIPE_WEBHOOK_SECRET`. The Fastify adapter is configured with `rawBody: true` specifically to support this.

---

## Chat

Real-time direct messaging via Socket.IO (namespace `/chat`). Connection requires a valid access token passed as a query parameter or header.

| Method | Path | Description |
|---|---|---|
| GET | `/chat/conversations` | Recent conversations with unread counts |
| GET | `/chat/messages?peerUserId=:id` | Message history with a user (cursor-based) |
| POST | `/chat/messages` | Send message (text, file, optional reply-to) |
| PATCH | `/chat/messages/:id/read` | Mark message as read |

**Socket events** (emitted by server):
- `message` — new incoming message
- `read` — message read receipt

---

## File Uploads

Files are uploaded directly from the browser to S3 using presigned URLs. The backend never proxies file bytes.

| Method | Path | Description |
|---|---|---|
| GET | `/upload/presigned?fileName=&fileType=&folder=` | Get presigned PUT URL + final CloudFront URL |
| DELETE | `/upload/deleteObject` | Delete S3 object by key |

**Upload flow:**
1. Frontend calls `GET /upload/presigned` → receives `{ uploadUrl, fileUrl }`
2. Frontend `PUT` file bytes directly to `uploadUrl` (S3)
3. Frontend saves `fileUrl` (CloudFront) to the relevant profile/onboarding field

---

## Notifications

| Method | Path | Description |
|---|---|---|
| GET | `/v1/me/notifications` | All notifications for current user |
| PATCH | `/v1/me/notifications/:id` | Mark single notification as read |
| GET | `/v1/me/notification-preferences` | Email/SMS toggle settings |
| PATCH | `/v1/me/notification-preferences` | Update preferences |

Notifications are created server-side on: booking confirmed, lesson reminder, cancellation, payment events, withdrawal status change.

---

## Admin Operations

All require `ADMIN` role.

| Method | Path | Description |
|---|---|---|
| GET | `/users` | List all users |
| GET | `/users/:id` | User detail |
| PATCH | `/users/:id/status` | Set user status (ACTIVE/DEACTIVATED/SUSPENDED) |
| DELETE | `/users/:id` | Permanently delete user |
| PATCH | `/v1/admin/tutors/:id/status` | Update tutor status |
| PATCH | `/v1/admin/tutors/:id/approve` | Approve onboarding, publish tutor profile |

---

## Subjects & Languages

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/subjects` | public | All teachable subjects |
| GET | `/languages` | public | All supported languages |

---

## Manual Testing Guide

All examples use `curl`. Replace `TOKEN` with a valid JWT from the sign-in flow. Base URL: `http://localhost:4000`.

---

### Auth

**Request magic link**
```bash
curl -X POST http://localhost:4000/auth/magic-link \
  -H "Content-Type: application/json" \
  -d '{"email": "student@example.com"}'
```
Expected: `200 { success: true, data: { message: "Magic link sent" } }`
Check your email inbox for the link.

**Verify magic link token**
```bash
curl -X POST http://localhost:4000/auth/verify-magic-link \
  -H "Content-Type: application/json" \
  -d '{"token": "<token-from-email-link>"}'
```
Expected: `200 { success: true, data: { access_token, refresh_token, user } }`

**Refresh token**
```bash
curl -X POST http://localhost:4000/auth/refresh \
  -H "Authorization: Bearer <REFRESH_TOKEN>"
```
Expected: new `access_token` + `refresh_token`.

**Logout**
```bash
curl -X POST http://localhost:4000/auth/logout \
  -H "Authorization: Bearer $TOKEN"
```

---

### Profile

**Get current user**
```bash
curl http://localhost:4000/v1/me \
  -H "Authorization: Bearer $TOKEN"
```

**Update profile**
```bash
curl -X PATCH http://localhost:4000/v1/me \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"fullName": "Alice Smith", "timezone": "Asia/Bangkok"}'
```

---

### Tutor Browsing

**List tutors (public)**
```bash
curl "http://localhost:4000/v1/tutors?subject=Math&language=English&minPrice=100&maxPrice=500"
```

**Tutor detail**
```bash
curl http://localhost:4000/v1/tutors/<tutorId>
```

---

### Booking & Lesson

**Create booking**
```bash
curl -X POST http://localhost:4000/bookings \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tutorId": "<tutor-uuid>",
    "scheduledAt": "2026-05-15T10:00:00Z",
    "duration": 60
  }'
```
Expected: `201 { data: { id, status: "PENDING_PAYMENT", price, expiresAt } }`
Note the `id` — you need it for checkout.

**Get booking**
```bash
curl http://localhost:4000/bookings/<bookingId> \
  -H "Authorization: Bearer $TOKEN"
```

**Cancel booking**
```bash
curl -X PATCH http://localhost:4000/bookings/<bookingId>/cancel \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"reason": "Schedule conflict"}'
```

---

### Payments & Wallet

> These tests cover the core payment scenarios. Run them in order for a complete end-to-end flow.

#### 1. Check wallet balance

```bash
curl http://localhost:4000/wallet/me \
  -H "Authorization: Bearer $TOKEN"
```
Expected: `{ balance: 0, currency: "THB" }` for a new student.

---

#### 2. Top up wallet via PromptPay (Stripe test mode)

```bash
curl -X POST http://localhost:4000/wallet/topup \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000}'
```
Expected:
```json
{
  "data": {
    "qrCodeUrl": "https://...",
    "providerRef": "pi_xxx"
  }
}
```

**In Stripe test mode**, simulate the payment instead of scanning the QR:
```bash
# Using Stripe CLI (install from https://stripe.com/docs/stripe-cli)
stripe trigger payment_intent.succeeded --add payment_intent:id=pi_xxx
```
Or trigger via Stripe Dashboard → Developers → Webhooks → Send test event.

**Verify top-up completed:**
```bash
curl -X POST http://localhost:4000/wallet/topup/verify \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"providerRef": "pi_xxx"}'
```
Expected: `{ status: "SUCCESS", balance: 1000 }`

**Check balance again:**
```bash
curl http://localhost:4000/wallet/me \
  -H "Authorization: Bearer $TOKEN"
```
Expected: `{ balance: 1000 }`

---

#### 3. Book a lesson and pay with wallet (wallet has enough funds)

```bash
# Step 1 — Create booking
curl -X POST http://localhost:4000/bookings \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tutorId": "<tutor-uuid>",
    "scheduledAt": "2026-05-20T14:00:00Z",
    "duration": 60
  }'
# Save the returned id as BOOKING_ID

# Step 2 — Checkout (wallet pays full amount)
curl -X POST http://localhost:4000/bookings/$BOOKING_ID/checkout \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```
Expected when wallet ≥ lesson price:
```json
{
  "data": {
    "status": "CONFIRMED",
    "paymentMethod": "WALLET"
  }
}
```
Verify lesson status is now `CONFIRMED`:
```bash
curl http://localhost:4000/bookings/$BOOKING_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

#### 4. Book a lesson with insufficient wallet balance (Stripe top-up shortfall)

```bash
# Drain wallet first or use a fresh account with balance 0

# Step 1 — Create booking for a 1000 THB lesson with 0 balance
curl -X POST http://localhost:4000/bookings \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tutorId": "<tutor-uuid>", "scheduledAt": "2026-05-21T10:00:00Z", "duration": 60}'

# Step 2 — Checkout — wallet insufficient, Stripe takes over
curl -X POST http://localhost:4000/bookings/$BOOKING_ID/checkout \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```
Expected:
```json
{
  "data": {
    "status": "PENDING_PAYMENT",
    "clientSecret": "pi_xxx_secret_yyy",
    "qrCodeUrl": "https://..."
  }
}
```
Lesson stays `PENDING_PAYMENT`. Now simulate payment success:
```bash
stripe trigger payment_intent.succeeded --add payment_intent:id=pi_xxx
```
After webhook fires, verify lesson is confirmed:
```bash
curl http://localhost:4000/bookings/$BOOKING_ID \
  -H "Authorization: Bearer $TOKEN"
# Expected: status: "CONFIRMED"
```

---

#### 5. Save a payment method (card)

Use Stripe test card `4242 4242 4242 4242` in the frontend checkout page to get a `PaymentMethod` ID, then:

```bash
curl -X POST http://localhost:4000/payments/methods \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"paymentMethodId": "pm_xxx", "setAsDefault": true}'
```

**List saved methods:**
```bash
curl http://localhost:4000/payments/methods \
  -H "Authorization: Bearer $TOKEN"
```

**Set default:**
```bash
curl -X PUT http://localhost:4000/payments/methods/default \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"paymentMethodId": "pm_xxx"}'
```

**Delete a method:**
```bash
curl -X DELETE http://localhost:4000/payments/methods/pm_xxx \
  -H "Authorization: Bearer $TOKEN"
```

---

#### 6. Tutor wallet — check earnings

*(As a tutor whose lesson was just confirmed)*

```bash
curl http://localhost:4000/tutor-wallet/summary \
  -H "Authorization: Bearer $TUTOR_TOKEN"
```
Expected:
```json
{
  "data": {
    "balance": 800,
    "totalEarnings": 1000,
    "totalCommission": 200,
    "pendingPayouts": 0
  }
}
```
(STARTER rank: 20% commission on 1000 THB lesson → tutor gets 800)

---

#### 7. Tutor withdrawal request

```bash
curl -X POST http://localhost:4000/tutor-wallet/withdraw \
  -H "Authorization: Bearer $TUTOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500,
    "method": "PROMPTPAY",
    "accountInfo": { "phoneNumber": "0812345678" }
  }'
```
Expected: `201 { data: { withdrawalId, status: "PENDING", amount: 500 } }`

**Check withdrawal history:**
```bash
curl http://localhost:4000/tutor-wallet/withdrawals \
  -H "Authorization: Bearer $TUTOR_TOKEN"
```

---

#### 8. Stripe webhook — test locally

Install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and forward webhooks to your local backend:

```bash
stripe listen --forward-to http://localhost:4000/payments/stripe/webhook
```

Stripe CLI will print a signing secret starting with `whsec_`. Put that in `STRIPE_WEBHOOK_SECRET` for local testing. Then trigger events:

```bash
# Simulate PromptPay payment success
stripe trigger payment_intent.succeeded

# Simulate payment failure
stripe trigger payment_intent.payment_failed
```

Watch the backend logs to confirm the webhook handler fires and the transaction/lesson status updates.

---

#### 9. Transaction history

```bash
# Student transactions
curl "http://localhost:4000/wallet/me/transactions?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"

# Filter by type
curl "http://localhost:4000/wallet/me/transactions?type=TOPUP" \
  -H "Authorization: Bearer $TOKEN"
```

Transaction types: `TOPUP`, `PAYMENT`, `REFUND`, `COMMISSION`, `WITHDRAW`
Transaction statuses: `PENDING`, `SUCCESS`, `FAILED`

---

### Chat

**List conversations**
```bash
curl http://localhost:4000/chat/conversations \
  -H "Authorization: Bearer $TOKEN"
```

**Load messages with a peer**
```bash
curl "http://localhost:4000/chat/messages?peerUserId=<uuid>" \
  -H "Authorization: Bearer $TOKEN"
```

**Send a message**
```bash
curl -X POST http://localhost:4000/chat/messages \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"recipientId": "<uuid>", "content": "Hello!"}'
```

**Mark message as read**
```bash
curl -X PATCH http://localhost:4000/chat/messages/<messageId>/read \
  -H "Authorization: Bearer $TOKEN"
```

---

### File Upload

**Get presigned S3 URL**
```bash
curl "http://localhost:4000/upload/presigned?fileName=avatar.jpg&fileType=image/jpeg&folder=avatars" \
  -H "Authorization: Bearer $TOKEN"
```
Expected: `{ uploadUrl: "https://s3.amazonaws.com/...", fileUrl: "https://cdn.example.com/avatars/avatar.jpg" }`

**Upload file to S3 directly**
```bash
curl -X PUT "<uploadUrl>" \
  -H "Content-Type: image/jpeg" \
  --data-binary @./avatar.jpg
```

**Delete file**
```bash
curl -X DELETE http://localhost:4000/upload/deleteObject \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"key": "avatars/avatar.jpg"}'
```

---

### Admin

**List all users**
```bash
curl http://localhost:4000/users \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Suspend a user**
```bash
curl -X PATCH http://localhost:4000/users/<userId>/status \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "SUSPENDED"}'
```

**Approve a tutor**
```bash
curl -X PATCH http://localhost:4000/v1/admin/tutors/<tutorId>/approve \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

---

## Stripe Test Cards

| Scenario | Card Number | Expiry | CVC |
|---|---|---|---|
| Successful payment | `4242 4242 4242 4242` | any future | any |
| Requires 3DS auth | `4000 0025 0000 3155` | any future | any |
| Declined | `4000 0000 0000 9995` | any future | any |
| Insufficient funds | `4000 0000 0000 9995` | any future | any |

PromptPay in test mode always succeeds when triggered via Stripe CLI (`stripe trigger payment_intent.succeeded`).

---

## Key Cron Jobs

| Job | Schedule | Action |
|---|---|---|
| Expire unpaid bookings | every minute | `PENDING_PAYMENT` lessons older than 15 min → `EXPIRED` |
| Auto-complete lessons | every minute | `CONFIRMED` lessons past end time → `COMPLETED`, credit tutor earnings |

---

## Role Reference

| Role | Capabilities |
|---|---|
| `STUDENT` | Browse tutors, book lessons, pay, chat, leave reviews |
| `TUTOR` | Complete onboarding, manage availability, view earnings, withdraw, chat |
| `ADMIN` | Approve tutors, manage users, view all data |
| `MANAGER` | (reserved for future use) |
