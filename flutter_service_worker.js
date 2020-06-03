'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "2efbb41d7877d10aac9d091f58ccd7b9",
"assets/FontManifest.json": "f7161631e25fbd47f3180eae84053a51",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
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
"assets/icons/process.png": "2a86e7350b1db72269edf85d15e7cad9",
"assets/icons/product.png": "ee8b4d1d18e482f3355645203309fbdc",
"assets/icons/report.png": "021f5fd6a9cc11f2a0389f82e76cac18",
"assets/icons/risks.png": "6960d6e6e512922b9c8fcf8a650fb723",
"assets/icons/se.png": "0794da6b2666f6b9bb93f75989fd828c",
"assets/icons/search.png": "0794da6b2666f6b9bb93f75989fd828c",
"assets/icons/software.png": "a2ce7579ca14739479a281834000c00a",
"assets/icons/solution.png": "aa1489a1dfc8733eb0e88128dca9c951",
"assets/icons/support.png": "270523465b3f706d7fc14bdeb51a96c9",
"assets/icons/transfer.png": "7ec026caa56f1b6e65e6c2e036f80f34",
"assets/icons/victim.png": "539ab6e6cc1cc5a3273d7522c20c6249",
"assets/icons/view.png": "2814fc32ea68697d79fc0c52ed22f1d9",
"assets/LICENSE": "f5644813f8addccbcda0b7be9be04f5e",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "2239c34e8821d859b14ee3c3686947e6",
"icons/Icon-192.png": "2239c34e8821d859b14ee3c3686947e6",
"icons/Icon-512.png": "2239c34e8821d859b14ee3c3686947e6",
"index.html": "f6156f51d0455ff4bb7c10887e3e3e4d",
"/": "f6156f51d0455ff4bb7c10887e3e3e4d",
"main.dart.js": "f5a676e05ae70021246e85bb4cce07c4",
"manifest.json": "675ddf11f7d4a8abbf16f27dab872afb"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
