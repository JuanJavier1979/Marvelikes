const version = "v1"
const cacheName = `${version}-static-assets`;

const offlineAssets = [
    '/',
    '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.13/semantic.min.css',
    'bundle.js',
    'favicon.ico'
]

self.addEventListener('install', event => {
    console.log('--------->Install SW');
    console.log('---cache '+cacheName);
    event.waitUntil(
        caches
        .open(cacheName)
        .then((cache) => {
            return cache.addAll(offlineAssets);
        })
        .then(() => {
            console.log('WORKER:: install completed');
        })
    )
});

self.addEventListener('activate', event => {
    console.log('--------->Activate SW');
    event.waitUntil(
        caches
        .keys()
        .then((keys) => {
            return Promise.all(
                keys
                .filter((key) => {
                    return !key.startsWith(version);
                })
                .map((key) => {
                    return caches.delete(key);
                })
            );
        })
        .then(() => {
            console.log('WORKER:: activation completed. This is not even my final form');
        })
    )
});

self.addEventListener('fetch', event => {
    console.log('--------->Fetch SW');
    let url = new URL(event.request.url);
    event.respondWith(
        caches.match(url).then(response => {
            return response || fetch(event.request);
        })
    );
});
