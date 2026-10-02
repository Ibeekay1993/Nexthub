export const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
export const stars=n=>'★'.repeat(Math.max(1,Math.min(5,Math.round(n))));
export function modal(content){return '<div class="modal" id="modal" role="dialog" aria-modal="true"><div class="modal-card">'+content+'</div></div>'}
export function button(label,action,kind='secondary'){return '<button class="btn '+kind+'" data-action="'+esc(action)+'">'+esc(label)+'</button>'}
export function empty(title,text,action){return '<div class="empty"><div class="empty-mark">+</div><h3>'+esc(title)+'</h3><p>'+esc(text)+'</p>'+(action?button(action,'post-task','primary'):'')+'</div>'}