// @ts-check
const { getWebpackConfigForPackage } = require('webpack-shared');

const deps = require('./package.json').dependencies;

/** @type {import('webpack-shared').ModuleFederationPluginOptions} */
const federatedConfig = {
  name: 'template',
  exposes: {},
  shared: {
    react: { singleton: true, requiredVersion: deps.react },
    'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
    'single-spa-react': { singleton: true, requiredVersion: deps['single-spa-react'] },
  },
};

module.exports = getWebpackConfigForPackage(
  (envFlags, argv) => ({
    output: {
      library: 'template',
    },
  }),
  federatedConfig,
);
