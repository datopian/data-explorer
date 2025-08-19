const path = require('path');
const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add a rule to process specific node_modules packages with babel
  config.module.rules.unshift({
    test: /\.js$/,
    include: [
      path.resolve(__dirname, 'node_modules/react-i18next'),
      path.resolve(__dirname, 'node_modules/i18next-browser-languagedetector')
    ],
    use: {
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          [require.resolve('@babel/preset-env'), {
            targets: { browsers: ['last 2 versions'] }
          }]
        ],
        plugins: [
          require.resolve('@babel/plugin-proposal-optional-chaining'),
          require.resolve('@babel/plugin-proposal-nullish-coalescing-operator')
        ],
        cacheDirectory: true
      }
    }
  });

  // Force webpack to use a single React instance to avoid hook errors
  config.resolve = config.resolve || {};

  // Add Node.js polyfills for Webpack 5
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: require.resolve('path-browserify'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer'),
    util: require.resolve('util'),
    url: require.resolve('url'),
    assert: require.resolve('assert'),
    vm: false,
    fs: false
  };

  // Provide global polyfills
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    })
  ]);

  // Make webpack more lenient with missing exports for development
  config.module.strictExportPresence = false;

  return config;
};