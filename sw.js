const CACHE_NAME = 'nutrient-dashboard-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/calculator.html',
  '/symptoms.html',
  '/medications.html',
  '/tracker.html',
  '/shopping.html',
  '/bloodwork.html',
  '/protocol.html',
  '/subtraction_supplement_guide.html'
];

// Install - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) {
          // Return cached version, but also fetch updated version
          fetch(event.request).then(response => {
            if (response && response.status === 200) {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, response);
              });
            }
          }).catch(() => {});
          return cached;
        }
        return fetch(event.request).then(response => {
          if (response && response.status === 200 && response.type === 'basic') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        });
      })
  );
});
