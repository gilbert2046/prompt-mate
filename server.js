import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url)),port=process.env.PORT||4173,types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
http.createServer((req,res)=>{const pathname=req.url==='/'?'index.html':decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/,''),file=path.join(root,pathname);if(!file.startsWith(root)){res.writeHead(403);return res.end('Forbidden')}fs.readFile(file,(err,body)=>{if(err){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(body)})}).listen(port,()=>console.log(`Prompt Assistant: http://localhost:${port}`));
