import {JOB_BOARD} from '../world/money.js';

// The Town Hall hosts a small community bank counter. It is intentionally a
// fully reserved custodial bank: withdrawals and payments cannot create cash.
// No loans, interest or central-bank money creation are claimed.
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dollar=n=>'$'+Number(n||0).toLocaleString('en-AU',{maximumFractionDigits:0});
export const accountSummary=life=>({cash:life.money.cash,everyday:life.money.checking,
 savings:life.money.savings,total:life.money.total,method:life.money.payment});
export function walletPanel(life){
 const m=life.money,receipt=m.receipts.slice(0,9).map(x=>'<tr><td>Day '+x.day+'</td><td>'+esc(x.description)+'</td><td>'+dollar(x.amount)+'</td></tr>').join('');
 const bag=Object.entries(m.playerBag).filter(([k,n])=>n>0).map(([k,n])=>esc(k)+' × '+n).join(', ')||'None yet';
 return {
  title:'💳 Wallet & money',wide:true,
  body:'<p><b>Cash:</b> '+dollar(m.cash)+' · <b>Everyday account:</b> '+dollar(m.checking)+
    ' · <b>Savings:</b> '+dollar(m.savings)+'</p><p><b>Total money:</b> '+dollar(m.total)+
    ' · <b>Paying by:</b> '+esc(m.payment==='card'?'card (everyday account)':'cash')+
    ' · <b>Job income:</b> '+dollar(m.earned)+' · <b>Purchases:</b> '+dollar(m.spent)+'</p>'+
    '<p><b>Owned groceries:</b> '+bag+'</p>'+
    '<p class="dim">Player starts with $60 cash, $100 everyday and $40 savings. Buying actually deducts funds. Banking and paid jobs are available in town. Money is fictional game currency, saved only on this device.</p>'+
    '<h3>Recent transactions</h3><table class="ledger"><tr><th>When</th><th>Memo</th><th>Change</th></tr>'+receipt+'</table>',
  actions:[
    {label:m.payment==='card'?'Pay cash at shops instead':'Pay by card at shops instead',
      run:()=>{m.setPayment(m.payment==='card'?'cash':'card');return walletPanel(life)}},
    {label:'💼 See available paid jobs',run:()=>jobBoardPanel(life)},
  ]
 };
}
export function bankPanel(life){
 const m=life.money,open=life.open(life.place('hall'));
 return {title:'🏦 Town Community Bank',wide:true,
  body:'<p><b>Teller window:</b> '+(open?'Open (09:00–17:00)':'Closed (09:00–17:00)')+'</p>'+
    '<p><b>Cash in your pocket:</b> <span data-money="cash">'+dollar(m.cash)+'</span>'+
    ' · <b>Everyday:</b> <span data-money="checking">'+dollar(m.checking)+'</span>'+
    ' · <b>Savings:</b> <span data-money="savings">'+dollar(m.savings)+'</span></p>'+
    '<p><b>Bank-held cash backing your accounts:</b> <span data-money="vault">'+dollar(m.bankVault)+'</span>. '+
    'This simple bank keeps customer deposits fully backed: depositing moves cash into an account; withdrawing moves it back. Moving money into savings does not create more money.</p>'+
    '<p class="dim">This is not a real bank and does not yet offer loans, interest or mortgages. Withdrawals require enough funds. An open teller is needed for transactions.</p>',
  mount:container=>{
    const form=document.createElement('form');
    form.style.cssText='display:flex;gap:8px;flex-wrap:wrap;margin:14px 0;';
    const operation=document.createElement('select');operation.setAttribute('aria-label','Bank transaction');
    for(const [v,label]of [['deposit','Deposit cash'],['withdraw','Withdraw cash'],['save','Transfer everyday to savings'],['unsave','Transfer savings to everyday']]){
      const o=document.createElement('option');o.value=v;o.textContent=label;operation.append(o)
    }
    const amount=document.createElement('input');amount.type='number';amount.min='1';amount.max='1000000';amount.step='1';amount.value='10';amount.required=true;amount.setAttribute('aria-label','Whole Town Dollars');
    const button=document.createElement('button');button.type='submit';button.textContent='Confirm transaction';button.disabled=!open;
    const notice=document.createElement('p');notice.setAttribute('role','status');
    form.append(operation,amount,button);container.append(form,notice);
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(!life.open(life.place('hall'))){notice.textContent='The bank teller is closed.';return;}
      const result=m.bank(operation.value,Number(amount.value),life.day);
      notice.textContent=result.message;
      for(const [key,value]of Object.entries({cash:m.cash,checking:m.checking,savings:m.savings,vault:m.bankVault})){
        const el=container.querySelector('[data-money="'+key+'"]');if(el)el.textContent=dollar(value);
      }
    });
  },
  actions:[{label:'💳 View wallet and transactions',run:()=>walletPanel(life)}]
 };
}
export function jobBoardPanel(life,go){
 const m=life.money, rows=JOB_BOARD.map(j=>{
  const p=life.place(j.site),worked=!!m.completedJobs[life.day+':'+j.id];
  return '<tr><td>'+esc(j.name)+'</td><td>'+esc(p.name)+'</td><td>'+j.minutes+' town min</td><td>'+dollar(j.pay)+'</td><td>'+(worked?'Done today':life.open(p)?'Open':'Closed')+'</td></tr>';
 }).join('');
 return {title:'💼 Town job board',wide:true,
 body:'<p>Earn real in-game wages by spending town time at a workplace. Staff must be present. '+
 'You may finish two paid shifts per town day, at most one of each type. Every wage is debited from a business or council account and deposited into your everyday bank account.</p>'+
 '<table class="ledger"><tr><th>Job</th><th>Workplace</th><th>Time</th><th>Wage</th><th>Status</th></tr>'+rows+'</table>'+
 '<p class="dim">A job only progresses while you remain inside the workplace with a supervisor on shift. If you leave, the timer pauses.</p>',
 actions:JOB_BOARD.map(j=>({label:'Visit '+life.place(j.site).name+' for '+j.name,
    run:()=>{if(go)go(j.site);return null}}))}
}
export function jobPanel(life,site){
 const m=life.money,defs=JOB_BOARD.filter(j=>j.site===site),active=m.current(life.day);
 const p=life.place(site),working=life.villagers.filter(v=>v.work===site&&v.step?.kind==='work'&&!v.path?.length);
 let body='<p><b>Employer:</b> '+esc(p.name)+' · <b>Town time:</b> '+esc(life.time())+
  ' · <b>Supervisor(s) present:</b> '+esc(working.map(w=>w.name).join(', ')||'none')+'</p>';
 if(active)body+='<p><b>Current shift:</b> '+esc(m.jobById(active.id)?.name||active.id)+
  ' · '+Math.floor(active.worked)+' / '+active.required+' town minutes worked · <b>Pay:</b> '+dollar(active.pay)+
  '. Time counts only while physically working at the right location.</p>'+
  '<p><b>Duties:</b> '+(m.jobById(active.id)?.tasks||[]).map(k=>(active.doneTasks||[]).includes(k)?'✅ '+esc(k.replace(/-/g,' ')):'☐ '+esc(k.replace(/-/g,' '))).join(' · ')+'</p>';
 else body+='<p>No active shift. Choose work below. Pay is limited by the employer’s actual cash and operating account.</p>';
 body+='<p>Shifts completed today: '+m.workedToday(life.day)+' / 2. Unfinished shifts can be resumed today without restarting the timer.</p>';
 const actions=[];
 for(const job of defs)actions.push({
  label:job.name+' · '+job.minutes+' min · pays '+dollar(job.pay),
  run:()=>{const result=m.startJob(life,job.id,site);const p=jobPanel(life,site);p.body='<p><b>'+esc(result.message)+'</b></p>'+p.body;return p}
 });
 if(active&&active.site===site)actions.unshift({label:active.worked>=active.required?'✅ Clock out and collect '+dollar(active.pay):'Refresh worked time',
  run:()=>{
    const result=active.worked>=active.required?m.finishJob(life,site):{message:'Keep working here. '+Math.ceil(active.required-active.worked)+' minutes remaining.'};
    const p=jobPanel(life,site);p.body='<p><b>'+esc(result.message)+'</b></p>'+p.body;return p;
  }});
 actions.push({label:'💳 Check my wallet',run:()=>walletPanel(life)});
 return {title:'💼 Work at '+p.name,body,actions,wide:true};
}


// Work stations physically present in the 3D world. These require clock-in,
// a valid supervisor, and unique tasks at least five town minutes apart.
export function workTaskPanel(life,site,taskKey){
 const m=life.money,task=m.current(life.day),job=task?m.jobById(task.id):null;
 const eligible=!!(job&&job.site===site&&job.tasks.includes(taskKey));
 const done=!!task?.doneTasks?.includes(taskKey);
 return {
  title:'🧰 '+esc(taskKey.replace(/-/g,' ')),
  body:'<p>Workplace: '+esc(life.place(site)?.name||site)+
    '</p><p>'+(eligible?(done?'This duty has been completed.':
    'Perform this real work duty to progress towards your pay. Each distinct task counts once and must be separated by at least five town minutes.'):
    'Clock into a paid shift here first. You must perform the assigned workplace duties as well as complete the shift time.')+'</p>',
  actions:[
    ...(eligible&&!done?[{label:'Complete '+taskKey.replace(/-/g,' '),run:()=>{
      const result=m.performTask(life,site,taskKey);
      const p=jobPanel(life,site);p.body='<p><b>'+esc(result.message)+'</b></p>'+p.body;return p;
    }}]:[]),
    {label:'💼 Work shift progress',run:()=>jobPanel(life,site)}
  ]
 };
}
