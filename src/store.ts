import { useSyncExternalStore } from 'react';
import { sampleJobs, type DemoState, type Job, type Role } from './domain';

const key = 'nexthub:marketplace-demo:v2';
const initial: DemoState = { role: 'Customer', saved: [], jobs: sampleJobs, proposals: [] };
let state: DemoState = read();
const listeners = new Set<() => void>();

function read(): DemoState {
  try {
    const saved = localStorage.getItem(key);
    return saved ? { ...initial, ...JSON.parse(saved) as Partial<DemoState> } : initial;
  } catch { return initial; }
}
function publish(next: DemoState) {
  state = next;
  try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* Demo remains usable for this page view. */ }
  listeners.forEach((listener) => listener());
}
export function useDemoState() { return useSyncExternalStore((listener) => { listeners.add(listener); return () => listeners.delete(listener); }, () => state); }
export function setRole(role: Role) { publish({ ...state, role }); }
export function toggleSaved(id: string) { publish({ ...state, saved: state.saved.includes(id) ? state.saved.filter((x) => x !== id) : [...state.saved, id] }); }
export function createJob(input: Omit<Job, 'id' | 'status'>) {
  const job: Job = { ...input, id: `NX-DEMO-${Date.now().toString().slice(-6)}`, status: 'REQUESTED' };
  publish({ ...state, jobs: [job, ...state.jobs] });
  return job.id;
}
export function updateJob(id: string, patch: Partial<Job>) { publish({ ...state, jobs: state.jobs.map((job) => job.id === id ? { ...job, ...patch } : job) }); }
export function proposeService(name: string) { publish({ ...state, proposals: [...state.proposals, name.trim()] }); }
