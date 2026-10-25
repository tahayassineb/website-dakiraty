/** The backend receipt is authoritative for Lead identity, pixel and program data. */
export type Program = 'dakiraty' | 'quran' | 'kids_memory';
export type PendingConversion = { key:string; eventId:string; eventTime:number };
type Receipt = { intakeId:string; eventId:string; eventName:'Lead'; pixelId:string; receiptToken:string; customData:Record<string,unknown>; routingVersion?:string; browserAllowed?:boolean };
type TrackingConfig = { clientVersion:2; version:string; pixelIds:Record<Program,string>; effectiveFrom:number; browserEnabled:boolean };
type Ref = { current:PendingConversion|null };
const initialized = new Set<string>();
const queued = new Set<string>();
let lastPageView = '';

function leadIntakeUrl() {
  return import.meta.env.VITE_LEAD_INTAKE_URL?.trim().replace(/\/$/,'') || 'https://adjoining-bee-105.eu-west-1.convex.site/intake/website';
}

async function trackingConfig():Promise<TrackingConfig|null> {
  try {
    const response=await fetch(leadIntakeUrl()+'/tracking-config',{cache:'no-store',signal:AbortSignal.timeout(8000)});
    if(!response.ok) return null;
    const config=await response.json();
    if(config.clientVersion!==2 || typeof config.version!=='string' || typeof config.browserEnabled!=='boolean'
      || !Number.isSafeInteger(config.effectiveFrom)
      || !(['dakiraty','quran','kids_memory'] as const).every(p=>typeof config.pixelIds?.[p]==='string' && /^\d{5,30}$/.test(config.pixelIds[p]))) return null;
    return config;
  } catch { return null; }
}

export function browserIdentifiers(cookie:string, url:string, now=Date.now()) {
  const read=(name:string)=>cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith(name+'='))?.slice(name.length+1);
  const fbp=read('_fbp'), storedFbc=read('_fbc');
  const validFbp=fbp && /^fb\.\d+\.\d+\.\d+$/.test(fbp)?fbp:undefined;
  const validFbc=storedFbc && /^fb\.\d+\.\d+\.[A-Za-z0-9_-]+$/.test(storedFbc)?storedFbc:undefined;
  let fbclid:string|null=null;
  try { fbclid=new URL(url).searchParams.get('fbclid'); } catch { /* No click identifier. */ }
  // A cookie is valid for later visits too. A new actual click takes precedence over an older cookie.
  const fbc=fbclid && /^[A-Za-z0-9_-]+$/.test(fbclid)
    ? (validFbc?.endsWith('.'+fbclid)?validFbc:`fb.1.${now}.${fbclid}`) : validFbc;
  return {fbp:validFbp,fbc};
}

function pixel(pixelId:string) {
  const w=window as any;
  if (!w.fbq) {
    const fn:any=function(...args:unknown[]){fn.callMethod?fn.callMethod(...args):fn.queue.push(args);};
    fn.queue=[];fn.push=fn;fn.loaded=true;fn.version='2.0';w.fbq=fn;w._fbq=fn;
    const script=document.createElement('script');script.async=true;script.src='https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }
  if (!initialized.has(pixelId)) {
    w.fbq('set','autoConfig',false,pixelId);
    w.fbq('init',pixelId);initialized.add(pixelId);
  }
  return w.fbq;
}

export async function trackProgramPageView(program:Program|'website') {
  if (typeof window==='undefined') return;
  const key=program+':'+window.location.href;
  if (lastPageView===key) return;
  const config=await trackingConfig();
  if(!config?.browserEnabled || lastPageView===key) return;
  lastPageView=key;
  // The application sends PageView through Pixel. A remotely configured Meta gateway
  // may mirror it; an explicit ID lets that integration retain this event's identity.
  const pixelId=config.pixelIds[program==='website'?'quran':program];
  try { pixel(pixelId)('trackSingle',pixelId,'PageView',program==='website'?{}:{program},{eventID:'pageview_'+crypto.randomUUID()}); }
  catch { /* Tracking cannot break page navigation. */ }
}

export function conversionFor(program:Program, payload:Record<string,unknown>, ref:Ref):PendingConversion {
  const key=JSON.stringify({program,payload});
  if (!ref.current || ref.current.key!==key) ref.current={key,eventId:'lead_'+crypto.randomUUID(),eventTime:Math.floor(Date.now()/1000)};
  return ref.current;
}

export async function submitWebsiteLead(program:Program, payload:Record<string,unknown>, ref:Ref) {
  const conversion=conversionFor(program,payload,ref);
  const intakeUrl=leadIntakeUrl();
  const ids=browserIdentifiers(document.cookie,window.location.href);
  let config=await trackingConfig();
  const send=()=>fetch(intakeUrl,{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
      ...payload,program,form:program+'_landing',event_name:'Lead',event_id:conversion.eventId,
      event_time:conversion.eventTime,event_source_url:window.location.href,user_agent:navigator.userAgent,...ids,
      tracking_client_version:2,tracking_route_version:config?.version??'unavailable',
    }),
  });
  let response=await send();
  if(response.status===409) {
    // Config may switch between the preflight and transactional save. Retry once
    // with the same conversion identity; the rejected attempt persisted nothing.
    config=await trackingConfig();
    if(config) response=await send();
  }
  if (!response.ok) throw new Error('CRM_INTAKE_REJECTED');
  const result=await response.json();
  if(!result.ok || !result.leadId) throw new Error('CRM_INTAKE_REJECTED');
  const receipt:Receipt=result.tracking;
  let browserStatus:'queued'|'unavailable'|'error'='unavailable';
  const validReceipt=!!receipt?.intakeId && !!receipt.receiptToken && receipt.eventName==='Lead' && receipt.eventId===conversion.eventId;
  const allowed=validReceipt && config?.browserEnabled && receipt.browserAllowed!==false
    && receipt.pixelId===config.pixelIds[program] && (!receipt.routingVersion || receipt.routingVersion===config.version);
  try {
    const key=receipt.pixelId+':'+receipt.eventId;
    if (allowed && !queued.has(key)) {
      // trackSingle has the pixel argument before the event; options are fifth.
      pixel(receipt.pixelId)('trackSingle',receipt.pixelId,'Lead',receipt.customData,{eventID:receipt.eventId});
      queued.add(key);
    }
    if(allowed) browserStatus='queued';
  } catch { browserStatus='error'; }
  // Tracking telemetry must never turn a saved CRM lead into an error screen.
  if(validReceipt) void fetch(intakeUrl+'/tracking',{
    method:'POST',headers:{'Content-Type':'application/json'},keepalive:true,
    body:JSON.stringify({intakeId:receipt.intakeId,receiptToken:receipt.receiptToken,eventId:receipt.eventId,pixelId:receipt.pixelId,status:browserStatus}),
  }).catch(()=>undefined);
  ref.current=null;
  return result;
}
