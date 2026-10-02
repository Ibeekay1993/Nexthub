# Nexthub

Nexthub is an open service marketplace for Nigeria. The product is designed around an extensible catalogue: providers can offer multiple services, customers can post custom work, and administrators can later moderate new service categories.

## Current architecture

This first production-ready frontend uses a dependency-free ES module architecture so it can deploy directly to Netlify without a build step or framework lock-in.

- `index.html` — application shell and metadata
- `assets/css/app.css` — design system and responsive layout
- `assets/js/data.js` — marketplace taxonomy and seed data
- `assets/js/state.js` — client state and local persistence
- `assets/js/ui.js` — reusable rendering and modal helpers
- `assets/js/app.js` — application routing, interactions and page composition
- `netlify.toml` — Netlify SPA fallback and Node runtime

## Product architecture

The UI is intentionally ready for a real backend. The eventual data model should use profiles, services, provider_services, service_requests, offers, bookings, messages, reviews, portfolios, verification_records, favourites, notifications, payments, disputes and audit_logs. The service catalogue should be data-driven rather than hard-coded into provider profiles.

## Deployment

The repository can be deployed to Netlify as-is. Set the publish directory to the repository root. No environment variables are required for the current frontend demo.

## Production backend

When Supabase is connected, replace the local state adapter with repository/service modules for authentication, Postgres/RLS, Storage, messaging, notifications and payments. Keep UI components independent from Supabase so the backend can evolve without rewriting the marketplace.