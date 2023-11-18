export default {
  app: {
    port: process.env.PORT,
    origin: process.env.ORIGIN_URL,
  },
  database: {
    mongo: {
      uri: process.env.MONGO_URI,
    },
  },
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE,
    jwksUri: process.env.AUTH0_JWKS_URI,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
  },
  apiAuth: {
    username: process.env.AUTH_USERNAME,
    password: process.env.AUTH_PASSWORD,
  },
};
