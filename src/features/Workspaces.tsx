import { useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDemoState } from '../store';
import { Empty, Meta, NotFound, PageIntro } from '../components';
import { ServiceProposal } from './Discovery';
import { JobRow } from './Requests';

const providerNavy = ['REQUESTED', 'QUOTED'];
const providerWork = ['ACCEPTED', 'PAYMENT_PENDING', 'FUNDED', 'SCHEDULED', 'PROVIDER_EN_ROUTE', 'IN_PROGRESS', 'PROVIDER_MARKED_COMPLETE', 'CUSTOMER_CONFIRMATION', 'COMPLETED', 'DISPUTE'];

export function ProviderWorkspace() {
  const state = useDemoState();
  const needsReply = state.jobs.filter((job) => providerNavy.includes(job.status));
  const work = state.jobs.filter((job) => providerWork.includes(job.status));
  return <><Meta title="Provider dashboard" description="Review service requests, manage accepted jobs and update your provider profile."/><PageIntro eyebrow="Provider workspace · Preview" title="Run your service work from here." description="Review incoming requests, manage your services and follow accepted jobs. All records in this browser are examples." action={<Link className="button button-dark" to="/provider/onboarding">Create provider profile</Link>}/><section className="section workspace-dashboard">
    <div className="provider-dashboard-callout"><div><p className="eyebrow">Provider workflow</p><h2>Request → quote → job → completion</h2><p>Provider controls are separate from customer requests and available only in this provider workspace preview.</p></div><Link className="button button-light" to="/provider/leads">Review requests</Link></div>
    <div className="workspace-overview-columns"><section className="workspace-panel"><div className="section-top"><div><p className="eyebrow">Example records</p><h2>Requests to review</h2></div><Link className="text-link" to="/provider/leads">All requests</Link></div>{needsReply.length ? <div className="job-list">{needsReply.map((job) => <JobRow workspace="provider" job={job} key={job.id}/>)}</div> : <Empty title="No open provider requests in this demo" text="New sample requests can be reviewed here when the demo flow is exercised."/>}</section>
      <section className="workspace-panel"><div className="section-top"><div><p className="eyebrow">Example records</p><h2>Current jobs</h2></div><Link className="text-link" to="/provider/jobs">View jobs</Link></div>{work.length ? <div className="job-list">{work.map((job) => <JobRow workspace="provider" job={job} key={job.id}/>)}</div> : <Empty title="No provider jobs in this demo" text="Accepted work and its progress will appear here."/>}</section></div>
    <div className="workspace-cards"><Link to="/provider/services"><small>Profile</small><b>Services & pricing</b><span>Describe the work you offer and how you quote it.</span></Link><Link to="/provider/calendar"><small>Schedule</small><b>Availability</b><span>Calendar and availability are previews without a live account.</span></Link><Link to="/provider/earnings"><small>Money</small><b>Earnings & payouts</b><span>No real balances or transactions are available.</span></Link></div>
  </section></>;
}

export function ProviderSection() {
  const { section = '' } = useParams();
  const state = useDemoState();
  const titles: Record<string, string> = { services: 'Services', leads: 'Requests and leads', quotes: 'Quotes', jobs: 'Jobs', calendar: 'Calendar', availability: 'Availability', portfolio: 'Portfolio', verification: 'Verification', earnings: 'Earnings', reviews: 'Reviews', settings: 'Provider settings' };
  const title = titles[section];
  if (!title) return <NotFound/>;
  const needsReply = state.jobs.filter((job) => providerNavy.includes(job.status));
  const quoteJobs = state.jobs.filter((job) => job.quote);
  const work = state.jobs.filter((job) => providerWork.includes(job.status));
  const rows = section === 'jobs' ? work : section === 'quotes' ? quoteJobs : needsReply;
  const information: Record<string, string> = {
    calendar: 'A provider calendar should combine availability, confirmed job times and travel buffers. Calendar sync is not connected.',
    availability: 'Set days, working hours, lead time and service area after a provider account and saved schedule are available.',
    portfolio: 'Portfolio images are not uploaded in this demo. Secure file storage and visibility controls are required before publishing work samples.',
    verification: 'No identity checks run in this demo. Production verification needs an approved provider and secure document storage.',
    earnings: 'Transactions, platform fees, settlement balances, refunds and payouts are separate records in production. No live balance is available.',
    reviews: 'Only reviews connected to a completed job belong here. No job-backed reviews are available in this demo.',
    settings: 'Provider profile ownership, notification preferences and payout settings require an authenticated account and server-side authorization.',
  };
  return <><Meta title={title} description={`${title} in the separate Nexthub provider workspace preview.`}/><PageIntro eyebrow="Provider workspace" title={title} description="Provider tools for service delivery. Sample records only; no live requests are being sent."/>
    <section className="section body-section"><div className="panel"><h2>{title}</h2>{section === 'services' ? <><p>Manage the services you offer and propose catalogue additions.</p><ServiceProposal/></> : ['leads', 'quotes', 'jobs'].includes(section) ? rows.length ? <div className="job-list">{rows.map((job) => <JobRow workspace="provider" job={job} key={job.id}/>)}</div> : <Empty title={section === 'quotes' ? 'No quote examples yet' : 'No open examples'} text="This browser preview has no records in this section."/> : <><p>{information[section]}</p>{section === 'earnings' && <div className="notice">No payment has been collected, settled or paid out.</div>}{section === 'verification' && <div className="verification-list"><p><b>Phone</b><span>Not connected</span></p><p><b>Identity</b><span>No check submitted</span></p><p><b>Qualifications</b><span>No documents collected</span></p></div>}</>}</div></section></>;
}

export function Onboarding() {
  const [done, setDone] = useState(false);
  function submit(e: FormEvent) { e.preventDefault(); setDone(true); }
  return <><Meta title="Provider profile setup" description="Create a provider profile and add services to the Nexthub open catalogue."/><PageIntro eyebrow="Provider onboarding" title="Set up your service profile." description="This creates a provider-profile draft, separate from the customer account. Publishing needs an authenticated service."/><section className="section form-section"><form className="form-panel" onSubmit={submit}><label>Profile type<select><option>Individual provider</option><option>Service business</option></select></label><label>Name<input required placeholder="Your name or business name"/></label><label>Services offered<input required placeholder="e.g. plumbing, pump installation"/></label><label>Area covered<input required placeholder="e.g. Ikeja and nearby areas, Lagos"/></label><label>About your work<textarea rows={4} required minLength={20} placeholder="Experience, qualifications, tools and the jobs you take on."/></label><div className="notice">This demo saves no identity documents and grants no verification badge. Never upload government ID to an unconfigured demo.</div><button className="button button-dark button-large">Save profile draft</button>{done && <p className="form-success" role="status">Profile draft captured for this page view. Account creation and publishing need a backend.</p>}</form></section></>;
}

export function Business() {
  const { section } = useParams();
  const state = useDemoState();
  if (section) return <BusinessSection section={section}/>;
  return <><Meta title="Business workspace" description="Manage a service business with a dedicated workspace for jobs, team, schedules and operations."/><PageIntro eyebrow="Business workspace · Preview" title="Coordinate service work across your team." description="A company workspace keeps jobs, team assignments and service coverage separate from an individual provider profile." action={<Link className="button button-dark" to="/business/team">Manage team preview</Link>}/><section className="section workspace-dashboard">
    <div className="business-intro"><div><p className="eyebrow">Business operations</p><h2>Company requests, assigned work, shared records</h2><p>Team access and shared company records need an authenticated business account.</p></div></div>
    <div className="workspace-overview-columns"><section className="workspace-panel"><div className="section-top"><div><p className="eyebrow">Example records</p><h2>Business jobs</h2></div><Link className="text-link" to="/business/jobs">View jobs</Link></div>{state.jobs.length ? <div className="job-list">{state.jobs.map((job) => <JobRow workspace="business" job={job} key={job.id}/>)}</div> : <Empty title="No job examples" text="Business jobs will appear here after company workflows are connected."/>}</section><section className="workspace-panel business-next"><p className="eyebrow">Team operations</p><h2>Assign work to the right member.</h2><p>Job assignment, team schedules and role-based company access are not connected in this preview.</p><Link className="button button-light" to="/business/team">View team workspace</Link></section></div>
  </section></>;
}

function BusinessSection({ section }: { section: string }) {
  const state = useDemoState();
  const titles: Record<string, string> = { requests: 'Requests', jobs: 'Jobs', services: 'Services', 'service-areas': 'Service areas', schedule: 'Schedule', customers: 'Customers', earnings: 'Earnings', payouts: 'Payouts', reviews: 'Reviews', verification: 'Verification', settings: 'Business settings', billing: 'Billing' };
  const title = titles[section];
  if (!title) return <NotFound/>;
  const info: Record<string, string> = {
    requests: 'Requests created by a business need an organization account and shared company records. This demo does not attribute example jobs to a company.',
    services: 'Business service listings and the people assigned to deliver them require a verified business profile and team permissions.',
    'service-areas': 'Define the neighborhoods, cities and travel radius served by the company. Service areas are not saved in this preview.',
    schedule: 'Business schedules should combine member availability and assigned jobs. Team calendars are not connected.',
    customers: 'Customer records are scoped to the business account and its authorized team. No real customer directory is held here.',
    earnings: 'Business transaction records and fees must be computed and verified by the backend. No financial figures are shown.',
    payouts: 'Business payouts require verified account ownership, gateway integration and server-side authorization. No payout action is available.',
    reviews: 'Reviews belong to completed jobs and are not attached to a company until a real business relationship is recorded.',
    verification: 'No company documents or identity checks are collected in this demo.',
    settings: 'Business ownership, member permissions and billing settings require authenticated organization records.',
    billing: 'Invoices and payment records are not connected. This preview cannot collect or move money.',
  };
  return <><Meta title={title} description={`${title} in the separate Nexthub business workspace preview.`}/><PageIntro eyebrow="Business workspace" title={title} description="Company-level operations, distinct from customer and individual-provider tools."/><section className="section body-section"><div className="panel"><h2>{title}</h2>{section === 'jobs' ? <>{state.jobs.length ? <div className="job-list">{state.jobs.map((job) => <JobRow workspace="business" job={job} key={job.id}/>)}</div> : <Empty title="No example jobs" text="Business work will appear here when company records are configured."/>}<p className="small-note">These examples are not assigned to a business or team member.</p></> : <><p>{info[section]}</p>{['earnings', 'payouts', 'billing'].includes(section) && <div className="notice">No money has been collected, owed or paid through this demo.</div>}</>}</div></section></>;
}

export function BusinessTeam() { return <><Meta title="Business team" description="Manage staff and job assignment in the business workspace preview."/><PageIntro eyebrow="Business workspace" title="Team and job assignment" description="A company operates through explicit team membership and role-scoped access, separately from an individual provider profile."/><section className="section body-section"><div className="panel"><h2>Team access</h2><p>Invite colleagues and choose who may create requests, assign jobs, approve quotes and view financial records.</p><div className="notice">Invites, job assignment and permissions are unavailable until authentication and server-side access control are configured.</div></div></section></>; }

export function Admin() {
  const { section } = useParams();
  const state = useDemoState();
  const titles: Record<string, string> = { users: 'Users', providers: 'Providers', businesses: 'Businesses', services: 'Services', verification: 'Verification', jobs: 'Jobs', payments: 'Payments and payouts', disputes: 'Disputes', reviews: 'Reviews', reports: 'Reports', notifications: 'Notifications', audit: 'Audit logs', settings: 'Platform settings' };
  const title = section ? titles[section] : 'Marketplace overview';
  const descriptions: Record<string, string> = {
    users: 'Account records and user actions require authorized staff access.', providers: 'Provider accounts and profiles need review against submitted real records.', businesses: 'Company accounts, members and verification need server-side access controls.', services: 'Review provider proposals and maintain the service catalogue.', verification: 'No identity or company documents are held by this demo.', jobs: 'Review sample job records; no privileged job action is connected.', payments: 'Transaction and payout actions require a verified payment backend.', disputes: 'Review the example dispute state. Adjudication is not connected.', reviews: 'Reviews must be tied to completed jobs; no moderation action is connected.', reports: 'No platform activity metrics are shown because this demo has no real marketplace data.', notifications: 'Transactional notification delivery is not connected.', audit: 'Privileged actions require server-side audit records; none are created by this preview.', settings: 'Platform policies and fees must be configured and enforced server-side.',
  };
  if (section && !title) return <NotFound/>;
  return <><Meta title={title || 'Marketplace overview'} description="Separate operations workspace preview for Nexthub marketplace administration."/><PageIntro eyebrow="Admin workspace · Preview" title={title || 'Marketplace overview'} description="Operator tools are separate from customer, provider and business workspaces. No admin privileges are implemented in this frontend."/><section className="section workspace-dashboard"><div className="admin-notice"><b>Privileged access is not configured</b><p>Changing the preview workspace does not grant admin permissions. Live operations require server-verified staff access.</p></div>{!section && <div className="admin-areas">{Object.entries(titles).map(([slug, label]) => <Link to={`/admin/${slug}`} key={slug}><b>{label}</b><span>Open operator area</span></Link>)}</div>}{section === 'jobs' || section === 'disputes' ? <div className="panel"><h2>{title}</h2><p>{descriptions[section]}</p><div className="job-list">{state.jobs.filter((job) => section === 'jobs' || job.status === 'DISPUTE').map((job) => <JobRow workspace="admin" job={job} key={job.id}/>)}</div></div> : section && <div className="panel"><h2>{title}</h2><p>{descriptions[section]}</p></div>}</section></>;
}
