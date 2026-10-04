import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import type { Provider, Role } from './domain';
import { setRole, toggleSaved, useDemoState } from './store';
export function Icon({ name }: { name: 'search' | 'pin' | 'arrow' | 'check' | 'menu' | 'heart' }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10"/></>, check: <path d="m5 12 4 4L19 6"/>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>, heart: <path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2Z"/>,
  };
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}


export function Shell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const state = useDemoState();
  const routeWorkspace = workspaceForPath(location.pathname);
  const activeWorkspace = routeWorkspace ?? (location.pathname === '/account' ? state.role : 'Customer');
  const workspaceHref: Record<Role, string> = { Customer: '/customer', Provider: '/provider', Business: '/business', Admin: '/admin' };
  const workspaceNav = workspaceNavigation[activeWorkspace];
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [location.pathname]);
  useEffect(() => { if (routeWorkspace && state.role !== routeWorkspace) setRole(routeWorkspace); }, [routeWorkspace, state.role]);
  function switchWorkspace(role: Role) { setRole(role); navigate(workspaceHref[role]); }
  return <><a className="skip-link" href="#main">Skip to content</a>
    <div className="demo-bar"><span className="demo-dot"/> Demo marketplace <span className="demo-divider">·</span> Sample profiles and browser-only changes. No payment or identity checks.</div>
    <header className="header"><Link className="wordmark" to="/" aria-label="Nexthub home">next<span>hub</span></Link>
      <nav className="desktop-nav" aria-label={`${activeWorkspace} navigation`}>{(routeWorkspace ? workspaceNav.primary : publicNavigation).map(([to, label]) => <NavLink to={to} key={to}>{label}</NavLink>)}</nav>
      <div className="header-actions"><label className="workspace-picker"><span className="sr-only">Switch workspace preview</span><select aria-label="Switch workspace preview" value={activeWorkspace} onChange={(event) => switchWorkspace(event.target.value as keyof typeof workspaceHref)}>{Object.keys(workspaceHref).map((role) => <option key={role} value={role}>{role} workspace</option>)}</select></label><Link className="button button-light account-link" to="/account">Account</Link><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}><Icon name="menu"/></button></div>
    </header>
    {menuOpen && <nav className="mobile-nav" aria-label={`${activeWorkspace} navigation`}>{(routeWorkspace ? workspaceNav.primary : publicNavigation).map(([to, label]) => <Link to={to} key={to}>{label}</Link>)}<Link to="/account">Account</Link></nav>}
    {routeWorkspace && <div className="workspace-frame"><aside className="workspace-rail" aria-label={`${activeWorkspace} workspace sections`}><p className="workspace-rail-title">{activeWorkspace} workspace</p>{workspaceNav.all.map(([to, label]) => <NavLink end={to === workspaceHref[activeWorkspace]} to={to} key={to}>{label}</NavLink>)}</aside><main id="main" className="workspace-content" tabIndex={-1}>{children}</main></div>}
    {!routeWorkspace && <main id="main" tabIndex={-1}>{children}</main>}
    <footer className="footer">{routeWorkspace ? <div className="footer-inner workspace-footer"><div><Link className="wordmark wordmark-inverse" to="/">next<span>hub</span></Link><p>{activeWorkspace} workspace preview</p></div><div><b>{activeWorkspace} workspace</b>{workspaceNav.primary.map(([to, label]) => <Link to={to} key={to}>{label}</Link>)}</div><div><b>Account</b><Link to="/account">Account and workspace switcher</Link></div></div> : <div className="footer-inner"><div><Link className="wordmark wordmark-inverse" to="/">next<span>hub</span></Link><p>Services, people and businesses across Nigeria.</p></div><div><b>Find help</b><Link to="/services">Browse services</Link><Link to="/providers">Browse providers</Link><Link to="/post-a-task">Post a task</Link></div><div><b>Offer services</b><Link to="/provider">Provider workspace</Link><Link to="/provider/onboarding">Create a profile</Link></div><div><b>Your account</b><Link to="/customer">Customer workspace</Link><Link to="/account">Workspace switcher</Link></div></div>}<div className="footer-base">© 2026 Nexthub · Demo experience. Secure payments and identity checks are not connected.</div></footer>
  </>;
}

const publicNavigation: [string, string][] = [['/services', 'Services'], ['/providers', 'Providers'], ['/post-a-task', 'Request a service'], ['/provider/onboarding', 'Offer a service']];
type WorkspaceNavigation = { primary: [string, string][]; all: [string, string][] };
const workspaceNavigation: Record<Role, WorkspaceNavigation> = {
  Customer: { primary: [['/customer', 'Overview'], ['/services', 'Find services'], ['/customer/requests', 'My requests'], ['/customer/jobs', 'My jobs']], all: [['/customer', 'Overview'], ['/services', 'Find services'], ['/customer/requests', 'My requests'], ['/customer/jobs', 'My jobs'], ['/messages', 'Messages'], ['/saved', 'Saved providers'], ['/payments', 'Payments'], ['/reviews', 'Reviews'], ['/customer/account', 'Account']] },
  Provider: { primary: [['/provider', 'Dashboard'], ['/provider/leads', 'Requests'], ['/provider/jobs', 'Jobs'], ['/provider/services', 'Services']], all: [['/provider', 'Dashboard'], ['/provider/leads', 'Requests / leads'], ['/provider/quotes', 'Quotes'], ['/provider/jobs', 'Jobs'], ['/provider/calendar', 'Calendar'], ['/provider/services', 'Services'], ['/provider/availability', 'Availability'], ['/provider/portfolio', 'Portfolio'], ['/provider/earnings', 'Earnings'], ['/provider/reviews', 'Reviews'], ['/provider/verification', 'Verification'], ['/provider/messages', 'Messages'], ['/provider/settings', 'Provider settings']] },
  Business: { primary: [['/business', 'Overview'], ['/business/requests', 'Requests'], ['/business/jobs', 'Jobs'], ['/business/team', 'Team']], all: [['/business', 'Overview'], ['/business/requests', 'Requests'], ['/business/jobs', 'Jobs'], ['/business/team', 'Team'], ['/business/services', 'Services'], ['/business/service-areas', 'Service areas'], ['/business/schedule', 'Schedule'], ['/business/customers', 'Customers'], ['/business/earnings', 'Earnings'], ['/business/payouts', 'Payouts'], ['/business/reviews', 'Reviews'], ['/business/verification', 'Verification'], ['/business/settings', 'Business settings']] },
  Admin: { primary: [['/admin', 'Overview'], ['/admin/users', 'Users'], ['/admin/providers', 'Providers'], ['/admin/disputes', 'Disputes']], all: [['/admin', 'Overview'], ['/admin/users', 'Users'], ['/admin/providers', 'Providers'], ['/admin/businesses', 'Businesses'], ['/admin/services', 'Services'], ['/admin/verification', 'Verification'], ['/admin/jobs', 'Jobs'], ['/admin/payments', 'Payments'], ['/admin/disputes', 'Disputes'], ['/admin/reviews', 'Reviews'], ['/admin/reports', 'Reports'], ['/admin/notifications', 'Notifications'], ['/admin/audit', 'Audit logs'], ['/admin/settings', 'Platform settings']] },
};
function workspaceForPath(path: string): Role | null {
  if (path === '/provider' || path.startsWith('/provider/')) return 'Provider';
  if (path === '/business' || path.startsWith('/business/')) return 'Business';
  if (path === '/admin' || path.startsWith('/admin/')) return 'Admin';
  if (path === '/customer' || path.startsWith('/customer/') || ['/services', '/providers', '/jobs', '/post-a-task', '/saved', '/payments', '/reviews', '/messages', '/notifications'].some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) return 'Customer';
  return null;
}


export function Meta({ title, description, indexable = false }: { title: string; description: string; indexable?: boolean }) {
  const location = useLocation();
  useEffect(() => {
    document.title = `${title} | Nexthub`;
    const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (desc) desc.content = description;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `${window.location.origin}${location.pathname}`;
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = `${title} | Nexthub`;
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDescription) ogDescription.content = description;
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (robots) robots.content = indexable ? 'index, follow' : 'noindex, nofollow';
    let schema = document.querySelector<HTMLScriptElement>('#nexthub-website-schema');
    if (!schema) { schema = document.createElement('script'); schema.id = 'nexthub-website-schema'; schema.type = 'application/ld+json'; document.head.append(schema); }
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Nexthub', url: window.location.origin, inLanguage: 'en-NG' });
  }, [title, description, indexable, location.pathname]);
  return null;
}


export function SearchBox({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [term, setTerm] = useState(''); const [where, setWhere] = useState('');
  function submit(e: FormEvent) { e.preventDefault(); const q = new URLSearchParams(); if (term.trim()) q.set('q', term.trim()); if (where.trim()) q.set('location', where.trim()); navigate(`/providers?${q.toString()}`); }
  return <form className={`search-box ${compact ? 'search-box-compact' : ''}`} onSubmit={submit} role="search"><label><span>Service or skill</span><span className="input-with-icon"><Icon name="search"/><input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="e.g. AC repair, driver, graphic designer" aria-label="Service, skill, provider or business"/></span></label><label className="location-field"><span>Location</span><span className="input-with-icon"><Icon name="pin"/><input value={where} onChange={(e) => setWhere(e.target.value)} placeholder="Area or city" aria-label="Area or city"/></span></label><button className="button button-dark">Search</button></form>;
}


export function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="page-intro"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{description && <p className="intro-copy">{description}</p>}</div>{action}</div>;
}


export function ProviderGrid({ list }: { list: Provider[] }) { return <div className="provider-grid">{list.map((p) => <ProviderCard provider={p} key={p.id}/>)}</div>; }
function ProviderCard({ provider }: { provider: Provider }) {
  const state = useDemoState(); const saved = state.saved.includes(provider.id);
  return <article className="provider-card"><div className="provider-card-top"><div className="avatar">{provider.name.split(' ').map((w) => w[0]).join('')}</div><button className={`save-button ${saved ? 'is-saved' : ''}`} onClick={() => toggleSaved(provider.id)} aria-label={saved ? `Remove ${provider.name} from saved providers` : `Save ${provider.name}`} aria-pressed={saved}><Icon name="heart"/></button></div><p className="eyebrow">{provider.type} · Example profile</p><h3><Link to={`/providers/${provider.id}`}>{provider.name}</Link></h3><p className="provider-role">{provider.role}</p><p className="provider-summary">{provider.summary}</p><div className="tag-list">{provider.services.slice(0, 3).map((s) => <span key={s}>{s}</span>)}</div><div className="provider-details"><span><Icon name="pin"/>{provider.location}</span><span>{provider.availability}</span></div><div className="provider-card-foot"><span>From <b>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(provider.startingPrice)}</b></span><Link className="text-link" to={`/providers/${provider.id}`}>Profile <Icon name="arrow"/></Link></div></article>;
}

export function Empty({ title, text, link, label }: { title: string; text: string; link?: string; label?: string }) { return <div className="empty-state"><b>{title}</b><p>{text}</p>{link && <Link className="button button-light" to={link}>{label ?? 'Continue'}</Link>}</div>; }

export function NotFound() { return <><Meta title="Page not found" description="This Nexthub page could not be found."/><section className="empty-page"><p className="eyebrow">404</p><h1>This page isn’t here.</h1><p>Try search or browse the service catalogue.</p><div className="button-row"><Link className="button button-dark" to="/providers">Find a provider</Link><Link className="button button-light" to="/services">Browse services</Link></div></section></>; }
