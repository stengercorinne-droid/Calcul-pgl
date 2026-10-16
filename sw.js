const CACHE = 'pgl-v26'
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
  './favicon-16.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  let url;
  try { url = new URL(e.request.url); } catch { return; }
  if (url.origin !== location.origin) return;

  const accept = e.request.headers.get('accept') || '';
  const isHTML = accept.includes('text/html') || url.pathname === '/' || url.pathname.endsWith('.html');
  const isCode = /\.(js|css)$/.test(url.pathname);
  const isImage = /\.(png|jpg|jpeg|svg|gif|webp|ico)$/.test(url.pathname);

  // HTML / JS / CSS → NETWORK FIRST (toujours la dernière version)
  if (isHTML || isCode) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone)).catch(() => {});
          }
          return res;
        })
        .catch(() =>
          caches.match(e.request).then(cached =>
            cached || new Response('', { status: 503, statusText: 'Offline' })
          )
        )
    );
    return;
  }

  // Images → CACHE FIRST (changent rarement)
  if (isImage) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request)
          .then(res => {
            if (res && res.status === 200) {
              const clone = res.clone();
              caches.open(CACHE).then(c => c.put(e.request, clone)).catch(() => {});
            }
            return res;
          })
          .catch(() => new Response('', { status: 503, statusText: 'Offline' }));
      })
    );
    return;
  }

  // Reste : network puis cache
  e.respondWith(
    fetch(e.request)
      .then(res => res)
      .catch(() => caches.match(e.request).then(c => c || new Response('', { status: 503 })))
  );
});