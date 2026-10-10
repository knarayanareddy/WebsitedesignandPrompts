import http from 'node:http';
import { stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root=resolve(import.meta.dirname,'..',process.env.SERVE_DIST==='1'?'dist':'site');
const port=Number(process.env.PORT||4174);
const mount='/WebsitedesignandPrompts/designbyxam/';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.json':'application/json; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2','.woff':'font/woff','.mp4':'video/mp4','.ico':'image/x-icon'};
const server=http.createServer(async(req,res)=>{
 try{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
  let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(pathname==='/'){res.writeHead(302,{Location:mount+'#about'});res.end();return;}
  if(!pathname.startsWith(mount)){res.writeHead(404);res.end('Not found');return;}
  pathname='/'+pathname.slice(mount.length);if(pathname==='/')pathname='/index.html';
  const file=resolve(root,'.'+pathname),relative=file.slice(root.length+1);
  if(!file.startsWith(root+sep)||relative.split(sep).some(p=>p.startsWith('.'))){res.writeHead(403);res.end('Forbidden');return;}
  const info=await stat(file);if(!info.isFile())throw new Error('Not a file');
  const headers={'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes'};
  let start=0,end=info.size-1,status=200;
  if(req.headers.range){
   const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
   if(!match||(!match[1]&&!match[2])){res.writeHead(416,{'Content-Range':`bytes */${info.size}`});res.end();return;}
   if(!match[1])start=Math.max(0,info.size-Number(match[2]));
   else {start=Number(match[1]);if(match[2])end=Math.min(end,Number(match[2]));}
   if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>end||start>=info.size){res.writeHead(416,{'Content-Range':`bytes */${info.size}`});res.end();return;}
   status=206;headers['Content-Range']=`bytes ${start}-${end}/${info.size}`;
  }
  headers['Content-Length']=info.size===0?0:end-start+1;res.writeHead(status,headers);
  if(req.method==='HEAD'||info.size===0){res.end();return;}
  createReadStream(file,{start,end}).on('error',()=>res.destroy()).pipe(res);
 }catch(error){if(!res.headersSent){res.writeHead(error instanceof URIError?400:404);res.end('Not found');}else res.destroy();}
});
server.listen(port,'127.0.0.1',()=>console.log(`Pages rendition ready at http://127.0.0.1:${port}${mount}#about (${root})`));
