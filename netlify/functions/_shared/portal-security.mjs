import { getStore } from '@netlify/blobs';
import { createHmac, randomInt, timingSafeEqual } from 'node:crypto';

export const PORTAL_SECURITY_STORE='convera-portal-security';

function numberEnv(name, fallback, min, max){
  const n=Number(process.env[name]||fallback);
  return Math.min(max,Math.max(min,Number.isFinite(n)?n:fallback));
}
export function otpTtlMs(){return numberEnv('CONVERA_PORTAL_OTP_TTL_MINUTES',10,3,30)*60*1000}
export function otpCooldownMs(){return numberEnv('CONVERA_PORTAL_OTP_COOLDOWN_SECONDS',60,30,600)*1000}
export function sessionTtlMs(){return numberEnv('CONVERA_PORTAL_SESSION_HOURS',8,1,24)*60*60*1000}
export function maxAttempts(){return numberEnv('CONVERA_PORTAL_MAX_ATTEMPTS',5,3,10)}
export function otpSecret(){return process.env.CONVERA_PORTAL_OTP_SECRET||process.env.CONVERA_ENGAGEMENT_TOKEN_SECRET||''}
export function securityKey(projectNumber,portalId){return `portal-auth/${String(projectNumber).toUpperCase()}/${String(portalId).toUpperCase()}`}
export function maskEmail(email){const [local='',domain='']=String(email||'').split('@');if(!domain)return'';const shown=local.length<=2?local.slice(0,1):local.slice(0,2);return `${shown}${'*'.repeat(Math.max(2,Math.min(8,local.length-shown.length)))}@${domain}`}
export function generateCode(){return String(randomInt(0,1000000)).padStart(6,'0')}
export function codeHash(portalId,code){const secret=otpSecret();if(secret.length<32)throw new Error('Portal OTP secret must be at least 32 characters.');return createHmac('sha256',secret).update(`${String(portalId).toUpperCase()}:${String(code)}`).digest('hex')}
export function safeEqual(a,b){const x=Buffer.from(String(a||'')),y=Buffer.from(String(b||''));return x.length===y.length&&timingSafeEqual(x,y)}
export async function getPortalSecurity(projectNumber,portalId){return getStore(PORTAL_SECURITY_STORE).get(securityKey(projectNumber,portalId),{type:'json'})}
export async function prepareCode(projectNumber,portalId){
  const store=getStore(PORTAL_SECURITY_STORE),key=securityKey(projectNumber,portalId),now=Date.now(),cur=(await store.get(key,{type:'json'}))||{};
  if(cur.lockUntil&&Date.parse(cur.lockUntil)>now)return{ok:false,reason:'locked',retryAt:cur.lockUntil};
  if(cur.lastSentAt&&now-Date.parse(cur.lastSentAt)<otpCooldownMs())return{ok:false,reason:'cooldown',retryAt:new Date(Date.parse(cur.lastSentAt)+otpCooldownMs()).toISOString()};
  const code=generateCode(),record={...cur,projectNumber:String(projectNumber).toUpperCase(),portalId:String(portalId).toUpperCase(),codeHash:codeHash(portalId,code),codeExpiresAt:new Date(now+otpTtlMs()).toISOString(),attempts:0,lastSentAt:new Date(now).toISOString(),lockUntil:null,verifiedAt:cur.verifiedAt||null,updatedAt:new Date(now).toISOString()};
  await store.setJSON(key,record);
  return{ok:true,code,expiresAt:record.codeExpiresAt};
}
export async function verifyCode(projectNumber,portalId,code){
  const store=getStore(PORTAL_SECURITY_STORE),key=securityKey(projectNumber,portalId),now=Date.now(),cur=await store.get(key,{type:'json'});
  if(!cur||!cur.codeHash)return{ok:false,reason:'code_required'};
  if(cur.lockUntil&&Date.parse(cur.lockUntil)>now)return{ok:false,reason:'locked',retryAt:cur.lockUntil};
  if(!cur.codeExpiresAt||Date.parse(cur.codeExpiresAt)<=now)return{ok:false,reason:'expired'};
  const match=safeEqual(cur.codeHash,codeHash(portalId,String(code||'').trim()));
  if(!match){const attempts=Number(cur.attempts||0)+1,limit=maxAttempts(),locked=attempts>=limit,lockUntil=locked?new Date(now+15*60*1000).toISOString():null;await store.setJSON(key,{...cur,attempts,lockUntil,updatedAt:new Date(now).toISOString()});return{ok:false,reason:locked?'locked':'invalid',attemptsRemaining:Math.max(0,limit-attempts),retryAt:lockUntil}}
  const verifiedAt=new Date(now).toISOString();await store.setJSON(key,{...cur,codeHash:null,codeExpiresAt:null,attempts:0,lockUntil:null,verifiedAt,updatedAt:verifiedAt});return{ok:true,verifiedAt};
}
