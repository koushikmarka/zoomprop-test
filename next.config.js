/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  env: {
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
    BASE_SITE_REDIRECT_URI: process.env.BASE_SITE_REDIRECT_URI,
    API_URL: process.env.ZOOMPROP_API_URL,
    COGNITO_CLIENTID: process.env.COGNITO_CLIENTID,
    AUTH_REQUIRED: process.env.AUTH_REQUIRED,
  },
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: false,
})
