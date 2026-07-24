/* Harmonia — service worker
   Manté l'app disponible sense connexió i permet que Chrome l'ofereixi com a app.
   Estratègia: cache-first amb actualització en segon pla (stale-while-revalidate).
   No hi ha llista fixa de fitxers per precarregar: així no falla mai la instal·lació
   encara que canviïn els noms dels fitxers.                                        */

const CACHE = "harmonia-v1";

self.addEventListener("install", () => {
  self.skipWaiting();                    // activa la versió nova de seguida
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return;   // només el que és nostre

  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.status === 200 && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit || caches.match("./") || Response.error());
      return hit || net;                 // si ja el tenim, resposta immediata
    })
  );
});
