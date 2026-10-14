import {createProductScene} from './scene.js';

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const media=matchMedia('(prefers-reduced-motion: reduce)');
let motion=!media.matches,selected=0,scene=null,opener=null,cart=0,quantity=1;
const names=['Diet Classic','Zero Lime'];
const dialog=$('#detail-dialog');
let toastTimer;
function toast(text){$('#toast').textContent=text;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').textContent='',4000);}
function updateMotion(){const b=$('#motion-toggle');b.setAttribute('aria-pressed',String(!motion));b.setAttribute('aria-label',motion?'Pause automatic motion':'Resume automatic motion');b.querySelector('.motion-label').textContent=motion?'Pause motion':'Resume motion';b.querySelector('.motion-symbol').textContent=motion?'Ⅱ':'▷';scene?.setMotion(motion);}
function setFlavor(value){selected=(value+2)%2;$('.experience').dataset.flavor=selected?'lime':'classic';$$('[data-select]').forEach(b=>{const active=Number(b.dataset.select)===selected;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});$('#scene').setAttribute('aria-label',selected?'A large tilted blue metallic soda can with floating blueberries and leaves':'A large tilted green metallic soda can with floating cherries and leaves');$('#flavor-status').textContent=names[selected]+' selected. '+(selected?'Blue can with blueberries.':'Green can with cherries.');if(scene)scene.setFlavor(selected);else document.documentElement.style.setProperty('--flavor',selected);}
$$('[data-select]').forEach(b=>b.addEventListener('click',()=>setFlavor(Number(b.dataset.select))));
$$('[data-direction]').forEach(b=>b.addEventListener('click',()=>setFlavor(selected+Number(b.dataset.direction))));
$('#motion-toggle').addEventListener('click',()=>{motion=!motion;updateMotion();});
media.addEventListener('change',e=>{motion=!e.matches;updateMotion();});
updateMotion();
function mobileMenu(open){$('.nav').classList.toggle('open',open);$('.mobile-menu').setAttribute('aria-expanded',String(open));}
$('.mobile-menu').addEventListener('click',()=>mobileMenu(!$('.nav').classList.contains('open')));
addEventListener('keydown',e=>{if(e.key==='Escape'&&$('.nav').classList.contains('open')){mobileMenu(false);$('.mobile-menu').focus();}});

const content={
  ingredients:{title:'Nothing to hide.',html:'<p>The source clip shows a zero-sugar product concept, but does not include an ingredient panel. This rebuild preserves the visual experience without inventing a formula or nutritional claims.</p><p class="note">For actual ingredients or allergens, consult the manufacturer’s packaging. This is an independent design study, not a product listing.</p>'},
  taste:{title:'Pick your world.',html:'<p>Two flavors. Two atmospheres. Switch between the emerald cherry scene and the deep-blue blueberry scene.</p><div class="line"><span>Diet Classic</span><button class="dialog-action" style="margin:0" data-taste="0">Choose green ↗</button></div><div class="line"><span>Zero Lime</span><button class="dialog-action" style="margin:0" data-taste="1">Choose blue ↗</button></div><p class="note">The flavor names and fruit combinations follow the visible reference, including its “Zero Lime” / blueberry pairing.</p>'},
  eco:{title:'A lighter footprint.',html:'<p>The can’s aluminum construction is part of the original visual direction. No environmental certifications or brand sustainability claims are implied by this recreation.</p><p class="note">The source video does not show this navigation panel. This explanatory sheet is an accessible local interaction, not a reconstructed unseen page.</p>'},
  reviews:{title:'The first impression.',html:'<p>This is a visual reconstruction under review. The original seven-second clip does not show customer reviews, so no testimonials or ratings have been invented.</p><p>Try the flavor cards, move your pointer around the fruit, and inspect the can as it turns.</p><p class="note">Your visual approval—not the number of passing tests—is the acceptance gate for this rebuild.</p>'},
  about:{title:'Reference, not guesswork.',html:'<p>This version was rebuilt after extracting actual frames from the GetLayers Soda video. It restores the single-screen composition, script headlines, emerald and blue worlds, large diagonal can, and flavor transitions.</p><p>The interactive scene is rendered live. It is not the original video played behind buttons.</p><div class="line"><span>Reference</span><a href="https://www.getlayers.ai/layer/soda" target="_blank" rel="noopener">GetLayers / Soda ↗</a></div><div class="line"><span>Build</span><a href="./methodology.html">Methodology ↗</a></div><p class="note">Independent study. Guaraná Antarctica is depicted only to match the reference; no affiliation, endorsement, real sale, or award is claimed. Geometry and label artwork are reconstructed, not the original model. This revision is not deployed to the published collection.</p>'},
  contact:{title:'Say hello.',html:'<p>Try the contact interaction with sample details. Nothing is sent or stored.</p><form id="contact-form"><label class="form-label" for="name">Name</label><input id="name" name="name" required maxlength="80" autocomplete="off" placeholder="Sample name"><label class="form-label" for="email">Email</label><input id="email" name="email" type="email" required maxlength="160" autocomplete="off" placeholder="you@example.com"><label class="form-label" for="message">Your message</label><textarea id="message" name="message" rows="3" maxlength="1000"></textarea><button class="dialog-action" type="submit">Complete local demo ↗</button></form><p class="note" id="contact-status" role="status">Demonstration only. There is no connected inbox.</p>'}
};
function openSheet(key){
  opener=document.activeElement;mobileMenu(false);quantity=1;
  if(key==='shop'){
    $('#dialog-title').textContent='Your kind of refreshment.';
    $('#dialog-content').innerHTML=`<p>${names[selected]} · 350 ml</p><div class="quantity"><button data-quantity="-1" aria-label="Remove one can">−</button><output id="quantity">1</output><button data-quantity="1" aria-label="Add one can">+</button></div><div class="purchase-total" id="total">$2.99</div><button class="dialog-action" id="add-to-bag">Add to demo bag ↗</button><p class="note">Local demonstration only. No payment, checkout, or order will be placed.</p>`;
    $$('[data-quantity]').forEach(b=>b.addEventListener('click',()=>{quantity=Math.max(1,Math.min(24,quantity+Number(b.dataset.quantity)));$('#quantity').textContent=quantity;$('#total').textContent='$'+(quantity*2.99).toFixed(2);}));
    $('#add-to-bag').addEventListener('click',()=>{cart+=quantity;$('.cart-count').hidden=false;$('.cart-count').textContent=cart;dialog.close();toast(`${quantity} ${names[selected]} added to the local demo bag. No order placed.`);});
  }else{
    const entry=content[key];$('#dialog-title').textContent=entry.title;$('#dialog-content').innerHTML=entry.html;
    $$('[data-taste]').forEach(b=>b.addEventListener('click',()=>{setFlavor(Number(b.dataset.taste));dialog.close();}));
    $('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();if(!e.target.reportValidity())return;e.target.reset();e.target.hidden=true;$('#contact-status').textContent='Demo complete. Nothing was sent or saved.';$('#contact-status').setAttribute('tabindex','-1');$('#contact-status').focus();});
  }
  dialog.showModal();
}
$$('[data-open]').forEach(b=>b.addEventListener('click',()=>openSheet(b.dataset.open)));
$$('[data-page]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.page==='home'){mobileMenu(false);setFlavor(0);}else openSheet(b.dataset.page);}));
$('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>opener?.focus());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});

try {
  scene=await createProductScene($('#product-canvas'),status=>{
    $('#scene').classList.toggle('ready',status==='ready');
    $('.scene-status').hidden=status==='ready';
  });
  scene?.setMotion(motion);scene?.setFlavor(selected);
}catch(error){console.error('Soda scene could not initialize:',error);$('.scene-status').hidden=false;}
addEventListener('pagehide',()=>{clearTimeout(toastTimer);scene?.dispose();});
