const CACHE_NAME = 'nga-jetclean-v1';
const CACHE_PATHS = [
    '/assets/images/',
];

// Install event - cache all images
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll([
                    // Add your image paths here
                    '/assets/images/house_01_before.JPG',
                    '/assets/images/house_01_after.JPG',
                    '/assets/images/house_02_before.JPG',
                    '/assets/images/house_02_middle.JPG',
                    '/assets/images/house_02_after.JPG',
                    '/assets/images/siding_before&after_01.png',
                    '/assets/images/siding_before&after_01_close-up01.png',
                    '/assets/images/siding_before&after_01_close-up02.png',
                    '/assets/images/siding_before&after_02.png',
                    '/assets/images/siding_before&after_03.jpg',
                    '/assets/images/siding_before&after_collage.png',
                    '/assets/images/roof_01.png',
                    '/assets/images/roof_02.png',
                    '/assets/images/roof_03.png',
                    '/assets/images/roof_04.png',
                    '/assets/images/roof_05.png',
                    '/assets/images/roof_06.png',
                    '/assets/images/roof_07.png'
                ]);
            })
    );
});

// Fetch event - serve from cache first, then network
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    // Only handle image requests
    if (!event.request.url.match(/\.(jpe?g|png|gif|svg|webp)$/i)) return;

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version if available
                if (response) {
                    return response;
                }

                // Otherwise fetch from network
                return fetch(event.request).then(
                    (response) => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response as it can only be consumed once
                        const responseToCache = response.clone();

                        // Add the new response to cache
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