import assert from 'node:assert/strict';

const env=new Map([
  ['NETLIFY_EMAILS_SECRET','test-email-secret'],
  ['CONVERA_FORM_FROM_EMAIL','Convera Strategies <test@converastrategies.com>'],
  ['CONVERA_PUBLIC_FORM_NOTIFICATION_EMAIL','hello@converastrategies.com'],
  ['CONVERA_INTAKE_NOTIFICATION_EMAIL','ryan@converastrategies.com'],
  ['CONVERA_OPERATOR_KEY','operator-test-key'],
  ['URL','https://converastrategies.com']
]);
globalThis.Netlify={env:{get:key=>env.get(key)}};
const requests=[];
globalThis.fetch=async (url,options)=>{requests.push({url,options,body:JSON.parse(options.body)});return new Response('',{status:200})};

const contact=(await import('../netlify/functions/contact-form-notification.mjs')).default;
const follow=(await import('../netlify/functions/follow-form-notification.mjs')).default;
const intake=(await import('../netlify/functions/intake-form-notification.mjs')).default;
for(const handler of [contact,follow,intake]) assert.equal(typeof handler.formSubmitted,'function');

await contact.formSubmitted({data:{name:'Contact',email:'contact@example.com',reason:'professional-work',subject:'Inquiry',message:'Test'}});
await follow.formSubmitted({data:{first_name:'Follower',email:'follow@example.com',interests:['essays'],consent:'yes'}});
await intake.formSubmitted({data:{name:'Client',email:'client@example.com',engagement:'strategy',challenge:'Test','desired-outcome':'Clarity'}});
assert.equal(requests.length,3,'three recognized forms must route to three distinct templates');
assert.deepEqual(requests.map(r=>r.url),[
  'https://converastrategies.com/.netlify/functions/emails/contact-notification',
  'https://converastrategies.com/.netlify/functions/emails/follow-notification',
  'https://converastrategies.com/.netlify/functions/emails/intake-notification'
]);
assert.deepEqual(requests.map(r=>r.body.to),[
  'hello@converastrategies.com',
  'hello@converastrategies.com',
  'ryan@converastrategies.com'
], 'private Intake must use a distinct operator mailbox');
env.delete('CONVERA_INTAKE_NOTIFICATION_EMAIL');
await intake.formSubmitted({data:{name:'Client',email:'client@example.com',engagement:'strategy',challenge:'Test','desired-outcome':'Clarity'}});
assert.equal(requests.length,3,'private Intake must not fall back to the public recipient');
env.set('CONVERA_INTAKE_NOTIFICATION_EMAIL','ryan@converastrategies.com');
await contact.formSubmitted({data:{email:'unknown@example.com'}});
assert.equal(requests.length,3,'unrecognized form shape must be ignored');

const invite=(await import('../netlify/functions/intake-invitation.mjs')).default;
let response=await invite(new Request('https://example.test/.netlify/functions/intake-invitation',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({recipientEmail:'invitee@example.com'})}));
assert.equal(response.status,401,'missing operator key must be rejected');
response=await invite(new Request('https://example.test/.netlify/functions/intake-invitation',{method:'POST',headers:{'Content-Type':'application/json','x-convera-operator-key':'operator-test-key'},body:JSON.stringify({recipientEmail:'invitee@example.com',recipientName:'Invitee'})}));
assert.equal(response.status,200,'authorized invitation must succeed');
assert.equal(requests.length,4,'authorized invitation must send one email');
assert.equal(requests[3].url,'https://converastrategies.com/.netlify/functions/emails/intake-invitation');
assert.match(requests[3].body.parameters.intakeUrl,/\/intake\/$/);
env.set('CONVERA_FORM_NOTIFICATION_EMAIL','legacy@converastrategies.com');
env.delete('CONVERA_PUBLIC_FORM_NOTIFICATION_EMAIL');
await contact.formSubmitted({data:{name:'Contact',email:'contact@example.com',reason:'professional-work',subject:'Inquiry',message:'Test'}});
assert.equal(requests[4].body.to,'legacy@converastrategies.com','public forms retain the legacy recipient fallback');
env.delete('CONVERA_INTAKE_NOTIFICATION_EMAIL');
await intake.formSubmitted({data:{name:'Client',email:'client@example.com',engagement:'strategy',challenge:'Test','desired-outcome':'Clarity'}});
assert.equal(requests.length,5,'private Intake must not fall back to the legacy public recipient');

console.log('PASS Contact, Follow, and Intake events route to distinct branded templates');
console.log('PASS public and private notifications use separate mailboxes');
console.log('PASS legacy public routing cannot receive private Intake');
console.log('PASS unrecognized form shape is ignored');
console.log('PASS unauthorized Intake invitation is rejected');
console.log('PASS authorized Intake invitation uses the private Intake template');
