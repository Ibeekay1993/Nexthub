# Nexthub product review and implementation plan

**Review date:** 4 October 2026
**Scope:** Repository and deployed homepage supplied with the request
**Evidence:** `main` at `7740cc1`; local source, README, architecture notes, Netlify configuration, existing validation script, and a browser visit to the deployed URL.

## 1. Current architecture assessment

Nexthub is a static Netlify site built from five native JavaScript modules and one 27 KB stylesheet. `app.js` implements a small hash router and binds page events after each `innerHTML` render. `pages.js` contains roughly 38 KB of string-built page markup. `data.js` holds hard-coded catalogue, provider, review, job, and platform-stat records. `state.js` stores a shallow object in `localStorage`. There is no dependency installation, typed domain layer, API client, server, database, auth provider, upload service, payment integration, automated browser test, or route-level metadata.

This is a useful low-cost visual prototype, but it is not a sound base for growing the full marketplace by continuing to add pages to the current files. Rendering data by concatenating HTML also makes encoding, validation, accessibility, and route behavior harder to review. A hash-only router limits direct linking and public-page SEO. The localStorage session can be edited by the visitor and cannot enforce authorization or financial rules.

**Architecture decision:** Keep Netlify as the static delivery target. Replace the string-template application with React, Vite, and TypeScript, organized around marketplace features and typed domain models. Put navigation behind a real URL router, UI data access behind repositories, and business state transitions behind explicit domain actions. Use a local demo repository only for the self-contained prototype. Keep Supabase, storage, notifications, and payment work behind interfaces until project credentials and server-side functions exist. The browser must never determine authorization, final charges, platform fees, refunds, or provider settlement values.

## 2. Current UX and product problems

- The deployed `https://taskstify.netlify.app/` showed a blank white page in the browser during this review. The repository's local source passes its syntax-only check, so the deployment needs runtime verification as well.
- Discovery has only text matching and location substring matching. The visible filter labels on the providers page are not controls; the search-page filters are static text and do not affect results. Category matching compares a category's first word with provider text and misses many valid service matches.
- The homepage displays sample marketplace totals and ratings as platform-wide proof. Provider, review, job, payment, business, provider-dashboard, and admin examples are also presented without a consistent demo label.
- Sign-up and sign-in accept any email/password and immediately create a local session. Password recovery only shows an alert. There is no authentication boundary or verified identity state.
- Posting a task writes browser storage and displays a JavaScript alert. Requests cannot progress through quotes, acceptance, funding, schedule, work, completion evidence, customer confirmation, dispute review, refund, settlement, or payout.
- Completion is only an alert. Messaging, notifications, reviews, payments, provider services, verification, and admin moderation are largely static. Several apparent actions have no handler.
- The mobile layout collapses some grids, but hides the search filter panel and conversation list rather than providing a phone-specific filter or conversation navigation pattern. The mobile menu has no `aria-expanded` state.
- Markup has no skip link or route focus management. Search inputs remove their outline; the stylesheet has no `:focus-visible` or reduced-motion treatment. Emoji and text glyphs substitute for several icons.
- SEO consists of a single static title and description, `robots.txt`, and a manifest. There are no social metadata tags, canonical URL, structured data, sitemap, or indexable category/provider pages because the router uses hashes.

## 3. Missing capabilities

The present UI does not implement the actual marketplace transaction model or role permissions. Missing as operational workflows are: quote creation and comparison; an agreed-scope booking; a transaction/allocation/fee ledger; payment gateway verification; provider schedule and availability; job event history; messaging persistence; completion submissions with evidence and materials; customer confirmation; additional-charge approval; dispute evidence and admin decisions; refunds; settlement and payout; verified-job reviews; provider/business verification; provider service proposals and moderation; business teams; audit logs; and server-enforced authorization. There is no durable backend, so these must not be described as production-ready or simulated as real money movement.

## 4. Competitor-informed opportunities

Nigerian service marketplaces commonly foreground local service categories, location/radius discovery, profiles, verification, favorites, and direct quote requests. ArtisanConnect describes map/radius discovery and quote requests; MSpace describes local trade discovery alongside reporting, disputes, and identity review; Connect Naija emphasizes a broad Nigerian artisan/service directory and fast contact. Those are useful market conventions, not independent validation of each competitor's actual reliability.

Nexthub can make a clearer product distinction by supporting both local, in-person work and remote professional services, while giving each request an auditable path from scope and quote through evidence, customer confirmation, and resolution. For Nigeria, prioritize natural-language service queries, city/area-aware search (including common neighborhood spellings), NGN price presentation, provider travel radius, offline-friendly request drafting, and clear explanation of what verification does and does not mean. Differentiate on transparent work agreements and reviewable job history; do not claim escrow, vetting, or protection until those operations exist.

References: [ArtisanConnect](https://www.artisanconnect.app/), [MSpace](https://mspaceapp.com/), [Connect Naija](https://connectnaija.group/).

## 5. Proposed Nexthub product architecture

```text
React UI and route layouts
  ├── discovery (search, filters, categories, profiles, saved)
  ├── requests (custom tasks, provider requests, quotes, booking)
  ├── work (schedule, status events, messaging, evidence, completion)
  ├── trust (verification states, portfolio, job-backed reviews)
  ├── accounts (customer, provider, business, admin)
  └── operations (moderation, disputes, reports, audit history)
Typed domain actions and validation
Repository interfaces (demo/local implementation now; Supabase later)
Server-side functions for authorization and financial transitions
Supabase Auth / PostgreSQL RLS / Storage / notifications / payment gateway
```

The static demo adapter is explicitly non-production. Define separate entities for `Task`, `Quote`, `Booking`, `JobEvent`, `CompletionSubmission`, `PaymentTransaction`, `PaymentAllocation`, `Settlement`, `Payout`, `Refund`, `Dispute`, `Verification`, and `AuditEvent`. Each carries identifiers, ownership, timestamps, and status transitions. Financial records are immutable events/records; changes use server-validated operations and idempotency keys. A browser-only implementation must label its sample data and must not imply that payment was collected or that an identity check took place.

## 6. Proposed information architecture

```text
Public
├── /                         marketplace home and service search
├── /services                 open catalogue
│   └── /services/:slug       category / service landing page
├── /providers                discovery and filters
│   └── /providers/:slug      public provider profile and portfolio
├── /post-a-task              custom request
├── /sign-in, /sign-up, /reset-password
Customer workspace
├── /account, /account/settings, /saved, /notifications
├── /jobs, /jobs/:id, /jobs/:id/messages
├── /jobs/:id/payment, /jobs/:id/review, /jobs/:id/dispute
Provider workspace
├── /provider/onboarding, /provider/overview
├── /provider/services, /provider/availability, /provider/portfolio
├── /provider/leads, /provider/quotes, /provider/jobs
├── /provider/verification, /provider/earnings, /provider/payouts
Business workspace
├── /business, /business/team, /business/jobs, /business/billing
Admin workspace
└── /admin/{users,services,verification,jobs,payments,disputes,reports,audit,settings}
```

Keep public discovery pages crawlable with path URLs and page-specific title, description, canonical URL, Open Graph tags, and service/provider structured data when the page content supports it. Keep account, messaging, and admin routes private/noindex after real auth is configured. Generate a sitemap from actual indexable routes; do not publish private hash routes as SEO landing pages.

## 7. Proposed design system

Use a warm paper background, deep forest green for primary actions, a restrained lime accent for discovery cues, and ink/border/muted semantic tokens. Keep the existing green identity but remove the saturated hero wash and generic floating demo cards. Use a distinctive editorial sans-serif with a compact display face only where it improves hierarchy; preserve readable 16px body text. Prefer service photography or real provider portfolio media once supplied. Use simple consistent inline SVG icons rather than emoji. Design dense discovery and operations views with clear table/list hierarchy, useful location and trust labels, visible price ranges, and explicit unavailable/demo states. Keep cards square enough to avoid an all-card dashboard. Mobile gets a compact persistent navigation, bottom-sheet filters, one-column provider profile actions, a proper conversation list/detail transition, and thumb-sized controls. Respect visible focus, keyboard use, contrast, semantic labels, and reduced motion.

## 8. Proposed user journeys

1. **Find a provider:** enter a natural-language need and Nigerian location → review relevant services/providers → adjust category, budget, rating, availability, provider type, and verification filters → compare profiles, scope, starting price, travel area, and evidence → request a quote or save.
2. **Post a custom task:** describe result, category, location, timing, budget range, and evidence → review a concise request summary → publish → receive and compare quotes → accept a clearly scoped quote → proceed to a server-confirmed payment step when integrated.
3. **Deliver work:** agree schedule → record arrival and progress → send scope changes as approval requests → submit notes, timestamp, materials, receipts, and before/after evidence → customer confirms or opens a dispute → only server-side policy/admin action can authorize settlement, adjustment, or refund → request a review tied to the completed job.
4. **Provider onboarding:** choose individual or business → build a profile and service area → propose existing or new services → set transparent pricing and availability → submit relevant phone/identity/business/qualification checks → see each verification state and use the workspace to respond to leads.
5. **Admin operations:** review queue → inspect submitted evidence and history → record moderation/verification/job/payment/dispute decisions with reason → preserve an audit trail and notify affected parties.

## 9. Proposed domain model

Core relations: `profiles` (account identity/role), `provider_profiles` and `businesses`; `business_members`; `service_categories`, `services`, `service_proposals`, `provider_services`, `service_areas`, `availability`; `tasks` → `quotes` → `bookings` → `job_events`; `conversations`, `messages`, `attachments`; `portfolios`, `portfolio_items`; `verifications`; `completion_submissions` and `completion_confirmations`; `reviews`; `favourites`; `payment_transactions` → `payment_allocations`; `settlements`; `payouts`; `refunds`; `disputes`, `dispute_evidence`; `notifications`; and `audit_logs` / `admin_actions`.

Relationships must tie reviews to completed jobs, transaction allocations to a job/order, settlement to confirmed work or a resolved dispute, and payout to a provider/business destination verified server-side. Store currency in minor units (kobo) as integers with currency code. Store sensitive verification material in access-controlled storage with explicit retention policy. RLS is required per user-owned record; privileged changes run server-side and are audited.

## 10. Implementation phases

1. **Stabilize and establish foundations:** diagnose the blank deployed experience; migrate the front-end to React/Vite/TypeScript; retain Netlify static hosting; add a route shell, feature boundaries, typed domain shapes, demo repository, clean metadata, and explicit demo labeling. Preserve no fake platform proof.
2. **Make discovery useful:** accessible search, functional filters and sorting, broad catalogue proposal path, provider profile, portfolios, service areas, saved providers, public SEO landing routes, responsive search/filter behavior.
3. **Complete request and provider work flows:** provider onboarding; customer task draft/review; quote creation/comparison/acceptance; job timeline; messages; notifications; availability; additional-charge consent; completion evidence; customer confirmation/dispute UI.
4. **Trust, business, and operations:** verification submissions/states; job-tied reviews; business team experience; service moderation; admin queues; dispute decision model; audit log views.
5. **Backend and money (requires configured integrations):** Supabase Auth, schema and migrations, RLS, private storage policies, server functions, gateway callbacks, transaction/allocation, settlement/payout/refund flows, transactional notifications. Never mark this phase as done with local mocks.
6. **Audit:** exercise each route and workflow; verify mobile layouts, keyboard, labels, validation, loading/error/empty states, crawlability, metadata, privacy boundaries, and Netlify deployment. Record remaining integration work plainly.

## Current implementation boundary

This repository contains no backend credentials, payment gateway configuration, verification provider configuration, or transactional email setup. The implementation can deliver a credible, interactive frontend and domain-safe demo behavior. Real sign-in, identity checks, uploads, payment collection, dispute adjudication, refunds, settlement, payouts, and multi-user synchronization require configured backend services and server-side operations.

## Implementation status and final audit

**Local implementation completed:** The legacy string-template SPA was replaced with React, Vite, TypeScript, and URL routing. Work is grouped into discovery, requests, workspace, and account feature modules. The browser-only repository is clearly labeled as a demo. Search and filters operate on the sample catalogue; task creation, quote submission/acceptance, job progression, customer approval or rejection of extra charges, completion submission, customer confirmation, and dispute reporting are interactive. Payment, settlement, identity, and admin decisions do not claim to run in the browser.

The frontend includes provider and business examples without invented ratings or verification badges, an explicit demo banner, responsive navigation and forms, accessible labels/focus treatment, reduced-motion styling, route-specific metadata, canonical/social tags, structured data, Netlify SPA fallback and headers, robots policy, and a sitemap limited to public category pages and the homepage. Example provider profiles and the provider directory are `noindex` until genuine provider data exists. `README.md` documents the run commands and production boundary; `PRODUCT-ARCHITECTURE.md` records domain separation and server requirements.

**Audit performed:** TypeScript check and production build pass. The local app was opened in the browser, and 40 routes across public discovery, customer request/job, provider, business, operations, and account areas were checked for expected page headings, including the not-found route. The task-to-quote-to-acceptance path, extra-charge consent, completion, dispute reason, and no-payment messaging were exercised through the UI. This was a manual browser check, not an automated end-to-end suite or formal WCAG audit. A desktop viewport was visually inspected; a forced device-size screenshot was not available in this session.

**Not completed / production blockers:** There is no configured backend or authorized account for authentication, durable multi-user persistence, private uploads, real messaging/notifications, identity/business checks, payments, refunds, dispute adjudication, settlements, payouts, or business role permissions. Admin screens are previews, not privileged controls. Provider, review, and job records remain illustrative examples. Frontend React routes are client-rendered; static Netlify hosting alone does not prerender each category page. Production launch still requires backend integration, security review, real content, broader mobile/accessibility QA, automated workflow tests, and a deployment check.

**Deployment status:** No deployment was performed. During the original review, the supplied Netlify URL displayed a blank page and still served the legacy build when fetched. The source changes here are local and do not repair the hosted URL until the project is deployed with the updated Netlify build settings.
