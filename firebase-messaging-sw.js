self.addEventListener("push", function (e) {
    const data = e.data.json();
    const options = {
        body: data.notification.body,
        icon: "/src/assets/logo.png",
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

const typeConfig = {
    COMMENT: 1,
    REACT: 2,
    POST: 3,
    SHARE: 4,
    FOLLOW: 5,
    UNREACT: 6,
    UNFOLLOW: 7
}

self.addEventListener("notificationclick", (event) => {
    console.log("On notification click: ", event.notification.tag);
    event.notification.close();
    console.log('event', event)
    const feed = event?.notification?.data?.data?.feed
    const type = +event?.notification?.data?.data?.type
    const user = JSON.parse(event?.notification?.data?.data?.user)
    console.log('user', user, feed, type)
    event.waitUntil(
        clients
            .matchAll({
                type: "window",
            })
            .then((clientList) => {
                let endpoint = ''
                if (typeConfig.COMMENT === type || typeConfig.REACT === type) endpoint = `/feed/${feed}`
                if (typeConfig.FOLLOW === type) endpoint = `/user/${user.customerId}`
                console.log('endpoint', endpoint)
                if (clients.openWindow) return clients.openWindow(endpoint);
            }),
    );
});
