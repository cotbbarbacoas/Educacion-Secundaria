'use strict';
const TOTAL=QUESTIONS.length,SECONDS=10800,STORE='cotb_olimpiadas_i_2025_practica_v1';
const $=id=>document.getElementById(id);
let answers=Array(TOTAL).fill(null),index=0,endsAt=0,finished=false,timedOut=false,ticker=null;
const canonical=a=>/^[0-9]+$/.test(String(a))?String(a).replace(/^0+(?=\d)/,''):null;
const isCorrect=(a,i)=>QUESTIONS[i].type==='number'?canonical(a)===ANSWER_KEY[i]:a===ANSWER_KEY[i];
function save(){try{localStorage.setItem(STORE,JSON.stringify({answers,index,endsAt,finished,timedOut}))}catch{}}
function restore(){
 try{
  const s=JSON.parse(localStorage.getItem(STORE)||'null');if(!s||!Number.isFinite(s.endsAt)||s.endsAt<=0)return;
  answers=Array.from({length:TOTAL},(_,i)=>{
   const a=s.answers?.[i];if(typeof a!=='string'||a.length>64)return null;
   return QUESTIONS[i].type==='choice'?(/^[ABCD]$/.test(a)?a:null):(a||null);
  });
  index=Math.max(0,Math.min(TOTAL-1,Math.floor(Number(s.index)||0)));endsAt=s.endsAt;finished=!!s.finished;timedOut=!!s.timedOut;
 }catch{}
}
function format(seconds){return [Math.floor(seconds/3600),Math.floor(seconds%3600/60),seconds%60].map(x=>String(x).padStart(2,'0')).join(':')}
function count(){
 const n=answers.filter(a=>a!==null).length;$('counter').textContent=`${n} / ${TOTAL} respondidas`;$('sidebarCount').textContent=`${n} de ${TOTAL} respondidos`;
 return n;
}
function updateAnswer(value){
 answers[index]=value||null;
 $('qstatus').textContent=value?'Respuesta: '+value:'Sin responder';count();
 const nav=$('grid').children[index];if(nav)nav.classList.toggle('answered',!!value);
 save();
}
function renderManual(item,target,number){
 target.innerHTML=`<article class="manual-item"><p class="lead">${item.lead}</p>${item.pre?`<div class="pre">${item.pre}</div>`:''}${item.fig?`<div class="figure">${drawFigure(item.fig)}</div>`:''}${item.ask?`<p class="ask">${item.ask}</p>`:''}${item.options?`<div class="choice-list" role="group" aria-label="Selecciona tu respuesta">${item.options.map((option,i)=>`<button type="button" class="choice" data-answer="${'ABCD'[i]}" aria-pressed="false"><span class="choice-letter">${'ABCD'[i]})</span><span class="choice-content">${option}</span></button>`).join('')}</div>`:`<label class="numeric-answer" for="numericResponse"><b>Respuesta numérica</b><input id="numericResponse" type="text" inputmode="numeric" pattern="[0-9]+" maxlength="64" autocomplete="off" spellcheck="false" aria-describedby="numericHelp numericError"><small id="numericHelp">Escribe únicamente números. No uses espacios, puntos, comas, letras ni unidades.</small><small id="numericError" class="numeric-error" role="status"></small></label>`}${number?'<button type="button" id="clearAnswer">Borrar respuesta</button>':''}</article>`;
 if(!number)return;
 const selected=answers[number-1];
 target.querySelectorAll('[data-answer]').forEach(button=>{
  const chosen=selected===button.dataset.answer;button.classList.toggle('selected',chosen);button.setAttribute('aria-pressed',String(chosen));
  button.onclick=()=>{if(finished)return;updateAnswer(button.dataset.answer);target.querySelectorAll('[data-answer]').forEach(b=>{const chosen=b===button;b.classList.toggle('selected',chosen);b.setAttribute('aria-pressed',String(chosen));});};
 });
 const input=$('numericResponse');
 if(input){
  input.value=selected||'';
  const validate=()=>{const valid=!input.value||/^[0-9]+$/.test(input.value);input.setAttribute('aria-invalid',String(!valid));$('numericError').textContent=valid?'':'Usa únicamente los dígitos del 0 al 9.';};
  validate();input.addEventListener('input',()=>{if(finished)return;updateAnswer(input.value);validate();});
 }
 $('clearAnswer').onclick=()=>{if(finished)return;updateAnswer('');show(index);};
}
function show(n,focus=false){
 index=Math.max(0,Math.min(TOTAL-1,n));
 $('qtitle').textContent=`Ítem ${index+1} de ${TOTAL}`;$('area').textContent='Tema: '+QUESTIONS[index].area;
 $('qstatus').textContent=answers[index]?'Respuesta: '+answers[index]:'Sin responder';
 renderManual(QUESTIONS[index],$('questionVector'),index+1);
 $('prev').disabled=index===0;$('next').textContent=index===TOTAL-1?'Finalizar':'Siguiente →';
 $('grid').replaceChildren(...answers.map((a,i)=>{
  const b=document.createElement('button');b.type='button';b.textContent=i+1;b.className=(a?'answered ':'')+(i===index?'current':'');
  b.setAttribute('aria-label',`Ir al ítem ${i+1}${a?', respondido':''}`);if(i===index)b.setAttribute('aria-current','step');b.onclick=()=>show(i,true);return b;
 }));count();save();
 if(focus){$('qtitle').tabIndex=-1;$('qtitle').focus();}
}
function clock(){
 const remaining=Math.max(0,Math.ceil((endsAt-Date.now())/1000));$('clock').textContent=format(remaining);
 if(!remaining&&!finished)finish(true);
}
function enter(){
 $('welcome').hidden=true;$('results').hidden=true;$('exam').hidden=false;show(index);clearInterval(ticker);clock();if(!finished)ticker=setInterval(clock,1000);
}
function start(){
 answers=Array(TOTAL).fill(null);index=0;finished=false;timedOut=false;endsAt=Date.now()+SECONDS*1000;
 $('review').hidden=true;$('reviewBtn').textContent='Revisar respuestas';$('reviewBtn').setAttribute('aria-expanded','false');save();enter();
}
function grade(){
 const correct=answers.filter((a,i)=>isCorrect(a,i)).length,blank=answers.filter(a=>a===null).length;
 $('score').textContent=`${correct} / ${TOTAL}`;$('scorePercent').textContent=`${Math.round(100*correct/TOTAL)} % de respuestas correctas${timedOut?' · Tiempo agotado':''}`;
 $('gradeStatus').textContent='Práctica finalizada. Este puntaje no determina la clasificación oficial.';
 $('correct').textContent=correct;$('wrong').textContent=TOTAL-correct-blank;$('blank').textContent=blank;
 $('areaCharts').replaceChildren();
 for(const area of [...new Set(QUESTIONS.map(q=>q.area))]){
  const ids=QUESTIONS.map((q,i)=>q.area===area?i:-1).filter(i=>i>=0),c=ids.filter(i=>isCorrect(answers[i],i)).length,b=ids.filter(i=>answers[i]===null).length,w=ids.length-c-b;
  const card=document.createElement('article'),heading=document.createElement('h3'),pie=document.createElement('div'),rate=document.createElement('div'),legend=document.createElement('div');
  card.className='chart';heading.textContent=area;pie.className='pie';pie.style.setProperty('--c',(100*c/ids.length)+'%');pie.style.setProperty('--w',(100*(c+w)/ids.length)+'%');pie.setAttribute('role','img');pie.setAttribute('aria-label',`${area}: ${c} correctas, ${w} incorrectas, ${b} sin responder, de ${ids.length} ítems`);rate.className='rate';rate.textContent=Math.round(100*c/ids.length)+' %';legend.className='legend';legend.textContent=`Correctas ${c} · Incorrectas ${w} · Sin responder ${b}`;
  card.append(heading,pie,rate,legend);$('areaCharts').append(card);
 }renderReview();
}
function renderReview(){
 $('review').replaceChildren();
 QUESTIONS.forEach((q,i)=>{
  const row=document.createElement('article'),top=document.createElement('div'),label=document.createElement('b'),given=document.createElement('span'),key=document.createElement('span'),solution=document.createElement('div');
  row.className='review-row';top.className='review-top';label.textContent=`Ítem ${i+1}`;given.textContent='Tu respuesta: '+(answers[i]||'—');given.className=isCorrect(answers[i],i)?'ok':'bad';key.textContent='Correcta: '+ANSWER_KEY[i];key.className='ok';top.append(label,given,key);
  solution.className='review-solution';solution.innerHTML='<b>Solución:</b>';const explanation=document.createElement('div');explanation.textContent=SOLUTIONS[i];solution.append(explanation);
  const question=document.createElement('details'),summary=document.createElement('summary'),body=document.createElement('div');summary.textContent='Ver enunciado';body.innerHTML=`<p>${q.lead}</p>${q.pre||''}${q.fig?drawFigure(q.fig):''}${q.ask?`<p>${q.ask}</p>`:''}${q.options?`<ol type="A">${q.options.map(o=>`<li>${o}</li>`).join('')}</ol>`:''}`;question.append(summary,body);row.append(top,question,solution);$('review').append(row);
 });
}
function result(){clearInterval(ticker);$('welcome').hidden=true;$('exam').hidden=true;$('results').hidden=false;$('clock').textContent='00:00:00';grade();window.scrollTo(0,0);}
function finish(commit=false){
 if(finished){result();return;}
 if(!commit){
  const invalid=answers.findIndex((a,i)=>a!==null&&QUESTIONS[i].type==='number'&&canonical(a)===null);
  if(invalid>=0){show(invalid,true);$('numericResponse').reportValidity();return;}
  const missing=TOTAL-count();$('finishMessage').textContent=missing?`Tienes ${missing} ${missing===1?'pregunta sin responder':'preguntas sin responder'}. ¿Deseas finalizar?`:'Has respondido las 20 preguntas. ¿Deseas finalizar?';$('finishDialog').showModal();return;
 }
 if($('finishDialog').open)$('finishDialog').close();finished=true;timedOut=endsAt<=Date.now();save();result();
}
function reset(){
 clearInterval(ticker);answers=Array(TOTAL).fill(null);index=0;endsAt=0;finished=false;timedOut=false;try{localStorage.removeItem(STORE);}catch{}
 $('exam').hidden=true;$('results').hidden=true;$('welcome').hidden=false;$('review').hidden=true;$('clock').textContent=format(SECONDS);count();
 $('start').textContent='Iniciar práctica';$('start').onclick=start;$('resume').hidden=true;
}
$('start').onclick=start;$('resume').onclick=enter;$('prev').onclick=()=>show(index-1,true);$('next').onclick=()=>index<TOTAL-1?show(index+1,true):finish();
$('finish').onclick=()=>finish();$('cancelFinish').onclick=()=>$('finishDialog').close();$('confirmFinish').onclick=()=>finish(true);
$('reviewBtn').onclick=()=>{const open=$('review').hidden;$('review').hidden=!open;$('reviewBtn').textContent=open?'Ocultar revisión':'Revisar respuestas';$('reviewBtn').setAttribute('aria-expanded',String(open));};
$('restart').onclick=reset;$('menuBtn').onclick=()=>location.assign('../#olimpiadas');
window.addEventListener('pagehide',save);document.addEventListener('visibilitychange',()=>{if(!document.hidden&&endsAt&&!finished)clock();});
restore();count();
if(finished)result();else if(endsAt){if(endsAt<=Date.now())finish(true);else{$('start').textContent='Comenzar desde cero';$('resume').hidden=false;$('start').onclick=()=>{$('restartDialog').showModal();};}}
$('cancelRestart').onclick=()=>$('restartDialog').close();$('confirmRestart').onclick=()=>{$('restartDialog').close();$('start').onclick=start;start();};
