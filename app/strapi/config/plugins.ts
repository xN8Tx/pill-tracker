export default () => ({
  "strapi-v5-http-only-auth": {
    enabled: true,
    config: {
      cookieOptions: {
        domain: process.env.CLIENT_DOMAIN,
      },
    },
  },
});
