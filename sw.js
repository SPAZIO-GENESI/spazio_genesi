const CACHE_NAME = 'static-cache-marzo-v14';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/cover.css',
  '/img/SPAZIO_GENESI_Tessere.jpg',
];

// INSTALL
self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  return self.clients.claim();
});

// FETCH
self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (
    req.method !== 'GET' ||
    req.url.includes('/api/') ||
    req.url.includes('/matomo.php')
  ) {
    return;
  }

  // ✅ HTML: solo rete (risolve definitivamente cache vecchia)
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req));
    return;
  }

  // ✅ ASSET: cache-first
  event.respondWith(
    caches.match(req).then((cachedRes) => {
      if (cachedRes) return cachedRes;

      return fetch(req).then((networkRes) => {
        if (!networkRes || networkRes.status !== 200) {
          return networkRes;
        }

        const copy = networkRes.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));

        return networkRes;
      });
    })
  );
});