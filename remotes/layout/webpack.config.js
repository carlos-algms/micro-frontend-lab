// @ts-check
const path = require('path');
const { getWebpackConfigForApp } = require('webpack-shared');

const deps = require('./package.json').dependencies;

/** @type {import('webpack-shared').ModuleFederationPluginOptions} */
const federatedConfig = {
  name: 'layout',
  filename: 'remoteEntry.js',
  exposes: {
    './Header': './src/modules/Header/HeaderSpa',
  },
  shared: {
    react: { singleton: true, requiredVersion: deps.react },
    'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
  },
};

module.exports = getWebpackConfigForApp((envFlags, argv) => {
  const isProduction = argv.mode === 'production';

  // in a real world app, you'd want to use an incremental counter
  const hash = isProduction ? '00x' : 'LOCAL';
  // TODO: how can we determine the hostname and port? env vars? config?
  const publicPath = isProduction ? `/${hash}` : `http://localhost:${argv.port}/`;

  return {
    output: {
      path: path.resolve(process.cwd(), 'public', hash),
      publicPath,
    },
  };
}, federatedConfig);
