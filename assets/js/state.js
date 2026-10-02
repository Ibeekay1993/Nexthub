const KEY='nexthub_state_v2';
const seed={query:'',location:'',view:'home',saved:['p2'],tasks:[],profile:{name:'Ibukun',location:'Lagos',role:'Customer'},recent:[]};
let state={...seed,...load()};
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}}
export function getState(){return state}
export function setState(patch){state={...state,...patch};localStorage.setItem(KEY,JSON.stringify(state));return state}
export function addTask(task){const tasks=[{id:'task-'+Date.now(),status:'Open',createdAt:new Date().toISOString(),...task},...state.tasks];setState({tasks});return tasks[0]}
export function toggleSaved(id){const saved=state.saved.includes(id)?state.saved.filter(x=>x!==id):[...state.saved,id];setState({saved});return saved}
export function addRecent(q){if(!q)return;setState({recent:[q,...state.recent.filter(x=>x!==q)].slice(0,6)})}