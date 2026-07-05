const CACHE_NAME = 'guess-who-coop-v2';
const ASSETS = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'assets/icon192.png',
  'assets/icon512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});