const KEY='nexthub:v4';
const seed={session:{user:'Ibukun Afolayan',role:'Customer'},saved:['p1','p4'],query:'',location:'',tasks:[],notifications:3,recent:[],profile:{name:'Ibukun Afolayan',location:'Ikeja, Lagos',role:'Customer'},draft:null};
export function getState(){try{return {...seed,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...seed}}}
export function setState(patch){const next={...getState(),...patch};localStorage.setItem(KEY,JSON.stringify(next));return next}
export function resetDemo(){localStorage.removeItem(KEY);location.hash='#/'}
export function toggleSaved(id){const s=getState(),saved=s.saved.includes(id)?s.saved.filter(x=>x!==id):[...s.saved,id];setState({saved})}
export function addRecent(q){if(!q)return;const s=getState();setState({recent:[q,...s.recent.filter(x=>x!==q)].slice(0,6)})}
export function addTask(task){const s=getState();const id='NX-'+(1050+s.tasks.length);const item={...task,id,status:'REQUESTED',progress:0,created:'Just now',paid:false};setState({tasks:[item,...s.tasks]});return item}
export function updateTask(id,patch){const s=getState();setState({tasks:s.tasks.map(t=>t.id===id?{...t,...patch}:t)})}
