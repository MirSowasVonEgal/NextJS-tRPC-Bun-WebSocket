module.exports = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  publicRuntimeConfig: {
    APP_URL: "http://localhost:3000",
    WS_URL: "ws://localhost:3001"
  }
};
