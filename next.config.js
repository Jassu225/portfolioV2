const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
  PHASE_PRODUCTION_BUILD
} = require('next/constants');

// const withPWA = require('next-pwa');
const withOptimizedImages = require('next-optimized-images');

const nextConfig = (phase, defaultConfig) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd = phase === PHASE_PRODUCTION_SERVER;
  const isProdBuild = phase === PHASE_PRODUCTION_BUILD;

  return {
    ...defaultConfig,
    distDir: 'build',
    assetPrefix: '',
    assetDirectory: 'static',
    env: {
      isDev,
      isProd,
      isProdBuild,
      // API_URL: process.env.REACT_APP_API_URL,
      PUBLIC: '',
      GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
    },
    // next-optimized-images
    optimizeImagesInDev: true,
    removeOriginalExtension: true,
    optipng: {
      optimizationLevel: 3
    },
    svgo: {}
    // next-pwa
    // pwa: {
    //   dest: 'public',
    //   disable: isDev,
    //   register: true,
    //   scope: '/',
    //   sw: 'service-worker.js'
    // }
  };
};

module.exports = (phase, { defaultConfig }) =>
  withOptimizedImages(nextConfig(phase, defaultConfig));
// withPWA(withOptimizedImages(nextConfig(phase, defaultConfig)));
