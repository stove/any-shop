const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname()],
    // path: '/assets/img/', // Custom path (only needed if you're not using the 'public' directory)
    loader: 'default' // This uses Next.js' built-in image optimization loader
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});
