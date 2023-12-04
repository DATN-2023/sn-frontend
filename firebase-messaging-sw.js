self.addEventListener("push", function (e) {
    const data = e.data.json();
    const options = {
        body: data.notification.body,
        icon: "./favicon.ico",
        data
    };
    e.waitUntil(
        (async () => {
            await self.registration.showNotification(
                data.notification.title,
                options
            );
            const clients = await self.clients.matchAll({
                includeUncontrolled: true,
            });
            if (clients && clients.length) {
                for (let c of clients) {
                    c.postMessage(options);
                }
            }
        })()
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});
