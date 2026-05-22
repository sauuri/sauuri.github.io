const CACHE = 'sauuri-v1';
const URLS = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  'https://sauuri.github.io/mbti-real/',
  'https://sauuri.github.io/crush-or-not/',
  'https://sauuri.github.io/should-i-do-it/',
  'https://sauuri.github.io/regret-or-not/',
  'https://sauuri.github.io/how-old-today/',
  'https://sauuri.github.io/shower-or-not/',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
