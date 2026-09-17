import { getStore } from '@netlify/blobs';
import { verifyEngagementToken } from './_shared/engagement-token.mjs';
import { INVOICE_STORE, json, publicInvoice, refreshInvoiceStatus } from './_shared/billing-admin.mjs';
export default async function handler(req){
  if(req.method!=='GET')return json({error:'Method not allowed.'},405,{Allow:'GET'}); const token=new URL(req.url).searchParams.get('token')||''; const check=verifyEngagementToken(token,process.env.CONVERA_ENGAGEMENT_TOKEN_SECRET||'','invoice'); if(!check.ok)return json({error:check.reason==='expired'?'Invoice link expired.':'Invalid invoice link.'},check.reason==='expired'?410:403); const p=check.payload.projectNumber,id=check.payload.recordId,store=getStore(INVOICE_STORE),key=`invoices/${p}/${id}`; let inv=await store.get(key,{type:'json'}); if(!inv||inv.clientEmail!==check.payload.recipientEmail)return json({error:'Invoice not found.'},404); if(inv.status==='Sent'){inv={...inv,status:'Viewed',viewedAt:inv.viewedAt||new Date().toISOString(),updatedAt:new Date().toISOString()};await store.setJSON(key,inv)} inv=await refreshInvoiceStatus(p,id); return json({ok:true,invoice:publicInvoice(inv)});
}
