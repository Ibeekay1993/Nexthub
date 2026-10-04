# Nexthub

Nexthub is a Nigerian marketplace concept for finding and offering local services, trade work, errands, transport, and remote professional services.

## Run locally

Requires Node.js 20 or later.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

## Frontend structure

- `src/domain.ts` — marketplace types and clearly labeled sample records.
- `src/store.ts` — browser-only demo state. This is not an API, auth system, ledger, or source of truth.
- `src/App.tsx` — route table and shared layout.
- `src/components.tsx` — shared navigation, metadata, search, provider cards, and empty states.
- `src/features/CustomerWorkspace.tsx` — buyer dashboard, requests, jobs, and shortcuts.
- `src/features/Discovery.tsx` — marketplace search, category catalogue, and sample provider profiles.
- `src/features/Requests.tsx` — demo task, quote, job, change approval, completion, and dispute flows.
- `src/features/Workspaces.tsx` — separate provider, business, and admin workspace previews.
- `src/features/Account.tsx` — account identity boundary, workspace selection, and local demo messaging.
- `src/app.css` — design tokens, components, responsive layouts, focus states, and reduced-motion support.
- `public/` — redirects, crawl rules, sitemap, and response headers for the static Netlify site.
- `docs/PRODUCT-REVIEW-AND-IMPLEMENTATION-PLAN.md` — repository findings, architecture decision, domain model, journeys, and phases.

## Demo boundary

Listings, jobs, and local interactions exist to preview the product. They stay in the current browser and are not sent to service providers. Sign-in, identity verification, secure uploads, real-time messaging, payments, refunds, disputes administration, settlements, and payouts are not connected. No payment or identity claims should be inferred from this site.

The app keeps the customer, provider, business, and admin workspaces visually and navigationally separate. Selecting a workspace changes the local preview only; it is not a permission check. Job detail routes also stay inside each workspace. A single account with multiple capabilities is a production identity model, not an implemented authentication feature.

## Production integration

Production needs Supabase Auth and PostgreSQL with row-level security, controlled storage, and server-side functions for role checks and state transitions. A Nigerian gateway must create and verify transactions on the server. Keep payment transactions, job allocations, platform fees, provider settlements, payouts, refunds, and disputes as separate records. The frontend must not set trusted amounts, role claims, or settlement values.
