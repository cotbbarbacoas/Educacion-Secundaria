const TOTAL=35,SECONDS=3*60*60,EXAM='diag_d01_2024';
const KEY=ANSWER_KEY;
const ACCEPTED={31:"ABC"};
const isCorrect=(a,i)=>!!a&&(ACCEPTED[i+1]||KEY[i]).includes(a);
const BACKEND_READY=true;
const API='https://script.google.com/macros/s/AKfycbzTbcCEbXGaZgIHfiBo8MExOJ5o8wpPSTuvLgdaGHhRNzuwRCwPeyJy5xHXhy2P518HJQ/exec';
const LEGACY_API='https://script.google.com/macros/s/AKfycbwtRGWJPNc8n413pPLvQE5ntBUFfJeG2qKJVxhhNG9CM8tlxqXb-j07anfudEV7Zz0y/exec';
const STORE='pne_2024_diag_d01_attempt_v1',$=id=>document.getElementById(id);
let starting=false,pendingStart=null,statusRequest=0;
let answers=Array(TOTAL).fill(null),index=0,attemptId='',ticket='',student=null,endsAt=0,finished=false,timedOut=false,submitted=false,sending=false,available=false,ticker,abandoned=false,attemptNumber=0;
const area=n=>n<=12?'Geometría':n<=30?'Relaciones y Álgebra':'Estadística y Probabilidad';
const context=n=>n>=13&&n<=16?13:n>=33&&n<=34?33:null;
function renderManual(item,target,number){
  target.innerHTML=`<article class="manual-item"><p class="lead">${item.lead}</p>${item.pre?`<div class="pre">${item.pre}</div>`:''}${item.fig?`<div class="figure">${drawFigure(item.fig)}</div>`:''}${item.ask?`<p class="ask">${item.ask}</p>`:''}${item.options?`<div class="choice-list" role="group" aria-label="Selecciona tu respuesta">${item.options.map((option,i)=>{const letter='ABC'[i];return `<button type="button" class="choice${number&&answers[number-1]===letter?' selected':''}" data-answer="${letter}" aria-pressed="${number&&answers[number-1]===letter?'true':'false'}"><span class="choice-letter">${letter})</span><span class="choice-content">${option}</span></button>`}).join('')}</div>`:''}</article>`;
  target.querySelectorAll('[data-fig]').forEach(el=>{el.innerHTML=drawFigure(el.dataset.fig)});
  if(number)target.querySelectorAll('[data-answer]').forEach(button=>{button.onclick=()=>{answers[number-1]=button.dataset.answer;show(number-1)}});
}
function save(){try{localStorage.setItem(STORE,JSON.stringify({answers,index,attemptId,ticket,student,endsAt,finished,timedOut,submitted,abandoned,attemptNumber}))}catch{}}
function restore(){try{const s=JSON.parse(localStorage.getItem(STORE)||'null');if(!s)return;answers=Array.from({length:TOTAL},(_,i)=>'ABC'.includes(s.answers?.[i])?s.answers[i]:null);index=Math.max(0,Math.min(TOTAL-1,Number(s.index)||0));attemptId=s.attemptId||'';ticket=s.ticket||'';student=s.student||null;endsAt=Number(s.endsAt)||0;finished=!!s.finished;timedOut=!!s.timedOut;submitted=!!s.submitted;abandoned=!!s.abandoned;attemptNumber=Number(s.attemptNumber)||0}catch{}}
function uuid(){return crypto.randomUUID?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>(Math.random()*16|0).toString(16))}
function jsonp(op,extra={},onProgress){return ExamConnection.request(API,{op,exam:EXAM,...extra},{onProgress})}
async function check(){
 if(typeof BACKEND_READY!=='undefined'&&!BACKEND_READY){available=false;$('start').disabled=true;$('retry').hidden=true;$('availability').textContent='Esta prueba aún no está habilitada.';return false;}
 const request=++statusRequest,chosen=$('section').value;
 available=false;$('start').disabled=true;$('retry').hidden=true;$('availability').textContent='Consultando disponibilidad de la prueba…';
 const current=()=>request===statusRequest&&chosen===$('section').value;
 try{
  const status=await jsonp('status',chosen?{section:chosen}:{},message=>{if(current())$('availability').textContent=message;});
  if(!current())return false;
  if(Array.isArray(status.sections)){const options=status.sections.filter(s=>/^(?:[7-9]|1[0-2])-[1-9][0-9]?$/.test(s));const selected=$('section').value;$('section').replaceChildren(new Option('Selecciona tu sección',''),...options.map(s=>new Option(s,s)));$('section').value=options.includes(selected)?selected:'';}
  available=!!status.open&&!!$('section').value;$('availability').textContent=available?`Prueba disponible para ${$('section').value}${status.endsAt?' hasta '+status.endsAt+' (Costa Rica)':''}.`:status.message||'La prueba está cerrada.';$('start').disabled=starting||!available;return available;
 }catch(e){if(!current())return false;$('availability').textContent=e.message;$('retry').hidden=false;$('retry').textContent='Volver a consultar';return false;}
}
function count(){const n=answers.filter(Boolean).length;$('counter').textContent=`${n} / ${TOTAL} respondidas`;$('sidebarCount').textContent=`${n} de ${TOTAL} respondidos`;return n}
function show(n){index=n;const id=n+1,c=context(id);$('qtitle').textContent=`Ítem ${id} de ${TOTAL}`;$('area').textContent=`Área: ${area(id)}`;$('qstatus').textContent=answers[n]?`Respuesta: ${answers[n]}`:'Sin responder';renderManual(QUESTIONS[n],$('questionVector'),id);$('context').hidden=!c;if(c)renderManual(SHARED[c],$('contextVector'));$('prev').disabled=n===0;$('next').textContent=n===TOTAL-1?'Finalizar':'Siguiente →';const grid=$('grid');grid.replaceChildren();answers.forEach((answer,i)=>{const button=document.createElement('button');button.type='button';button.textContent=i+1;button.className=(answer?'answered ':'')+(i===n?'current':'');button.setAttribute('aria-label',`Ir al ítem ${i+1}${answer?', respondido':''}`);button.onclick=()=>show(i);grid.append(button)});count();save()}
function format(t){const h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=t%60;return[h,m,s].map(x=>String(x).padStart(2,'0')).join(':')}
function clock(){const remaining=Math.max(0,Math.ceil((endsAt-Date.now())/1000));$('clock').textContent=format(remaining);if(!remaining&&!finished)finish(true)}
function enter(){if(!attemptId||!ticket)return;$('welcome').hidden=true;$('results').hidden=true;$('exam').hidden=false;show(index);clock();clearInterval(ticker);ticker=setInterval(clock,1000)}
async function start(){
 if(starting)return;
 const firstName=$('firstName').value.trim().replace(/\s+/g,' '),lastName=$('lastName').value.trim().replace(/\s+/g,' '),section=$('section').value,valid=/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñÀ-ÿ' .-]{2,70}$/;
 if(!valid.test(firstName)||!valid.test(lastName)){$('availability').textContent='Escribe tu nombre y tus apellidos.';return;}
 if(!section){$('availability').textContent='Selecciona tu sección.';return;}
 const identity=JSON.stringify([firstName,lastName,section]);
 if(pendingStart&&pendingStart.identity!==identity)pendingStart=null;
 starting=true;statusRequest++;$('start').disabled=true;$('retry').hidden=true;
 for(const id of ['firstName','lastName','section'])$(id).disabled=true;
 try{
  if(!available&&!pendingStart){await check();if(!available)return;}
  statusRequest++;
  if(!pendingStart)pendingStart={id:uuid(),identity};
  const attempt=pendingStart.id;
  $('availability').textContent='Confirmando el inicio de la prueba. Espera sin recargar…';
  const status=await jsonp('start',{id:attempt,section,firstName,lastName,platform:'cotb'},message=>{$('availability').textContent=message;});
  if(!status.open||!status.ticket)throw Error(status.message||'La prueba no está disponible.');
  const end=Number(status.attemptEndsAtEpoch)||0;
  if(end<=Date.now())throw Error('El horario de la prueba terminó.');
  answers=Array(TOTAL).fill(null);index=0;finished=false;timedOut=false;abandoned=false;submitted=false;attemptNumber=Number(status.attemptNumber)||0;student={firstName,lastName,section};attemptId=attempt;ticket=status.ticket;endsAt=end;pendingStart=null;save();enter();
 }catch(e){
  if(!e.retryable)pendingStart=null;
  $('availability').textContent=e.retryable?'No se confirmó el inicio. Pulsa «Volver a consultar» para comprobar el mismo intento sin duplicarlo. No recargues la página.':e.message;
  $('retry').hidden=false;$('retry').textContent='Volver a consultar';
 }finally{starting=false;for(const id of ['firstName','lastName','section'])$(id).disabled=false;$('start').disabled=!available;}
}
function grade(){const correct=answers.filter((a,i)=>isCorrect(a,i)).length,blank=answers.filter(a=>!a).length;$('score').textContent=`${correct} / ${TOTAL}`;$('scorePercent').textContent=`${Math.round(100*correct/TOTAL)} % de respuestas correctas${timedOut?' · Tiempo agotado':''}`;const passed=100*correct/TOTAL>=70;$('gradeStatus').textContent=`Nota: ${Math.round(100*correct/TOTAL)}/100 · ${passed?'Aprobado':'Reprobado'}`;$('gradeStatus').style.color=passed?'#166534':'#991b1b';$('correct').textContent=correct;$('wrong').textContent=TOTAL-correct-blank;$('blank').textContent=blank;const chart=$('areaCharts');chart.replaceChildren();for(const [label,first,last] of [['Geometría',1,12],['Relaciones y Álgebra',13,30],['Estadística y Probabilidad',31,35]]){let c=0,w=0,b=0;for(let i=first-1;i<last;i++){if(isCorrect(answers[i],i))c++;else if(answers[i])w++;else b++}let total=last-first+1,pct=100*c/total;const card=document.createElement('article'),heading=document.createElement('h3'),pie=document.createElement('div'),rate=document.createElement('div'),legend=document.createElement('div');card.className='chart';heading.textContent=label;pie.className='pie';pie.style.setProperty('--c',pct+'%');pie.style.setProperty('--w',100*(c+w)/total+'%');pie.setAttribute('role','img');pie.setAttribute('aria-label',`${label}: ${c} correctas, ${w} incorrectas, ${b} sin responder, de ${total} ítems`);rate.className='rate';rate.textContent=pct.toFixed(0)+' %';legend.className='legend';legend.textContent=`Correctas ${c} · Incorrectas ${w} · Sin responder ${b}`;card.append(heading,pie,rate,legend);chart.append(card)}renderReview()}
function renderReview(){const review=$('review');review.replaceChildren();answers.forEach((answer,i)=>{const row=document.createElement('article'),top=document.createElement('div'),label=document.createElement('b'),yours=document.createElement('span'),correct=document.createElement('span'),solution=document.createElement('div');row.className='review-row';top.className='review-top';label.textContent=`Ítem ${i+1}`;yours.textContent='Tu respuesta: ';const given=document.createElement('strong');given.className=isCorrect(answer,i)?'ok':'bad';given.textContent=answer||'—';yours.append(given);correct.textContent=ACCEPTED[i+1]?'Aceptadas: ':'Correcta: ';const key=document.createElement('strong');key.className='ok';key.textContent=ACCEPTED[i+1]?ACCEPTED[i+1].split('').join(' o '):KEY[i];correct.append(key);top.append(label,yours,correct);solution.className='review-solution';solution.innerHTML=`<b>Solución:</b><div>${SOLUTIONS[i]}</div>`;row.append(top,solution);review.append(row)})}
function result(){attemptNotice();clearInterval(ticker);$('welcome').hidden=true;$('exam').hidden=true;$('results').hidden=false;$('clock').textContent='00:00:00';grade();window.scrollTo(0,0)}
function finish(auto=false){$('finishDialog').close();if(finished){result();return}if(!auto){const missing=TOTAL-count();$('finishMessage').textContent=missing?`Aún tienes ${missing} ${missing===1?'ítem':'ítems'} sin responder. ¿Deseas finalizar de todas formas?`:'Has respondido todos los ítems. ¿Deseas finalizar?';$('finishDialog').showModal();return}clearInterval(ticker);finished=true;timedOut=endsAt<=Date.now();save();result();send()}
function send(){if(submitted||sending||!ticket)return;sending=true;$('delivery').textContent='Enviando respuestas al registro privado…';$('delivery').hidden=false;$('retryDelivery').hidden=true;const nonce=uuid(),frame=document.createElement('iframe'),form=document.createElement('form');frame.name='upload_'+nonce.replace(/-/g,'');frame.hidden=true;form.hidden=true;form.method='POST';form.action=student?.section?API:LEGACY_API;form.target=frame.name;const payload=attemptPayload();for(const [name,value] of Object.entries({exam:EXAM,nonce,origin:location.origin,op:abandoned?'abandon':'finish',payload:JSON.stringify(payload)})){const input=document.createElement('input');input.name=name;input.value=value;form.append(input)}document.body.append(frame,form);let timeout;const done=(message,retry)=>{clearTimeout(timeout);window.removeEventListener('message',onMessage);form.remove();frame.remove();sending=false;submitted=!retry;save();$('delivery').textContent=message;$('delivery').hidden=!message;$('retryDelivery').hidden=!retry};const onMessage=e=>{if(!/^https:\/\/(?:script\.google\.com|script\.googleusercontent\.com|[a-z0-9-]+[.-]script\.googleusercontent\.com)$/.test(e.origin)||e.data?.kind!=='educacion-abierta-exam-save'||e.data.nonce!==nonce)return;if(e.data.status==='ok'||e.data.status==='duplicate')done('',false);else done(e.data.message||'No se pudo guardar el resultado.',true)};window.addEventListener('message',onMessage);timeout=setTimeout(()=>done('El servidor está tardando y no se confirmó la recepción. Pulsa «Reintentar envío»; se conservarán tus respuestas y el mismo intento.',true),60000);form.submit()}
function reset(){pendingStart=null;statusRequest++;abandonAttempt();clearInterval(ticker);abandoned=false;attemptNumber=0;localStorage.removeItem(STORE);answers=Array(TOTAL).fill(null);index=0;attemptId='';ticket='';student=null;endsAt=0;finished=false;timedOut=false;submitted=false;$('review').hidden=true;$('reviewBtn').textContent='Revisar respuestas';$('reviewBtn').setAttribute('aria-expanded','false');$('results').hidden=true;$('exam').hidden=true;$('welcome').hidden=false;$('clock').textContent=format(SECONDS);$('firstName').value='';$('lastName').value='';$('section').value='';count();check()}
$('section').addEventListener('change',check);$('start').onclick=start;$('retry').onclick=()=>pendingStart?start():check();$('retryDelivery').onclick=send;$('menuBtn').onclick=()=>{abandonAttempt();location.assign('../')};$('reviewBtn').onclick=()=>{const open=$('review').hidden;$('review').hidden=!open;$('reviewBtn').textContent=open?'Ocultar revisión':'Revisar respuestas';$('reviewBtn').setAttribute('aria-expanded',String(open))};$('restart').onclick=reset;$('prev').onclick=()=>show(Math.max(0,index-1));$('next').onclick=()=>index<TOTAL-1?show(index+1):finish(false);$('finish').onclick=()=>finish(false);$('cancelFinish').onclick=()=>$('finishDialog').close();$('confirmFinish').onclick=()=>{finish(true)};

function attemptPayload(){return {attemptId,ticket,sessionId:'',firstName:student.firstName,lastName:student.lastName,section:student.section,answers,elapsedSeconds:SECONDS-Math.max(0,(endsAt-Date.now())/1000),timedOut,abandoned};}
function abandonAttempt(){
 if(!attemptId||!ticket||finished||!student)return;
 finished=true;abandoned=true;clearInterval(ticker);save();
 const body=new URLSearchParams({op:'abandon',exam:EXAM,nonce:uuid(),origin:location.origin,payload:JSON.stringify(attemptPayload())});
 try{if(!navigator.sendBeacon(API,body))fetch(API,{method:'POST',body,mode:'no-cors',keepalive:true}).catch(()=>{});}catch{}
}
function attemptNotice(){
 let notice=document.getElementById('attemptNotice');
 if(!notice){notice=document.createElement('p');notice.id='attemptNotice';notice.setAttribute('role','status');$('results').insertBefore(notice,$('results').firstChild);}
 notice.textContent=(attemptNumber?'Intento '+attemptNumber+' · ':'')+(abandoned?'Intento consumido al salir o recargar. Para continuar debes iniciar uno nuevo.':'Intento finalizado. Para repetir debes iniciar uno nuevo y tener cupo disponible.');
}
window.addEventListener('pagehide',abandonAttempt);
window.addEventListener('pageshow',e=>{if(e.persisted&&abandoned)result();});
const attemptHelp=document.createElement('p');attemptHelp.className='availability-note';attemptHelp.textContent='Cada inicio consume un intento. Si sales, cierras o recargas esta página, debes iniciar un intento nuevo desde cero. Usa siempre el mismo nombre, apellidos y sección.';$('welcome').append(attemptHelp);

restore();count();
if(attemptId&&ticket&&!finished){abandonAttempt();reset();$('availability').textContent='El intento anterior se consumió al salir o recargar. Inicia uno nuevo desde cero.';}
else if(new URLSearchParams(location.search).has('nuevo'))reset();
else if(finished){result();if(!submitted)$('retryDelivery').hidden=false;}
else check();
