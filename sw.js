/* Workbox Service Worker (offline cache) 
   Obs: Service Worker só funciona quando servido via http/https (ex.: Vite, localhost).
*/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  workbox.core.clientsClaim();
  workbox.core.skipWaiting();

  // Cache básico de assets (html/js/css/images/audio)
  workbox.routing.registerRoute(
    ({request}) => ["document","script","style","image","font","audio"].includes(request.destination),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "quiz-tcf-assets",
      plugins: [new workbox.expiration.ExpirationPlugin({ maxEntries: 120, maxAgeSeconds: 7*24*60*60 })]
    })
  );

  // Fallback offline para navegação
  workbox.routing.setCatchHandler(async ({event}) => {
    if (event.request.destination === 'document') {
      return caches.match('./index.html');
    }
    return Response.error();
  });
}
