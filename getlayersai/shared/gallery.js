const search=document.querySelector('#search');
const cards=[...document.querySelectorAll('.study')];
const groups={'Product & tech':['Intelligence','Product','Finance','Developer','Automation','Infrastructure'],'Creative':['Studio','Portfolio','Exhibition'],'Lifestyle':['Sport','Health']};
let selected='All';
function filter(){const q=search.value.trim().toLowerCase();let count=0;for(const card of cards){const show=(selected==='All'||groups[selected].includes(card.dataset.category))&&card.dataset.name.includes(q);card.hidden=!show;if(show)count++;}document.querySelector('#result-count').textContent=`${count} ${count===1?'study':'studies'}`;document.querySelector('#empty').hidden=count!==0;}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));filter();}));
search.addEventListener('input',filter);
document.querySelector('#reset').addEventListener('click',()=>{search.value='';document.querySelector('[data-filter="All"]').click();search.focus();});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();search.focus();}});
