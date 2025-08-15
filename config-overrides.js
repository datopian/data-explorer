const path = require('path');

module.exports = function override(config, env) {
  // Add a rule to process specific node_modules packages with babel
  config.module.rules.unshift({
    test: /\.js$/,
    include: [
      path.resolve(__dirname, 'node_modules/react-i18next'),
      path.resolve(__dirname, 'node_modules/i18next-browser-languagedetector')
    ],
    use: {
      loader: require.resolve('./node_modules/react-scripts/node_modules/babel-loader'),
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
  config.resolve.alias = {
    ...config.resolve.alias,
    react: path.resolve(__dirname, 'node_modules/react'),
    'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime'),
    'react/jsx-dev-runtime': path.resolve(__dirname, 'node_modules/react/jsx-dev-runtime')
  };

  // Make webpack more lenient with missing exports for development
  config.module.strictExportPresence = false;

  return config;
};