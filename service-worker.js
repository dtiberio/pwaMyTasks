self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "index.html",
        "about.html",
        "README.md",
        "manifest.json",
        "images/logo.png",
        "images/workflow-diagram.svg",
        "css/styles.css",
        "js/main.js",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== "v1") {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
