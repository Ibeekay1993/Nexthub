# Nexthub Marketplace Architecture

Nexthub is an open Nigerian marketplace for services. The product is intentionally designed around two first-class sides of the marketplace: the requester/customer and the provider/business.

## Product pillars

1. Discovery — search by service, skill, location, availability and trust signals.
2. Open catalogue — providers can publish existing services or propose legitimate services that are not yet catalogued.
3. Structured requests — every job has scope, location, schedule, budget and attachments.
4. Quotes — providers can respond with price, scope, assumptions, schedule and expiry.
5. Booking — acceptance creates a clear agreed job.
6. Payment lifecycle — customer payment, allocation, platform fee, settlement and payout are separate concepts.
7. Work tracking — status, messages, progress updates and evidence stay attached to the job.
8. Completion — provider submits completion evidence; customer confirms or reports a problem.
9. Disputes — disputed jobs pause settlement and enter an evidence/review workflow.
10. Reputation — reviews are tied to completed jobs rather than arbitrary profile ratings.
11. Trust — identity, business and qualification verification are separate signals.
12. Operations — admin tooling covers users, services, verification, jobs, payments, disputes, reports and audit history.

## Marketplace lifecycle

REQUESTED
→ QUOTED
→ ACCEPTED
→ PAYMENT_PENDING
→ FUNDED
→ SCHEDULED
→ PROVIDER_EN_ROUTE
→ IN_PROGRESS
→ PROVIDER_MARKED_COMPLETE
→ CUSTOMER_CONFIRMATION
→ COMPLETED
→ SETTLEMENT_PENDING
→ SETTLED

Alternative branch:

PROVIDER_MARKED_COMPLETE
→ CUSTOMER_DISPUTES
→ DISPUTE
→ ADMIN_REVIEW
→ COMPLETE or REFUND/ADJUSTMENT

## Payment model

Keep these records separate:

- payment_transactions — what the customer paid and gateway state
- payment_allocations — which job/order the money belongs to
- settlements — what the provider is owed after fees/adjustments
- payouts — movement from Nexthub settlement balance to provider payout destination
- refunds — money returned to the customer

Do not expose payment secrets or service-role credentials in the browser.

## Recommended production database

- profiles
- provider_profiles
- businesses
- business_members
- service_categories
- services
- service_proposals
- provider_services
- service_areas
- availability
- tasks
- quotes
- bookings
- job_events
- conversations
- messages
- attachments
- portfolios
- portfolio_items
- reviews
- favourites
- follows
- verifications
- payment_transactions
- payment_allocations
- settlements
- payouts
- completion_submissions
- completion_confirmations
- disputes
- dispute_evidence
- refunds
- notifications
- audit_logs
- admin_actions

## Security and scale

- Supabase Auth for identity.
- PostgreSQL with strict RLS for every user-owned table.
- Server-side functions for privileged state transitions and payment operations.
- Storage buckets with controlled upload types/sizes and signed access where appropriate.
- Database indexes for provider search, service matching, job status, user ownership and payment lookups.
- Pagination everywhere a collection can grow.
- Realtime only for active conversations and narrowly scoped job events; do not enable it globally.
- Audit every privileged admin and financial action.
- Idempotency keys for payment callbacks and settlement/payout operations.
- Server-side validation for all state transitions.
- Never trust client-submitted prices, fees, settlement amounts or role claims.

## Frontend direction

The current repository is a dependency-light UX prototype. It now demonstrates the major product journeys and a substantially richer information architecture without pretending that localStorage is a production backend.

Production implementation should migrate the same domain boundaries into React + Vite + TypeScript, then connect Supabase Auth/Postgres/Storage and a Nigerian payment gateway behind server-side functions.

The Netlify frontend should remain stateless with environment variables for public configuration only.
