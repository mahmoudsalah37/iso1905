'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "2efbb41d7877d10aac9d091f58ccd7b9",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/icons/add.png": "ca7337f4ca00c0be154ed7d6d4027228",
"assets/icons/architecture.png": "4ba9d491928a77b4c5769ddbf3094b94",
"assets/icons/bag.png": "57259dd26d090fe49f8fca1bc5b32e9f",
"assets/icons/cart.png": "250798125192a27c3ed07087a1c0ad1d",
"assets/icons/dashboard.png": "b43e329ddba5af126d4039ac50e89b27",
"assets/icons/delete.png": "635f586cd986e5bdea1340927ce392e7",
"assets/icons/document.png": "80940f8983106cef460228a9e1d3a429",
"assets/icons/edit.png": "89a1d525143dd3e43ee69a6b4ba4e468",
"assets/icons/error.png": "32c075eb4fec1087d0312cef21ee258c",
"assets/icons/flag.png": "5bbe6c5fa68f6f5e3e0582a27124777a",
"assets/icons/home.png": "d2ab5d02abadee426a63b9641ea35efd",
"assets/icons/house.png": "dd3fc0cfa5d7faa42c461e190988ce0c",
"assets/icons/hr.png": "e9248c594b1d433c4d408f33ad5c8c9d",
"assets/icons/logo.png": "2b4929cce9dab31da31a2202639369f7",
"assets/icons/logoW.png": "2239c34e8821d859b14ee3c3686947e6",
"assets/icons/logoWO.png": "aba2a4ef9cd5b4e80230e676aa35ce87",
"assets/icons/m.png": "4ba9d491928a77b4c5769ddbf3094b94",
"assets/icons/maximize.png": "cc4be26439929a2611a5b6b4134b828f",
"assets/icons/medal.png": "d722cd09f0b2f096fff3699c16709f77",
"assets/icons/megaphone.png": "c98414b4f245fc63891e68187d18365d",
"assets/icons/menu.png": "34b001f95356789af2edb82a899e6771",
"assets/icons/paper.png": "56fcd05880c7cb68478febb5200612d6",
"assets/icons/person.png": "91d595f6c0e57e7e055b1084ef18f083",
"assets/icons/process.png": "2a86e7350b1db72269edf85d15e7cad9",
"assets/icons/product.png": "ee8b4d1d18e482f3355645203309fbdc",
"assets/icons/report.png": "021f5fd6a9cc11f2a0389f82e76cac18",
"assets/icons/risks.png": "6960d6e6e512922b9c8fcf8a650fb723",
"assets/icons/se.png": "0794da6b2666f6b9bb93f75989fd828c",
"assets/icons/search.png": "0794da6b2666f6b9bb93f75989fd828c",
"assets/icons/settings.png": "aa1e210395fdf0e1ff890aa849b0164d",
"assets/icons/software.png": "a2ce7579ca14739479a281834000c00a",
"assets/icons/solution.png": "aa1489a1dfc8733eb0e88128dca9c951",
"assets/icons/support.png": "270523465b3f706d7fc14bdeb51a96c9",
"assets/icons/transfer.png": "7ec026caa56f1b6e65e6c2e036f80f34",
"assets/icons/victim.png": "539ab6e6cc1cc5a3273d7522c20c6249",
"assets/icons/view.png": "2814fc32ea68697d79fc0c52ed22f1d9",
"assets/NOTICES": "e8aeea7fa717e81af83b9e47727a695c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "b14fcf3ee94e3ace300b192e9e7c8c5d",
"favicon.png": "2239c34e8821d859b14ee3c3686947e6",
"icons/Icon-192.png": "2239c34e8821d859b14ee3c3686947e6",
"icons/Icon-512.png": "2239c34e8821d859b14ee3c3686947e6",
"index.html": "32123344fea76a4f927d46ed8453731b",
"/": "32123344fea76a4f927d46ed8453731b",
"main.dart.js": "c9ff8cb17361a4a9f85a03b8e76266ac",
"manifest.json": "4246d4ff363622b42f0b5e76f574f3c7",
"version.json": "5dde737e46a51fcc682e154dcb3375fe"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
