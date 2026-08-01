const STATIC_CACHE = "lunar-calendar-static-v2";
const DYNAMIC_CACHE = "lunar-calendar-dynamic-v1";

// Các file cốt lõi cần tải ngay lúc cài đặt
const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./main.js",
    "./lunar-calendar.js",
    "./manifest.json",
    "./public/favicon.png"
];

self.addEventListener("install", e => {
    self.skipWaiting(); // Ép Service Worker mới kích hoạt ngay lập tức
    e.waitUntil(
        caches.open(STATIC_CACHE).then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener("activate", e => {
    // Dọn dẹp các cache cũ không còn sử dụng
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(k => {
                    if (k !== STATIC_CACHE && k !== DYNAMIC_CACHE) {
                        return caches.delete(k);
                    }
                })
            )
        )
    );
    return self.clients.claim();
});

self.addEventListener("fetch", e => {
    const url = new URL(e.request.url);

    // 1. Bỏ qua các request POST (Service Worker không hỗ trợ cache phương thức POST)
    if (e.request.method !== "GET") return;

    // 2. Nhận diện các Request gọi API bên ngoài
    const isApiRequest = url.hostname.includes("script.google.com") ||
                         url.hostname.includes("open-meteo.com") ||
                         url.hostname.includes("bigdatacloud.net");

    if (isApiRequest) {
        // CHIẾN LƯỢC CHO API: Network First -> Cache -> Mock JSON
        e.respondWith(
            fetch(e.request)
                .then(response => {
                    // Nếu có mạng: Trả về dữ liệu mới và copy 1 bản vào Dynamic Cache
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(e.request, responseClone);
                    });
                    return response;
                })
                .catch(async () => {
                    // Nếu mất mạng: Ưu tiên trả về dữ liệu API cũ từ Dynamic Cache
                    const cachedResponse = await caches.match(e.request);
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    // Nếu không có cache, tạo một phản hồi JSON ảo để JS không bị lỗi SyntaxError
                    return new Response(JSON.stringify({
                        success: false,
                        message: "Bạn đang ngoại tuyến. Dữ liệu chưa thể tải xuống.",
                        events: [],
                        overtime: []
                    }), {
                        headers: { "Content-Type": "application/json" }
                    });
                })
        );
    } else {
        // CHIẾN LƯỢC CHO FILE TĨNH: Cache First -> Network -> Cập nhật Cache
        e.respondWith(
            caches.match(e.request).then(cachedResponse => {
                return cachedResponse || fetch(e.request).then(response => {
                    // Cache lại các file tài nguyên tĩnh mới (nếu có)
                    return caches.open(STATIC_CACHE).then(cache => {
                        cache.put(e.request, response.clone());
                        return response;
                    });
                });
            })
        );
    }
});