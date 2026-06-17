// MIQAT service worker — offline-first shell + library cache.
const CACHE = 'miqat-v1';
const SHELL = ['/', '/qibla', '/library', '/privacy', '/manifest.webmanifest'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  // network-first for navigation, cache-first for everything else (offline prayer times)
  if (request.mode === 'navigate') {
    e.respondWith(fetch(request).catch(() => caches.match('/')));
  } else {
    e.respondWith(caches.match(request).then((hit) => hit || fetch(request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(request, copy));
      return res;
    }).catch(() => hit)));
  }
});
