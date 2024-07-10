export default () => ({
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION_MS,
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION_MS,
});
