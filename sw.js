/* Build Something! service worker — network-first so merged Board PRs show up
   immediately, with a cache fallback so the site still opens offline. */

var CACHE = "bs-v1.6";
var PRECACHE = [
  "./",
  "./index.html",
  "./intake.html",
  "./machine.html",
  "./prompt.html",
  "./quests.html",
  "./board.html",
  "./setup.html",
  "./debrief.html",
  "./css/style.css",
  "./js/app.js",
  "./data/builds.js",
  "./manifest.json"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) { return cache.addAll(PRECACHE); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") { return; }
  var url = new URL(event.request.url);
  if (!url.protocol.startsWith("http")) { return; }
  if (url.origin !== self.location.origin) { return; }

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        if (response.ok) {
          var clone = response.clone();
          caches.open(CACHE).then(function (cache) { cache.put(event.request, clone); });
        }
        return response;
      })
      .catch(function () { return caches.match(event.request); })
  );
});
