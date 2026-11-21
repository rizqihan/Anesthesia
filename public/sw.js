// Anesthesia Clinical Suite - Offline PWA Service Worker
const CACHE_VERSION = 'v2.7.4';
const CACHE_NAME = `anesthesia-cache-${CACHE_VERSION}`;
const STATIC_CACHE = `anesthesia-static-${CACHE_VERSION}`;

const PRECACHE_ASSETS = [
  '/',
  '/dashboard',
  '/emergency',
  '/antimicrobial',
  '/calculators',
  '/dosage',
  '/ecg',
  '/ecg/simulator',
  '/pocus',
  '/formulary',
  '/guidelines',
  '/physical-exam',
  '/interactions',
  '/symptoms',
  '/tutorial',
  '/settings',
  '/manifest.json',
  '/favicon.png',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/data/icd10-full.json',
];

// Install Event: Pre-cache App Shell and essential static data
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Use individual puts so a single route failure does not abort the entire precache
      await Promise.allSettled(
        PRECACHE_ASSETS.map(async (url) => {
          try {
            const response = await fetch(url, { cache: 'no-cache' });
            if (response.ok) {
              await cache.put(url, response);
            }
          } catch (err) {
            console.warn(`[SW] Precache failed for ${url}:`, err);
          }
        })
      );
    })
  );
  self.skipWaiting();
});

// Activate Event: Clean up stale caches and claim all clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== STATIC_CACHE) {
            console.log('[SW] Purging old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Intelligent offline caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // 1. API Calls (/api/*): Network-only with JSON offline fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({
            error: {
              message: 'Offline mode: Network connection is unavailable.',
              code: 'OFFLINE',
            },
          }),
          {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'application/json' },
          }
        );
      })
    );
    return;
  }

  // 2. Navigation requests (HTML pages): Network-First with Cache/AppShell fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          // Device is offline: match requested route from cache
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }

          // Fallback to exact pathname in cache
          const pathnameMatch = await caches.match(url.pathname);
          if (pathnameMatch) {
            return pathnameMatch;
          }

          // Fallback to cached dashboard or root app shell for client-side routing
          const dashboardMatch = await caches.match('/dashboard');
          if (dashboardMatch) {
            return dashboardMatch;
          }

          const rootMatch = await caches.match('/');
          if (rootMatch) {
            return rootMatch;
          }

          return new Response(
            '<html><body><h1>Offline</h1><p>Application shell is caching. Please refresh.</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // 3. Next.js Static Assets (/_next/static/*): Cache-First
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(request).then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // 4. React Server Component payloads (_rsc query or headers): Network-First with Cache fallback
  if (url.searchParams.has('_rsc') || request.headers.get('RSC') === '1') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          // Try without query string
          return (await caches.match(url.pathname)) || Response.error();
        })
    );
    return;
  }

  // 5. Static public data, images, icons (/data/*, /images/*, /favicon.*): Stale-While-Revalidate
  if (
    url.pathname.startsWith('/data/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.json')
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cached);

        return cached || fetchPromise;
      })
    );
    return;
  }

  // Default: Network with Cache Fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Message Event: Allow web clients to trigger skipWaiting or cache purges
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data === 'CLEAR_CACHE') {
    caches.keys().then((keys) => {
      return Promise.all(keys.map((k) => caches.delete(k)));
    });
  }
});
