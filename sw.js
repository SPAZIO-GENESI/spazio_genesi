const CACHE_NAME = 'static-cache-marzo-v12';
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

  // Non gestire API o richieste non GET
  if (
    req.method !== 'GET' ||
    req.url.includes('/api/') ||
    req.url.includes('/matomo.php')
  ) {
    return;
  }

  // 1️⃣ NETWORK-FIRST per HTML (fondamentale!)
  if (req.destination === 'document') {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          // aggiorna la cache
          const copy = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return networkRes;
        })
        .catch(() => caches.match(req).then((res) => res || caches.match('/')))
    );
    return;
  }

  // 2️⃣ CACHE-FIRST per tutto il resto
  event.respondWith(
    caches.match(req).then((cachedRes) => {
      if (cachedRes) return cachedRes;

      return fetch(req)
        .then((networkRes) => {
          if (
            !networkRes ||
            networkRes.status !== 200 ||
            networkRes.type !== 'basic'
          ) {
            return networkRes;
          }

          const copy = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));

          return networkRes;
        })
        .catch(() => {
          if (req.destination === 'image') {
            return new Response('', { status: 404 });
          }
          return new Response('Offline', { status: 503 });
        });
    })
  );
});
