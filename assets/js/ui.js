export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
export const stars=r=>'★★★★★'.split('').map((x,i)=>'<span class="'+(i<Math.round(r)?'star on':'star')+'">'+x+'</span>').join('');
export const initials=n=>String(n||'').split(/\s+/).filter(Boolean).map(x=>x[0]).join('').slice(0,2).toUpperCase();
export const money=v=>{const n=Number(String(v||'').replace(/[^0-9.]/g,''));return n?'₦'+n.toLocaleString('en-NG'):'—'};
export const empty=(title,desc,href='#/tasks/new')=>'<div class="empty"><div class="empty-icon">+</div><h3>'+esc(title)+'</h3><p>'+esc(desc)+'</p><a class="btn primary" href="'+href+'">Continue</a></div>';
export const href=(path,label,cls='')=>'<a class="'+cls+'" href="#'+path+'">'+esc(label)+'</a>';
