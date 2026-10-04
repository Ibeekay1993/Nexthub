# Nexthub marketplace architecture

The current frontend uses React, Vite, and TypeScript with a browser-only demo repository. It demonstrates product concepts and is not a production marketplace backend.

## Feature areas

- Discovery: open service catalogue, search, filters, category pages, provider profiles, and saved profiles.
- Requests: custom request capture, provider quote, quote review, acceptance, and job detail.
- Work: job status, conversation preview, completion submission, customer confirmation, and dispute branch.
- Accounts: customer, individual provider, business, and operations workspace previews.
- Trust: provider verification states and job-backed review model. The demo does not claim that checks have occurred.
- Operations: intended user, catalogue, verification, job, payment, dispute, report, audit, and settings queues.

## Domain boundaries

Model `profiles`, `provider_profiles`, `businesses`, `business_members`, `service_categories`, `services`, `service_proposals`, `provider_services`, `service_areas`, `availability`, `tasks`, `quotes`, `bookings`, `job_events`, `conversations`, `messages`, `attachments`, `portfolios`, `reviews`, `favourites`, `verifications`, `payment_transactions`, `payment_allocations`, `settlements`, `payouts`, `completion_submissions`, `completion_confirmations`, `disputes`, `dispute_evidence`, `refunds`, `notifications`, `audit_logs`, and `admin_actions` as separate production concepts.

Store NGN values as integer kobo with an explicit currency code. Keep reviews connected to completed jobs and authorization decisions on the server. The browser must not calculate trusted charges, claim a role, verify a payment callback, or initiate settlement.

## Marketplace lifecycle

`REQUESTED → QUOTED → ACCEPTED → PAYMENT_PENDING → FUNDED → SCHEDULED → PROVIDER_EN_ROUTE → IN_PROGRESS → PROVIDER_MARKED_COMPLETE → CUSTOMER_CONFIRMATION → COMPLETED → SETTLEMENT_PENDING → SETTLED`

Dispute branch: `PROVIDER_MARKED_COMPLETE → CUSTOMER_DISPUTES → DISPUTE → ADMIN_REVIEW → COMPLETED / REFUND / ADJUSTMENT`.

Additional charge branch: `PROVIDER_REQUEST → reason and amount → CUSTOMER_APPROVAL → server updates agreed scope and transaction allocation`. No provider action should silently change an accepted price.

## Production services

- Supabase Auth for identity and role-aware sessions.
- PostgreSQL with row-level security policies for user-owned records.
- Server-side functions for quote acceptance, payment status, extra-charge approval, dispute decisions, settlement, refunds, and payout.
- Supabase Storage with private buckets, signed upload/view access, type and size limits, and retention rules.
- Idempotency keys and verified gateway callbacks for payment and payout operations.
- Realtime only for active conversations and narrowly scoped job status events.
- Audit events for financial and privileged admin decisions.

No service-role credentials, gateway secrets, or authorization decisions belong in the frontend.
