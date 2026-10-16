/* Consultas tolerantes a conexiones lentas. Los reintentos conservan los datos y el ID de inicio. */
(function(root){
 'use strict';
 const WAIT_MS=40000,MAX_TRIES=2,RETRY_DELAY_MS=1500;
 function once(api,params,onSlow){
  return new Promise((resolve,reject)=>{
   const callback='examStatus_'+Math.random().toString(36).slice(2),script=document.createElement('script'),url=new URL(api);
   let deadline,slow,settled=false;
   const cleanup=failed=>{
    clearTimeout(deadline);clearTimeout(slow);script.remove();
    if(failed){root[callback]=()=>{};setTimeout(()=>{delete root[callback]},WAIT_MS);}else delete root[callback];
   };
   const fail=()=>{if(settled)return;settled=true;cleanup(true);const error=Error('No se pudo comunicar con el servidor. Pulsa «Volver a consultar» para reintentar.');error.retryable=true;reject(error)};
   root[callback]=data=>{if(settled)return;settled=true;cleanup(false);resolve(data)};
   script.onerror=fail;
   slow=setTimeout(()=>onSlow?.(),8000);
   deadline=setTimeout(fail,WAIT_MS);
   Object.entries({...params,callback,_:Date.now()}).forEach(([key,value])=>url.searchParams.set(key,value));
   script.src=url;document.head.append(script);
  });
 }
 async function request(api,params,{onProgress}={}){
  for(let attempt=1;attempt<=MAX_TRIES;attempt++){
   if(attempt>1)onProgress?.('Conexión lenta. Estamos reintentando la consulta (2 de 2)…');
   try{return await once(api,params,()=>onProgress?.('El servidor está tardando. Seguimos esperando; no recargues la página…'));}
   catch(error){if(!error.retryable||attempt===MAX_TRIES)throw error;await new Promise(resolve=>setTimeout(resolve,RETRY_DELAY_MS));}
  }
 }
 root.ExamConnection=Object.freeze({request,waitMs:WAIT_MS,maxTries:MAX_TRIES});
})(window);
