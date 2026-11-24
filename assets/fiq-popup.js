(function(){var L=window.FIQ_LATEST;if(!L)return;var force=window.FIQ_FORCE,pop,timer,left,t0;
function get(k){try{return localStorage.getItem(k)}catch(e){return null}}function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var due=force||get('fiq-seen')!==L.id||Date.now()-(+get('fiq-seen-ts')||0)>14*864e5;if(!due)return;
function close(){if(!pop)return;clearTimeout(timer);var p=pop;pop=null;p.classList.remove('in');p.classList.add('out');setTimeout(function(){p.remove()},600)}
function run(ms){left=ms;t0=Date.now();clearTimeout(timer);timer=setTimeout(close,ms)}
function show(){if(pop)return;pop=document.createElement('div');pop.className='fiq-pop';pop.setAttribute('role','dialog');pop.setAttribute('aria-label',L.tag+': '+L.title);
pop.innerHTML='<button class="x" aria-label="Close">&times;</button><div class="row"><div class="ico"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#c9a227" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 4.7L18.5 9l-4.7 1.8L12 15.5l-1.8-4.7L5.5 9l4.7-1.3z"/><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></svg></div><div><div class="tg">'+L.tag+'</div><h3>'+L.title+'</h3></div></div><p style="margin-top:10px">'+L.text+'</p><a class="go" href="'+L.url+'">'+L.cta+' <span aria-hidden="true">&rarr;</span></a><div class="pb"></div>';
document.body.appendChild(pop);pop.querySelector('.x').onclick=close;pop.querySelector('.go').addEventListener('click',function(){set('fiq-seen',L.id)});
pop.addEventListener('pointerenter',function(){clearTimeout(timer);left-=Date.now()-t0;pop.classList.add('hold')});pop.addEventListener('pointerleave',function(){pop.classList.remove('hold');run(Math.max(left,1200))});
requestAnimationFrame(function(){requestAnimationFrame(function(){pop.classList.add('in')})});run(5000);set('fiq-seen',L.id);set('fiq-seen-ts',Date.now())}
document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
function start(){setTimeout(show,force?1200:5000);if(force){var b=document.createElement('button');b.className='fiq-replay';b.textContent='\u21BB Replay popup';b.onclick=function(){close();setTimeout(show,700)};document.body.appendChild(b)}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start()})();
