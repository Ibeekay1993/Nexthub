export const CATEGORIES=[
{id:'home',name:'Home & Cleaning',icon:'⌂',desc:'Cleaning, laundry, housekeeping, gardening and domestic support.',popular:['Deep cleaning','Laundry','Fumigation','Gardening']},
{id:'trades',name:'Repairs & Trades',icon:'⚒',desc:'Plumbing, electrical, AC, generators, carpentry and appliance repair.',popular:['Generator repair','AC servicing','Plumbing','Electrical']},
{id:'transport',name:'Drivers & Transport',icon:'↗',desc:'Drivers, airport transfers, school runs, logistics and vehicle hire.',popular:['Airport transfer','Personal driver','Moving help','Delivery']},
{id:'errands',name:'Errands & Delivery',icon:'◉',desc:'Shopping, pickups, dispatch, personal errands and local delivery.',popular:['Grocery run','Pickup','Document delivery','Personal errand']},
{id:'tech',name:'Technology',icon:'⌘',desc:'Websites, apps, IT support, networking, cloud and software.',popular:['Website','IT support','CCTV/networking','Automation']},
{id:'creative',name:'Creative & Media',icon:'✦',desc:'Design, photography, video, writing, animation and music.',popular:['Logo design','Photography','Video editing','UI/UX']},
{id:'business',name:'Business Services',icon:'▦',desc:'Admin, virtual assistance, research, sales, consulting and operations.',popular:['Virtual assistant','Bookkeeping','Research','Customer support']},
{id:'education',name:'Education & Training',icon:'▤',desc:'Tutors, exam preparation, languages, music and professional training.',popular:['WAEC/JAMB tutor','Coding','Languages','Music lessons']},
{id:'construction',name:'Construction',icon:'▥',desc:'Builders, masons, tilers, painters, architects and site workers.',popular:['Block work','Painting','Tiling','Renovation']},
{id:'events',name:'Events',icon:'◇',desc:'Catering, decorators, planners, ushers, MCs, DJs and rentals.',popular:['Catering','Decoration','Photography','Event staff']},
{id:'beauty',name:'Beauty & Wellness',icon:'○',desc:'Barbers, stylists, makeup artists, fitness and wellness services.',popular:['Barber','Makeup','Hair styling','Fitness']},
{id:'logistics',name:'Logistics & Moving',icon:'□',desc:'Movers, warehouse support, packaging, freight and relocation.',popular:['House moving','Packing','Warehouse help','Haulage']},
{id:'auto',name:'Automotive',icon:'△',desc:'Mechanics, diagnostics, auto electrical, detailing, tyres and towing.',popular:['Car diagnostics','Mechanic','Detailing','Towing']},
{id:'agri',name:'Agriculture',icon:'♧',desc:'Farm workers, equipment operators, agronomists and farm support.',popular:['Farm labour','Equipment','Agronomy','Harvest help']},
{id:'professional',name:'Professional Services',icon:'§',desc:'Accounting, HR, research, compliance and specialist services.',popular:['Accounting','HR support','Research','Consulting']},
{id:'property',name:'Property Support',icon:'⌂',desc:'Property managers, inspections, maintenance and short-let support.',popular:['Property inspection','Maintenance','Short-let support','Management']},
{id:'custom',name:'Something Else',icon:'+',desc:'Describe any legitimate service. Nexthub is not limited to a fixed catalogue.',popular:['Describe your need','Custom request','Specialist work','Business request']}
];

export const PROVIDERS=[
{id:'p1',name:'Chinedu Okafor',role:'Generator & AC Technician',location:'Ikeja, Lagos',rating:4.9,jobs:126,verified:true,pro:true,response:'Usually replies in 12 min',price:'From ₦15,000',skills:['Generator','AC repair','Maintenance'],services:['Generator servicing','Air conditioner repair','Preventive maintenance'],bio:'Residential and commercial maintenance with clear diagnosis, transparent pricing and job updates.',portfolio:['Generator installations','AC servicing','Preventive maintenance'],availability:'Available today',joined:'2024',languages:['English','Yoruba']},
{id:'p2',name:'Amaka Bello',role:'Home Cleaner & Housekeeper',location:'Lekki, Lagos',rating:4.8,jobs:89,verified:true,pro:true,response:'Usually replies in 24 min',price:'From ₦12,000',skills:['Cleaning','Laundry','Move-out'],services:['Home cleaning','Office cleaning','Laundry'],bio:'Reliable home and office cleaning with recurring-service options for busy households and teams.',portfolio:['Homes','Offices','Move-out cleaning'],availability:'Available tomorrow',joined:'2023',languages:['English','Yoruba']},
{id:'p3',name:'Tunde Adeyemi',role:'Professional Driver',location:'Yaba, Lagos',rating:4.9,jobs:214,verified:true,pro:true,response:'Usually replies in 8 min',price:'From ₦10,000',skills:['Driver','Airport','Events'],services:['Personal driver','Airport transfer','Event transport'],bio:'Professional driving for personal, corporate and event needs with flexible booking windows.',portfolio:['Corporate trips','Airport transfers','Event transport'],availability:'Available today',joined:'2022',languages:['English','Yoruba']},
{id:'p4',name:'Sarah Ibrahim',role:'Product Designer',location:'Wuse, Abuja',rating:4.8,jobs:47,verified:true,pro:false,response:'Usually replies in 1 hr',price:'From ₦80,000',skills:['UI/UX','Figma','Web'],services:['UI/UX design','Web design','Design systems'],bio:'Product design from research and wireframes through polished, developer-ready interfaces.',portfolio:['Mobile apps','SaaS dashboards','Websites'],availability:'Available this week',joined:'2024',languages:['English','Hausa']},
{id:'p5',name:'Musa Lawal',role:'Plumber & Water Systems',location:'Ikeja, Lagos',rating:4.7,jobs:103,verified:true,pro:true,response:'Usually replies in 31 min',price:'From ₦10,000',skills:['Plumbing','Borehole','Pumps'],services:['Plumbing repairs','Borehole support','Pump installation'],bio:'Water systems, plumbing repairs and installations for homes, offices and commercial properties.',portfolio:['Boreholes','Pump systems','Plumbing installations'],availability:'Available today',joined:'2021',languages:['English','Yoruba']},
{id:'p6',name:'David Eze',role:'Full-stack Developer',location:'Port Harcourt, Rivers',rating:5,jobs:31,verified:true,pro:false,response:'Usually replies in 2 hrs',price:'From ₦120,000',skills:['React','Node','Supabase'],services:['Web apps','APIs','Business systems'],bio:'Web applications, APIs and business systems for growing teams, with clean handover documentation.',portfolio:['Web apps','Dashboards','APIs'],availability:'Available this week',joined:'2025',languages:['English','Igbo']},
{id:'p7',name:'Blessing Adebayo',role:'Event Decorator',location:'Surulere, Lagos',rating:4.9,jobs:74,verified:true,pro:true,response:'Usually replies in 15 min',price:'From ₦75,000',skills:['Decoration','Events','Styling'],services:['Event decoration','Balloon styling','Venue styling'],bio:'Modern event styling for birthdays, weddings, corporate events and intimate celebrations.',portfolio:['Birthdays','Weddings','Corporate events'],availability:'Available this week',joined:'2023',languages:['English','Yoruba']},
{id:'p8',name:'Emeka Nwosu',role:'CCTV & Network Specialist',location:'Gwarinpa, Abuja',rating:4.9,jobs:62,verified:true,pro:true,response:'Usually replies in 18 min',price:'From ₦35,000',skills:['CCTV','Networking','Security'],services:['CCTV installation','Network setup','Access control'],bio:'Security and network installations for homes, offices and growing businesses.',portfolio:['CCTV systems','Office networks','Access control'],availability:'Available today',joined:'2022',languages:['English','Igbo']}
];

export const REVIEWS=[
{provider:'Chinedu Okafor',rating:5,text:'Arrived on time, explained the fault clearly and completed the work without surprises.',author:'Michael A.'},
{provider:'Amaka Bello',rating:5,text:'Very professional. The apartment was properly cleaned and communication was excellent.',author:'Sarah O.'},
{provider:'Tunde Adeyemi',rating:4,text:'Good driver and punctual for the airport trip.',author:'David K.'},
{provider:'Blessing Adebayo',rating:5,text:'The setup looked exactly like the brief. Great attention to detail.',author:'Nneka I.'}
];

export const DEMO_JOBS=[
{id:'NX-1048',title:'Generator servicing',provider:'Chinedu Okafor',providerId:'p1',category:'Repairs & Trades',location:'Ikeja, Lagos',date:'2026-10-05',budget:'₦35,000',status:'IN_PROGRESS',progress:70,paid:true},
{id:'NX-1042',title:'Apartment deep cleaning',provider:'Amaka Bello',providerId:'p2',category:'Home & Cleaning',location:'Lekki, Lagos',date:'2026-10-07',budget:'₦25,000',status:'ACCEPTED',progress:20,paid:true},
{id:'NX-1031',title:'Airport transfer',provider:'Tunde Adeyemi',providerId:'p3',category:'Drivers & Transport',location:'Yaba → Lagos Airport',date:'2026-09-28',budget:'₦18,000',status:'COMPLETED',progress:100,paid:true}
];

export const PLATFORM_STATS={providers:'12,480+',jobs:'38,900+',cities:'24',rating:'4.8/5'};
