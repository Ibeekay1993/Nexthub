import {CATEGORIES,PROVIDERS} from './data.js';
import {getState,setState,addTask,addRecent,toggleSaved,updateTask} from './state.js';
import * as P from './pages.js';

const root=document.getElementById('app');
const route=()=>{const raw=location.hash.replace(/^#/,'')||'/';const [path,...rest]=raw.split('?');const q=new URLSearchParams(rest.join('?'));const parts=path.split('/').filter(Boolean);return {path:'/'+(parts[0]||''),id:parts[1]||'',q}};
const go=p=>{location.hash=p};

function render(){
 const r=route();let body='';
 if(r.path==='/')body=P.home();
 else if(r.path==='/services'&&!r.id)body=P.services();
 else if(r.path==='/services'&&r.id)body=P.service(CATEGORIES.find(c=>c.id===decodeURIComponent(r.id)));
 else if(r.path==='/search')body=P.search();
 else if(r.path==='/providers'&&!r.id)body=P.providers();
 else if(r.path==='/providers'&&r.id)body=P.provider(PROVIDERS.find(p=>p.id===decodeURIComponent(r.id)));
 else if(r.path==='/hire')body=P.hire(PROVIDERS.find(p=>p.id===decodeURIComponent(r.id)));
 else if(r.path==='/tasks/new')body=P.newTask();
 else if(r.path==='/jobs'&&!r.id)body=P.tasks();
 else if(r.path==='/jobs'&&r.id)body=P.taskDetail(decodeURIComponent(r.id));
 else if(r.path==='/messages')body=P.messages();
 else if(r.path==='/notifications')body=P.notifications();
 else if(r.path==='/saved')body=P.saved();
 else if(r.path==='/reviews')body=P.reviews();
 else if(r.path==='/payments')body=P.payments();
 else if(r.path==='/profile')body=P.profilePage();
 else if(r.path==='/settings')body=P.settings();
 else if(r.path==='/login')body=P.auth?.('login')||'';
 else if(r.path==='/signup')body=P.auth?.('signup')||'';
 else if(r.path==='/forgot-password')body=P.forgot();
 else if(r.path==='/provider')body=P.providerDashboard();
 else if(r.path==='/provider/onboarding')body=P.onboarding();
 else if(r.path==='/provider/services')body=P.providerServices();
 else if(r.path==='/provider/portfolio')body=P.providerSimple('Portfolio','Show the work that makes customers trust you.',[['CCTV installations','8 work examples','Published'],['Office networks','5 work examples','Published'],['Access control','3 work examples','Draft']]);
 else if(r.path==='/provider/leads')body=P.providerSimple('Leads','Customer requests that may match your services.',[['Office CCTV installation','Gwarinpa · ₦180,000 budget','New'],['Generator maintenance','Ikeja · Recurring','New'],['Network troubleshooting','Abuja · Quote requested','Follow up']]);
 else if(r.path==='/provider/quotes')body=P.providerSimple('Quotes','Manage offers sent to customers.',[['Generator servicing','₦35,000 · awaiting customer','Pending'],['Office network setup','₦220,000 · accepted','Accepted'],['CCTV maintenance','₦45,000 · completed','Completed']]);
 else if(r.path==='/provider/jobs')body=P.providerSimple('Jobs','Track accepted work, updates and completion.',[['Generator servicing','Job #NX-1048 · 70% complete','In progress'],['Office network setup','Job #NX-1021 · payment received','Scheduled'],['CCTV maintenance','Job #NX-998 · completed','Completed']]);
 else if(r.path==='/provider/earnings')body=P.providerSimple('Earnings & settlement','Separate customer payment, platform fees and provider settlement.',[['Available for payout','₦280,000','Ready'],['Pending settlement','₦140,000','Pending'],['Platform fees','₦68,000','This month']]);
 else if(r.path==='/provider/verification')body=P.providerSimple('Verification','Trust information shown on your provider profile.',[['Phone verification','Verified','Complete'],['Identity verification','Government ID submitted','Pending'],['Business verification','Optional for individuals','Not started']]);
 else if(r.path==='/business')body=P.business();
 else if(r.path==='/admin'&&!r.id)body=P.admin();
 else if(r.path==='/admin'&&r.id==='users')body=P.adminSection('Users','Manage customer, provider and business accounts.',[['Provider accounts','18 awaiting profile review','Review'],['Customer verification','3 accounts flagged','Review'],['Suspended accounts','0 currently suspended','Clear']]);
 else if(r.path==='/admin'&&r.id==='services')body=P.adminSection('Service moderation','Approve new services and categories without changing application code.',[['CCTV maintenance','Provider proposal','Pending'],['Solar panel cleaning','Provider proposal','Pending'],['New category request','Customer suggestion','Pending']]);
 else if(r.path==='/admin'&&r.id==='verification')body=P.adminSection('Verification queue','Review identity, business and qualification evidence.',[['Provider identity','ID submitted','Pending'],['Business registration','CAC document','Pending'],['Qualification','Certificate submitted','Pending']]);
 else if(r.path==='/admin'&&r.id==='jobs')body=P.adminSection('Jobs','Monitor requests, bookings, active work and completion.',[['Generator servicing','Job #NX-1048','In progress'],['Office cleaning','Job #NX-1003','Completed'],['CCTV installation','Job #NX-1052','Payment pending']]);
 else if(r.path==='/admin'&&r.id==='disputes')body=P.adminSection('Disputes','Review evidence, customer reports and provider responses.',[['Scope dispute','Customer vs provider','Open'],['Late arrival','Customer report','Open'],['Additional charge','Provider request','Review']]);
 else if(r.path==='/admin'&&r.id==='payments')body=P.adminSection('Payments','Monitor transactions, settlements, refunds and payouts.',[['Provider payout','₦280,000','Ready'],['Customer payment','₦35,000','Complete'],['Refund request','₦18,000','Review']]);
 else if(r.path==='/admin'&&r.id==='reports')body=P.adminSection('Reports','Marketplace operational reporting.',[['GMV','₦84.2m this month','Ready'],['Completed jobs','38,900','Ready'],['Dispute rate','1.8%','Ready']]);
 else if(r.path==='/admin'&&r.id==='settings')body=P.adminSection('Platform settings','Controls for moderation, fees, verification and operations.',[['Service proposals','Moderation enabled','Active'],['Provider verification','Required for badge','Active'],['Marketplace fee','Configurable','Active']]);
 else body=P.notFound();
 root.innerHTML=P.layout(body);bind();
}

function filterProviders(q,location,sort){
 let list=[...PROVIDERS];const term=String(q||'').toLowerCase().trim(),loc=String(location||'').toLowerCase().trim();
 if(term)list=list.filter(p=>(p.name+' '+p.role+' '+p.location+' '+p.skills.join(' ')+' '+p.services.join(' ')).toLowerCase().includes(term));
 if(loc)list=list.filter(p=>p.location.toLowerCase().includes(loc));
 if(sort==='rating')list.sort((a,b)=>b.rating-a.rating);if(sort==='jobs')list.sort((a,b)=>b.jobs-a.jobs);return list;
}

function bind(){
 document.querySelectorAll('[data-action="menu"]').forEach(b=>b.onclick=()=>document.getElementById('mobile-nav')?.classList.toggle('open'));
 document.querySelectorAll('[data-action="save"]').forEach(b=>b.onclick=()=>{toggleSaved(b.dataset.id);render()});
 document.querySelectorAll('[data-form="search"]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));setState({query:d.q||'',location:d.location||''});addRecent(d.q);go('/search?q='+encodeURIComponent(d.q||''))});
 document.querySelectorAll('[data-form="provider-search"]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));setState({query:d.q||'',location:d.location||''});const list=filterProviders(d.q,d.location,d.sort);const targets=[document.getElementById('provider-results'),document.getElementById('search-results')].filter(Boolean);targets.forEach(t=>{t.innerHTML=list.length?list.map(p=>P.__providerCard?.(p)||'').join(''):'<div class="empty">No matching providers. Try a broader search or post a task.</div>'});const count=document.getElementById('search-count');if(count)count.textContent=list.length+' matches';if(!targets.length)go('/search?q='+encodeURIComponent(d.q||'')+'&location='+encodeURIComponent(d.location||''));});
 document.querySelectorAll('[data-form="task"],[data-form="hire"]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));const item=addTask(d);alert('Task request created in this demo. No real payment has been taken.');go('/jobs/'+item.id)});
 document.querySelectorAll('[data-form="provider"]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));setState({profile:{...getState().profile,name:d.name,location:d.location,role:'Provider'},providerDraft:d});alert('Provider profile saved in this browser demo.');go('/provider')});
 document.querySelectorAll('[data-form="settings"]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));setState({profile:{...getState().profile,name:d.name,location:d.location,notifications:d.notifications}});alert('Settings saved.');render()});
 document.querySelectorAll('[data-form="auth"]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));setState({session:{user:d.email,role:d.role||'Customer'},profile:{...getState().profile,name:d.email.split('@')[0]||'Nexthub user',role:d.role||'Customer'}});go('/profile')});
 document.querySelectorAll('[data-form="forgot"]').forEach(f=>f.onsubmit=e=>{e.preventDefault();alert('Demo reset request recorded. Production authentication will send the actual email.');});
 document.querySelectorAll('[data-action="demo-complete"]').forEach(b=>b.onclick=()=>alert('Completion review: inspect provider notes/photos, then Confirm completion or Report a problem. Production will release settlement only after the configured completion/dispute rules.'));
}
window.addEventListener('hashchange',render);window.addEventListener('storage',render);render();
