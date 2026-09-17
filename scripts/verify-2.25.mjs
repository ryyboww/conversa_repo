import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
let pass=0,fail=0;
function ok(condition,label){if(condition){console.log(`PASS ${label}`);pass++}else{console.error(`FAIL ${label}`);fail++}}
function text(rel){return fs.readFileSync(path.join(root,rel),'utf8')}
const required=[
'netlify/functions/project-agreements.mjs','netlify/functions/client-agreement.mjs','netlify/functions/project-change-orders.mjs','netlify/functions/client-change-order.mjs','netlify/functions/project-readiness.mjs','netlify/functions/project-activity.mjs','netlify/functions/project-registry.mjs','netlify/functions/_shared/engagement-token.mjs','netlify/functions/_shared/engagement-admin.mjs','public/operator/agreement.html','public/operator/change-order.html','public/operator/readiness.html','public/operator/activity.html','public/operator/projects.html','public/agreement/index.html','public/change-order/index.html','docs/ENGAGEMENT-CONTROLS.md','docs/LEGAL-REVIEW-CHECKLIST.md'];
ok(required.every(f=>fs.existsSync(path.join(root,f))),'required 2.25 files exist');
const agreements=text('netlify/functions/project-agreements.mjs');
const changes=text('netlify/functions/project-change-orders.mjs');
const readiness=text('netlify/functions/_shared/engagement-admin.mjs')+text('netlify/functions/project-readiness.mjs');
const clientAgreement=text('netlify/functions/client-agreement.mjs');
const clientChange=text('netlify/functions/client-change-order.mjs');
ok(agreements.includes("agreementSource==='convera'") && agreements.includes("estimate.status!=='Accepted'"),'Convera agreement requires an accepted estimate');
ok(agreements.includes("client_supplied") && agreements.includes('clientSuppliedReference'),'client-supplied agreement path is supported');
ok(agreements.includes("status:'Signed'")===false && agreements.includes("next.status=next.clientSignedAt&&next.converaSignedAt?'Signed':'Partially Signed'"),'signed status requires both recorded signatures');
ok(clientAgreement.includes("ready_to_sign") && clientAgreement.includes("Awaiting Signature"),'client agreement response is readiness-to-sign, not signature');
ok(changes.includes('latestSignedAgreement') && changes.includes("if(!agreement)"),'Change Order requires signed agreement');
ok(clientChange.includes('ready_to_sign') && !clientChange.includes("status='Signed'"),'client Change Order review does not create signature');
ok(readiness.includes("if (!agreement) blockers.push('Signed Project Agreement required.')"),'readiness requires signed agreement');
ok(readiness.includes('conflictReview') && readiness.includes('dataSensitivityReview') && readiness.includes('depositStatus') && readiness.includes('clientPrerequisiteStatus'),'readiness includes all four non-contract gates');
ok(text('netlify/functions/project-readiness.mjs').includes("nextAction:'Schedule project start / kickoff.'") && !text('netlify/functions/project-readiness.mjs').includes("status:'Active'"),'readiness does not automatically activate project');
ok(text('public/operator/projects.html').includes('/operator/agreement.html') && text('public/operator/projects.html').includes('/operator/readiness.html') && text('public/operator/projects.html').includes('/operator/activity.html'),'Project Registry exposes agreement/readiness/activity controls');
ok(text('docs/LEGAL-REVIEW-CHECKLIST.md').includes('Before production use'),'legal review checklist is included');
ok(![agreements,changes,readiness].join('\n').includes('hubspot') && ![agreements,changes,readiness].join('\n').includes('DEAL'),'professional agreement workflow does not create HubSpot Deals');
const mod=await import(pathToFileURL(path.join(root,'netlify/functions/_shared/engagement-token.mjs')));
const secret='0123456789abcdef0123456789abcdefEXTRA';
const expiresAt=new Date(Date.now()+3600000);
const token=mod.createEngagementToken({secret,kind:'agreement',recordId:'AGR-4F9A21BC-01',projectNumber:'CVR-2026-4F9A21BC',recipientEmail:'client@example.com',expiresAt});
ok(mod.verifyEngagementToken(token,secret,'agreement').ok,'engagement token verifies');
ok(!mod.verifyEngagementToken(token+'x',secret,'agreement').ok,'tampered engagement token is rejected');
ok(!mod.verifyEngagementToken(token,secret,'change_order').ok,'token kind binding is enforced');
const expired=mod.createEngagementToken({secret,kind:'agreement',recordId:'AGR-4F9A21BC-01',projectNumber:'CVR-2026-4F9A21BC',recipientEmail:'client@example.com',expiresAt:new Date(Date.now()-1000)});
ok(mod.verifyEngagementToken(expired,secret,'agreement').reason==='expired','expired engagement token is rejected');
console.log(`\nVerification: ${pass} passed, ${fail} failed.`);if(fail)process.exit(1);
