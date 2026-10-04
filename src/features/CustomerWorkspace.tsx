import { Link, useParams } from 'react-router-dom';
import { Empty, Meta, PageIntro } from '../components';
import { useDemoState } from '../store';
import { Jobs } from './Requests';
import { Messages, Payments, Reviews, Saved, Settings } from './Account';

export function CustomerWorkspace() {
  const { section } = useParams();
  if (section === 'requests') return <Jobs filter="requests"/>;
  if (section === 'jobs') return <Jobs filter="jobs"/>;
  if (section === 'saved') return <Saved/>;
  if (section === 'messages') return <Messages/>;
  if (section === 'payments') return <Payments/>;
  if (section === 'reviews') return <Reviews/>;
  if (section === 'account') return <Settings/>;
  if (section) return <><Meta title="Customer workspace" description="Customer service request workspace preview."/><PageIntro eyebrow="Customer workspace" title="This customer section is not available."/><section className="section body-section"><Empty title="Choose another customer section" text="Use the customer navigation to continue." link="/customer" label="Customer overview"/></section></>;
  return <CustomerOverview/>;
}

function CustomerOverview() {
  const state = useDemoState();
  const pending = state.jobs.filter((job) => ['REQUESTED', 'QUOTED'].includes(job.status));
  const active = state.jobs.filter((job) => ['ACCEPTED', 'PAYMENT_PENDING', 'FUNDED', 'SCHEDULED', 'PROVIDER_EN_ROUTE', 'IN_PROGRESS', 'PROVIDER_MARKED_COMPLETE', 'CUSTOMER_CONFIRMATION', 'DISPUTE'].includes(job.status));
  return <><Meta title="Customer workspace" description="Find services, manage customer requests and follow your jobs."/><PageIntro eyebrow="Customer workspace · Preview" title="What do you need help with?" description="Find a provider, describe the work, and keep requests and job updates together." action={<Link className="button button-dark" to="/post-a-task">Post a request</Link>}/><section className="section workspace-overview">
    <div className="customer-search-card"><div><p className="eyebrow">Find services</p><h2>Start with what you need done.</h2><p>Browse people and businesses by service and location.</p></div><Link className="button button-dark" to="/providers">Find a provider</Link></div>
    <div className="workspace-overview-columns"><section className="workspace-panel"><div className="section-top"><div><p className="eyebrow">Customer activity · Demo data</p><h2>Requests awaiting quotes</h2></div><Link className="text-link" to="/customer/requests">View requests</Link></div>{pending.length ? <div className="job-list">{pending.map((job) => <DemoJob key={job.id} job={job}/>)}</div> : <Empty title="No open requests in this demo" text="A request you create in this browser will appear here." link="/post-a-task" label="Describe a job"/>}</section>
      <section className="workspace-panel"><div className="section-top"><div><p className="eyebrow">Work in progress · Demo data</p><h2>My jobs</h2></div><Link className="text-link" to="/customer/jobs">View jobs</Link></div>{active.length ? <div className="job-list">{active.slice(0, 3).map((job) => <DemoJob key={job.id} job={job}/>)}</div> : <Empty title="No active jobs in this demo" text="Accepted sample jobs and requests appear here as the workflow moves forward." link="/customer/jobs" label="Browse jobs"/>}</section></div>
    <div className="customer-shortcuts"><Link to="/saved"><b>Saved providers</b><span>Return to profiles you bookmarked</span></Link><Link to="/messages"><b>Messages</b><span>See job conversations in this browser preview</span></Link><Link to="/payments"><b>Payments</b><span>Payment services are not connected</span></Link></div>
    <p className="small-note">Account sign-in is not connected. Job examples and changes stay in this browser and are not linked to a real customer identity.</p>
  </section></>;
}

function DemoJob({ job }: { job: { id: string; title: string; location: string; date: string; status: string } }) {
  const labels: Record<string, string> = { REQUESTED: 'Waiting for quotes', QUOTED: 'Quote received', ACCEPTED: 'Quote accepted', PAYMENT_PENDING: 'Payment setup needed', FUNDED: 'Funding not connected', SCHEDULED: 'Scheduled', PROVIDER_EN_ROUTE: 'Provider on the way', IN_PROGRESS: 'In progress', PROVIDER_MARKED_COMPLETE: 'Review completion', CUSTOMER_CONFIRMATION: 'Review completion', DISPUTE: 'Problem reported' };
  return <Link className="customer-job-card" to={`/jobs/${job.id}`}><span><b>{job.title}</b><small>{job.location} · {job.date} · Example job</small></span><span className="status-label">{labels[job.status] ?? job.status}</span></Link>;
}
