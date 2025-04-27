const CACHE_NAME = 'static-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/cover.css',
  //'/script.js',
  '/img/spazio_genesi_cio_che_conosco.jpeg',
  '/img/gdc20.png'
  // Aggiungi tutte le risorse che vuoi memorizzare
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});