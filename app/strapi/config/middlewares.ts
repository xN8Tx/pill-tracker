export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: ["https://pill.shteyn-web.ru", "https://pill-cms.shteyn-web.ru"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: [
        "Access-Control-Allow-Credentials",
        "Access-Control-Allow-Origin",
        "Content-Type",
        "Authorization",
        "Origin",
        "Accept",
        "Accept-encoding",
        "Accept-Encoding",
        "Host",
        "Connection",
        "Accept-Language",
      ],
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
