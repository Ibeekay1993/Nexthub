import {CATEGORIES,PROVIDERS} from './data.js';
import {getState,setState,addTask,toggleSaved,addRecent} from './state.js';
import {layout,home,services,service,providers,provider,tasks,taskDetail,newTask,messages,notifications,saved,reviews,payments,settings,onboarding,providerDashboard,providerServices,providerSimple,business,admin,auth,forgot,adminSection,notFound} from './pages.js';

const root=document.getElementById('app');
const go=path=>{location.hash=path.startsWith('#')?path:'#'+path};
function parse(){const raw=location.hash.replace(/^#/,'')||'/';const [path,...parts]=raw.split('?')[0].split('/').filter(Boolean);const q=new URLSearchParams(raw.split('?')[1]||'');return {path:path||'',id:parts[0],sub:parts[1],q}}
function render(){
 const r=parse(); let body;
 if(!r.path)body=home();
 else if(r.path==='services'&&!r.id)body=services();
 else if(r.path==='services'&&r.id)body=service(CATEGORIES.find(c=>c.id===r.id));
 else if(r.path==='search')body=providers();
 else if(r.path==='providers'&&!r.id)body=providers();
 else if(r.path==='providers'&&r.id)body=provider(PROVIDERS.find(p=>p.id===r.id));
 else if(r.path==='hire')body=provider(PROVIDERS.find(p=>p.id===r.id))||providers();
 else if(r.path==='tasks'&&r.id==='new')body=newTask();
 else if(r.path==='jobs'&&!r.id)body=tasks();
 else if(r.path==='jobs'&&r.id)body=taskDetail(r.id);
 else if(r.path==='messages')body=messages();
 else if(r.path==='notifications')body=notifications();
 else if(r.path==='saved')body=saved();
 else if(r.path==='reviews')body=reviews();
 else if(r.path==='payments')body=payments();
 else if(r.path==='settings')body=settings();
 else if(r.path==='provider'&&!r.id)body=providerDashboard();
 else if(r.path==='provider'&&r.id==='onboarding')body=onboarding();
 else if(r.path==='provider'&&r.id==='services')body=providerServices();
 else if(r.path==='provider'&&r.id==='portfolio')body=providerSimple('Portfolio','Work examples customers can review before contacting you.',[['Generator installation','Completed project','Published'],['Preventive maintenance','Residential project','Published']]);
 else if(r.path==='provider'&&r.id==='leads')body=providerSimple('Leads','Customer requests matching your services.',[['AC repair in Ikeja','Customer request','New'],['Generator maintenance','Recurring request','New'],['Office cooling service','Commercial request','Review']]);
 else if(r.path==='provider'&&r.id==='quotes')body=providerSimple('Quotes','Offers you have sent to customers.',[['Generator servicing','₦35,000','Pending'],['AC installation','₦120,000','Accepted']]);
 else if(r.path==='provider'&&r.id==='jobs')body=providerSimple('Provider jobs','Work scheduled or completed.',[['Generator servicing','Tomorrow · Ikeja','Upcoming'],['AC repair','Completed yesterday','Completed']]);
 else if(r.path==='provider'&&r.id==='earnings')body=providerSimple('Earnings & payouts','Review completed work and payout status.',[['Completed jobs','₦680,000','Available'],['Pending jobs','₦420,000','Pending'],['Platform fees','₦68,000','This month']]);
 else if(r.path==='provider'&&r.id==='verification')body=providerSimple('Verification','Trust information shown on your public provider profile.',[['Phone verification','Verified','Complete'],['Identity verification','Government ID required','Pending'],['Business verification','Optional for individuals','Not started']]);
 else if(r.path==='business')body=business();
 else if(r.path==='login')body=auth('login');
 else if(r.path==='signup')body=auth('signup');
 else if(r.path==='forgot-password')body=forgot();
 else if(r.path==='admin'&&!r.id)body=admin();
 else if(r.path==='admin'&&r.id==='users')body=adminSection('Users','Manage customer, provider and business accounts.',[['New provider account','Awaiting profile review','Review'],['Customer verification','3 accounts','Review'],['Suspended accounts','0','Clear']]);
 else if(r.path==='admin'&&r.id==='services')body=adminSection('Service moderation','Review new services proposed by providers.',[['CCTV installation','Provider proposal','Pending'],['Solar panel cleaning','Provider proposal','Pending'],['New category request','Customer suggestion','Pending']]);
 else if(r.path==='admin'&&r.id==='verification')body=adminSection('Verification queue','Review submitted identity and business evidence.',[['Provider identity','ID submitted','Pending'],['Business registration','CAC document','Pending'],['Qualification','Certificate submitted','Pending']]);
 else if(r.path==='admin'&&r.id==='jobs')body=adminSection('Jobs','Monitor marketplace requests and bookings.',[['Generator servicing','Booking #NX-1002','Active'],['Office cleaning','Booking #NX-1003','Completed']]);
 else if(r.path==='admin'&&r.id==='disputes')body=adminSection('Disputes','Review customer/provider disputes and evidence.',[['Scope dispute','Customer vs provider','Open'],['Late arrival','Customer report','Open']]);
 else if(r.path==='admin'&&r.id==='payments')body=adminSection('Payments','Monitor transaction and payout operations.',[['Pending payout','Provider payout','Review'],['Successful payment','₦35,000','Complete']]);
 else if(r.path==='admin'&&r.id==='reports')body=adminSection('Reports','Marketplace operational reporting.',[['Monthly jobs','1,420 jobs','Ready'],['Provider growth','+18%','Ready'],['Dispute rate','2.1%','Ready']]);
 else if(r.path==='admin'&&r.id==='settings')body=adminSection('Platform settings','Operational controls and moderation settings.',[['Service proposal moderation','Enabled','Active'],['Provider verification','Required for badge','Active']]);







 else body=notFound();
 root.innerHTML=layout(body); bind(); hydrate(r);
}
function hydrate(r){
 const q=r.q.get('q')||getState().query;
 const field=document.querySelector('[name="q"]');if(field&&q)field.value=q;
 if(r.path==='search'&&q){setState({query:q});const loc=r.q.get('location')||'';const term=q.toLowerCase();const locTerm=loc.toLowerCase();const list=PROVIDERS.filter(p=>(p.name+' '+p.role+' '+p.location+' '+p.skills.join(' ')+' '+p.services.join(' ')).toLowerCase().includes(term)&&(!locTerm||p.location.toLowerCase().includes(locTerm)));const grid=document.querySelector('.provider-grid');if(grid)grid.innerHTML=list.length?list.map(p=>providerCard(p)).join(''):'<div class="empty"><div class="empty-mark">+</div><h3>No exact provider yet</h3><p>Post a custom task and let providers respond.</p><a class="btn primary" href="#/tasks/new">Post task</a></div>'; }
}
function providerCard(p){return '<article class="provider"><div class="p-top"><div class="avatar">'+p.name.split(' ').map(x=>x[0]).join('').slice(0,2)+'</div><div><b>'+p.name+'</b> <span class="verified">Verified</span><div class="muted">'+p.role+'</div><div class="rating">★ '+p.rating+' · '+p.jobs+' jobs</div></div></div><p>'+p.bio+'</p><div class="tags">'+p.skills.map(x=>'<span class="tag">'+x+'</span>').join('')+'</div><div class="provider-foot"><span class="muted">'+p.location+'</span><a class="btn primary" href="#/providers/'+p.id+'">View profile</a></div></article>'}
function bind(){
 document.querySelectorAll('[data-form="search"]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const q=new FormData(f).get('q')?.toString().trim()||'';setState({query:q});addRecent(q);go('/search?q='+encodeURIComponent(q))}));
 document.querySelectorAll('[data-form="provider-search"]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));setState({query:d.q||''});go('/search?q='+encodeURIComponent(d.q||'')+'&location='+encodeURIComponent(d.location||''))}));
 document.querySelectorAll('[data-form="task"]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));addTask(d);go('/jobs');alert('Task posted successfully in this browser demo.')}));
 document.querySelectorAll('[data-form="provider"]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));setState({profile:{name:d.name,location:d.location,role:'Provider'},providerDraft:d});go('/provider');alert('Provider profile saved locally.')}));
 document.querySelectorAll('[data-form="settings"]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));setState({profile:{...getState().profile,...d}});alert('Settings saved.')}));
 document.querySelectorAll('[data-action="demo-payment"]').forEach(b=>b.addEventListener('click',()=>alert('Payment methods will connect to the payment provider in the production backend.')));
 document.querySelectorAll('[data-action="save"]').forEach(b=>b.addEventListener('click',()=>{}));
}
window.addEventListener('hashchange',render);
window.addEventListener('storage',render);
render();