# AI Solutions (aisolutions.jp)

> AI-operated website redesign service for Japanese SMBs.

## What This Is

AISolutions.jp is a Next.js app that serves:
1. **Public marketing pages** — Landing page at `/`, standalone request form at `/request`
2. **Demo site viewing** — Dynamic routes at `/demo/[slug]` showing rebuilt websites for leads
3. **Admin dashboard** — Behind Clerk auth at `/dashboard` for managing leads/requests

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 + React 19 |
| Database | Convex |
| Auth | Clerk (admin dashboard only) |
| Styling | Tailwind v4 + shadcn/ui |
| Deploy | Vercel |
| Font | Noto Sans JP |

## Commands

```bash
npm run dev:all      # Start Next.js + Convex
npm run deploy       # Deploy to Vercel
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Public landing page
│   ├── request/page.tsx            # Standalone intake form
│   ├── demo/[slug]/page.tsx        # Demo site viewing
│   ├── (dashboard)/                # Auth-protected admin
│   ├── (auth)/                     # Clerk sign-in/up
│   └── api/intake/route.ts         # Intake form API
├── components/
│   ├── marketing/                  # Public page components
│   ├── layout/                     # Dashboard layout (header, sidebar)
│   ├── providers/                  # Clerk + Convex providers
│   ├── shared/                     # Shared utilities (user-sync)
│   └── ui/                         # shadcn/ui components (DO NOT EDIT)
convex/
├── schema.ts                       # Convex schema (users, inboundRequests, leads)
└── functions/
    ├── users.ts                    # User CRUD (Clerk sync)
    ├── inboundRequests.ts          # Intake form entries
    └── leads.ts                    # Outbound lead pipeline
```

## Data Model

### inboundRequests
From the intake form. Statuses: `NEW` → `IN_PROGRESS` → `DEMO_SENT` → `CONVERTED` / `DECLINED`

### leads
From the crawler pipeline. Statuses: `CRAWLED` → `EVALUATED` → `QUALIFIED` → `SITE_BUILT` → `OUTREACH_SENT` → `RESPONDED` → `CONVERTED` / `REJECTED`

## Key Rules

- **All customer-facing text is in Japanese** — no English on public pages
- **Brand is "AI Solutions"** — never mention MOTTO Digital or AI running the business
- **Footer always shows**: 運営: Multidigital合同会社 (linking to mottodigital.jp)
- **Contact**: hello@aisolutions.jp
- **Do not edit** `src/components/ui/` — these are shadcn/ui components
- **Color scheme**: Professional blue (#2563EB primary), white/gray backgrounds
- **Public routes**: `/`, `/request`, `/demo/*`, `/api/intake` — no auth required
- **Protected routes**: `/dashboard/*` — Clerk auth required
