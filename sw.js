const CACHE_NAME = 'static-cache-febbraio-v5'; // Aggiungi un numero di versione
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/cover.css',
  '/img/SPAZIO_GENESI_Tessere.jpg',
];

self.addEventListener('install', (event) => {
  // Salta la fase di waiting per attivare immediatamente la nuova versione
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', (event) => {
  // Elimina vecchie cache quando la nuova versione è attivata
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Prendi il controllo immediatamente
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Ignora richieste non GET e richieste a /api o simili
  if (
    event.request.method !== 'GET' ||
    event.request.url.includes('/api/') ||
    event.request.url.includes('/matomo.php')
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Altrimenti fai la richiesta alla rete
        return fetch(event.request).then((networkResponse) => {
          // Controlla se abbiamo ricevuto una risposta valida
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          // Clona la risposta per salvarla in cache e restituirla
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return networkResponse;
        }).catch(() => {
          // Fallback offline
          if (event.request.destination === 'document') {
            return caches.match('/');
          }
          return new Response('Offline content', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});