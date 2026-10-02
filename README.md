# Nexthub

Nexthub is an open Nigerian services marketplace for customers, independent providers and businesses.

## Frontend architecture

- assets/js/data.js — demo domain data
- assets/js/state.js — browser state and persistence
- assets/js/ui.js — shared UI helpers
- assets/js/pages.js — page/presentation functions
- assets/js/app.js — routing and event orchestration
- assets/css/app.css — responsive design system
- netlify.toml — Netlify SPA fallback
- .github/workflows/quality.yml — JavaScript syntax validation

## Functional frontend flows

Service catalogue, provider search, location filtering, sorting, provider profiles, portfolios, ratings, saved providers, hire requests, custom task posting, browser-persistent jobs, customer settings, provider onboarding/workspace, business workspace, admin workspace and authentication UI.

## Production boundary

The frontend is intentionally dependency-light for immediate Netlify deployment. Production functionality should replace demo browser state with Supabase Auth/Postgres/Storage behind a typed service layer.

Recommended domains:

auth → profiles → services → provider_services → tasks → quotes → bookings → conversations/messages → reviews → payments/payouts → disputes → notifications → audit_logs

Keep realtime limited to active conversations and explicitly required job-status events. Never expose Supabase service-role keys, payment secrets or privileged credentials in browser code.
