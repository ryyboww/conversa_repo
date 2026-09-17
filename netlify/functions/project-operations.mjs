import { authorizeOperator, json } from './_shared/project-admin.mjs';
import { operationsSnapshot } from './_shared/operations-intelligence.mjs';
export default async function handler(req){if(!authorizeOperator(req))return json({error:'Unauthorized.'},401);if(req.method!=='GET')return json({error:'Method not allowed.'},405,{Allow:'GET'});return json({ok:true,...await operationsSnapshot()})}
