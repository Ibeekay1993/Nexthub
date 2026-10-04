import { Route, Routes } from 'react-router-dom';
import { Shell, NotFound } from './components';
import { Home, Services, Providers, ProviderProfile } from './features/Discovery';
import { PostTask, Jobs, JobDetail } from './features/Requests';
import { ProviderWorkspace, Onboarding, ProviderSection, Business, BusinessTeam, Admin } from './features/Workspaces';
import { Messages, Account, Settings, Saved, Payments, Notifications, Reviews, Login } from './features/Account';
import { CustomerWorkspace } from './features/CustomerWorkspace';

export default function App() {
  return <Shell><Routes>
    <Route path="/" element={<Home/>}/><Route path="/services" element={<Services/>}/><Route path="/services/:slug" element={<Services/>}/>
    <Route path="/providers" element={<Providers/>}/><Route path="/providers/:id" element={<ProviderProfile/>}/><Route path="/post-a-task" element={<PostTask/>}/>
    <Route path="/jobs" element={<Jobs/>}/><Route path="/jobs/:id" element={<JobDetail/>}/><Route path="/messages" element={<Messages/>}/>
    <Route path="/customer" element={<CustomerWorkspace/>}/><Route path="/customer/:section" element={<CustomerWorkspace/>}/>
    <Route path="/provider" element={<ProviderWorkspace/>}/><Route path="/provider/onboarding" element={<Onboarding/>}/><Route path="/provider/messages" element={<Messages/>}/><Route path="/provider/jobs/:id" element={<JobDetail/>}/><Route path="/provider/:section" element={<ProviderSection/>}/>
    <Route path="/business" element={<Business/>}/><Route path="/business/team" element={<BusinessTeam/>}/><Route path="/business/jobs/:id" element={<JobDetail/>}/><Route path="/business/:section" element={<Business/>}/>
    <Route path="/admin" element={<Admin/>}/><Route path="/admin/jobs/:id" element={<JobDetail/>}/><Route path="/admin/:section" element={<Admin/>}/><Route path="/account" element={<Account/>}/><Route path="/settings" element={<Settings/>}/>
    <Route path="/saved" element={<Saved/>}/><Route path="/payments" element={<Payments/>}/><Route path="/notifications" element={<Notifications/>}/><Route path="/reviews" element={<Reviews/>}/>
    <Route path="/sign-in" element={<Login/>}/><Route path="/sign-up" element={<Login/>}/><Route path="/reset-password" element={<Login/>}/><Route path="*" element={<NotFound/>}/>
  </Routes></Shell>;
}
