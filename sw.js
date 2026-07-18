const CACHE_NAME = 'sani-portal-v1';
const APP_SHELL = [
  './', './index.html', './about.html', './blog.html', './contact.html', './privacy.html', './offline.html',
  './styles.css', './theme.css', './logo.css', './portrait.css', './localization.css', './language-selector.css',
  './controls-layout.css', './assistant.css', './assistant-motion.css', './expectations.css',
  './portal-expansion.css', './hero-cta-glow.css', './proof.css', './pwa.css', './subpage.css',
  './subpage-theme.css', './content-pages.css', './contact-page.css', './script.js', './assistant.js',
  './content-pages.js', './contact-page.js', './pwa.js', './manifest.webmanifest',
  './assets/icons/icon-192.png', './assets/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key.startsWith('sani-portal-') && key !== CACHE_NAME).map((key) => caches.delete(key))
  )));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then((response) => {
      if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
      return response;
    }).catch(() => caches.match(request).then((cached) => cached || caches.match('./offline.html'))));
    return;
  }

  event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => {
    if (response.ok && response.type === 'basic') caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
    return response;
  })));
});
