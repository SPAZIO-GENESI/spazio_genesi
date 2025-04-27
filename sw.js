const CACHE_NAME = 'static-cache-v3.webp';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/cover.css',
  '/img/spazio_genesi_cio_che_conosco.webp',
  '/img/gdc20.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE.map(url => new Request(url, {
          headers: { 'Cache-Control': 'max-age=604800, immutable' } // 1 settimana in secondi
        })));
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Strategia Cache-First con aggiornamento in background
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // Aggiorna la cache se la risposta è valida
          if (networkResponse.ok) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
          }
          return networkResponse.clone();
        });
        return response || fetchPromise;
      })
  );
});