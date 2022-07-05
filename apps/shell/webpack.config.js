// @ts-check
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container } = require('webpack');
const { ModuleFederationPlugin } = container;

const deps = require('./package.json').dependencies;

/**
 * @param {WebpackEnvFlags} envFlags
 * @param {Argv} argv
 * @return {import('webpack').Configuration}
 */
const factory = (envFlags, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    target: 'web',
    devtool: isProduction ? 'hidden-source-map' : 'source-map',
    entry: {
      index: path.resolve(process.cwd(), 'src/index.ts'),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(process.cwd(), 'public'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Shell',
        filename: 'index.html',
        template: path.resolve(process.cwd(), 'src/index.html'),
        chunks: ['index'],
        env: {
          ...process.env,
        },
      }),
      new ModuleFederationPlugin({
        name: 'shell',
        filename: 'remoteEntry.js',
        exposes: {},
        shared: {
          'single-spa': { singleton: true, requiredVersion: deps['single-spa'] },
        },
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      symlinks: false,
    },
    module: {
      rules: [
        {
          test: /\.m?[jt]sx?$/i,
          exclude: /(node_modules)/,
          use: {
            loader: 'ts-loader',
          },
        },
      ],
    },
    watchOptions: {
      ignored: ['node_modules/**', 'public/**', 'dist/**'],
    },
  };
};

module.exports = factory;

/**
 * @typedef {{
 * production?: boolean;
 * development?: boolean;
 * local?: boolean;
 * }} WebpackEnvFlags
 */

/**
 * @typedef {{
 * color: boolean,
 * mode: 'production' | 'development' | 'none' | undefined,
 * analyze: boolean,
 * }} Argv
 */
