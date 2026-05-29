// Service Worker for LinkSocial - Background Notifications
self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(clients.claim());
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    var url = event.notification.data && event.notification.data.url ? event.notification.data.url : '/chat.html';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url.indexOf(url) !== -1 && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

// Handle push events (for server-side FCM)
self.addEventListener('push', function(event) {
    var data = {};
    if (event.data) {
        try { data = event.data.json(); } catch(e) { data = { body: event.data.text() }; }
    }
    var options = {
        body: data.body || 'You have a new message',
        icon: data.icon || 'src/og-image.png',
        badge: 'src/og-image.png',
        data: { url: data.url || '/chat.html' },
        vibrate: [200, 100, 200],
        tag: data.tag || 'linksocial-msg'
    };
    event.waitUntil(self.registration.showNotification(data.title || 'LinkSocial', options));
});// Service Worker for LinkSocial - Background Notifications
self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(clients.claim());
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    var url = event.notification.data && event.notification.data.url ? event.notification.data.url : '/chat.html';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url.indexOf(url) !== -1 && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

// Handle push events (for server-side FCM)
self.addEventListener('push', function(event) {
    var data = {};
    if (event.data) {
        try { data = event.data.json(); } catch(e) { data = { body: event.data.text() }; }
    }
    var options = {
        body: data.body || 'You have a new message',
        icon: data.icon || 'src/og-image.png',
        badge: 'src/og-image.png',
        data: { url: data.url || '/chat.html' },
        vibrate: [200, 100, 200],
        tag: data.tag || 'linksocial-msg'
    };
    event.waitUntil(self.registration.showNotification(data.title || 'LinkSocial', options));
});
