const CACHE_NAME = 'niilus-v2';
const ASSETS = [
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    './images/nile.png',
    './images/delta.png',
    './images/giza.png',
    './images/sphinx.png',
    './images/tutankhamun.png',
    './images/anubis.png',
    './images/horus.png',
    './images/osiris.png',
    './images/isis.png',
    './images/ra.png',
    './images/bastet.png',
    './images/thoth.png',
    './images/seth.png',
    './images/maat.png',
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'https://unpkg.com/tone@14.7.77/build/Tone.js',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    (response) => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || (response.type !== 'basic' && !event.request.url.includes('upload.wikimedia.org'))) {
                            return response;
                        }

                        // CLONE the response as it can only be consumed once
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});
