const CACHE="pfmp-jdp-v2";
self.addEventListener("install",e=>{self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET") return;
  if(u.pathname.endsWith("/data/entreprises.csv")){
    e.respondWith(fetch(e.request,{cache:"no-store"}).catch(()=>caches.match(e.request)));
    return;
  }
  if(u.origin===location.origin){
    e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));}return r}).catch(()=>caches.match(e.request)));
  }
});