// Chroma Studio Progressive Web App Service Worker
// Version: v1.2.0-pwa
const CACHE_VERSION = 'v1.2.0-pwa';
const STATIC_CACHE_NAME = `chroma-static-${CACHE_VERSION}`;
const RUNTIME_CACHE_NAME = `chroma-runtime-${CACHE_VERSION}`;

// Pre-cached core application shell and branding assets
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/favicon.svg',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-512.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/maskable-icon-512x512.png',
  '/manifest.webmanifest',
  '/hazim-bashir-dev.png',
  '/og-image.png',
  '/robots.txt',
  '/sitemap.xml',
];

// Install: Cache critical static app shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        // Pre-cache core files; use individual catches so one failed asset doesn't break everything
        return Promise.allSettled(
          PRECACHE_ASSETS.map((asset) =>
            fetch(asset, { cache: 'no-cache' })
              .then((response) => {
                if (response.ok) {
                  return cache.put(asset, response);
                }
              })
              .catch((err) => {
                console.warn(`[PWA SW] Pre-cache skipped for ${asset}:`, err);
              })
          )
        );
      })
      .then(() => {
        console.log(`[PWA SW] Pre-cache complete for ${STATIC_CACHE_NAME}`);
        return self.skipWaiting();
      })
  );
});

// Activate: Purge obsolete caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (
              name.startsWith('chroma-') &&
              name !== STATIC_CACHE_NAME &&
              name !== RUNTIME_CACHE_NAME
            ) {
              console.log(`[PWA SW] Purging obsolete cache: ${name}`);
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Message listener: Handle SKIP_WAITING from client update UI
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[PWA SW] SKIP_WAITING received, activating immediately.');
    self.skipWaiting();
  }
});

// Fetch: Smart caching strategies tailored by resource type
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle HTTP/HTTPS GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Ignore cross-origin third-party analytics or browser extensions
  if (url.origin !== self.location.origin) {
    return;
  }

  // 1. Navigation requests (HTML pages): Network First with Cache Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(RUNTIME_CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Offline fallback: return cached navigation or cached index.html
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match('/index.html');
          if (fallback) return fallback;
          return caches.match('/');
        })
    );
    return;
  }

  // 2. Versioned Build Assets (/assets/*): Cache First with Background Refresh
  // Vite assets have content hashes in their filename (e.g., index-B5a9.js) making them immutable
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(RUNTIME_CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 3. Static Icons & Branding: Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(RUNTIME_CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline network error: ignore since cached was already returned if available
        });

      return cached || fetchPromise;
    })
  );
});
