const CACHE_NAME = 'static-cache-maggio';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/cover.css',
  '/img/SPAZIOGENESI_LA_COMUNE_ESIGENZA_28MAGGIO.jpg',
  '/img/gdc20.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE.map(url => new Request(url, {
          headers: {
            'Cache-Control': 'max-age=3600, immutable, no-cache, must-revalidate' // Combinate in un'unica stringa
          }
        })));
      })
  );
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
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // Aggiorna solo se la risposta è valida e la richiesta è GET
          if (networkResponse.ok) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        }).catch(() => {
          // Fallback offline (opzionale)
          if (event.request.destination === 'document') {
            return caches.match('/'); // Pagina offline
          }
        });

        return response || fetchPromise;
      })
  );
});