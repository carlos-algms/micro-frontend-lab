// @ts-check
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container } = require('webpack');
const { ModuleFederationPlugin } = container;

/**
 * @param {WebpackEnvFlags} envFlags
 * @param {Argv} argv
 * @return {import('webpack').Configuration}
 */
const factory = (envFlags, argv) => {
  return {
    target: 'web',
    devtool: 'source-map',
    entry: {
      index: path.resolve(process.cwd(), '/src/index.ts'),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(process.cwd(), 'public'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Shell',
        filename: 'index.html',
        template: path.resolve(process.cwd(), '/src/index.html'),
        chunks: ['index'],
        env: {
          ...process.env,
        },
      }),
      new ModuleFederationPlugin({
        name: 'shell',
        filename: 'remoteEntry.js',
        exposes: {},
        shared: {},
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.m?[jt]sx?$/i,
          exclude: /(node_modules)/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
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
 * mode: 'production' | 'development',
 * analyze: boolean,
 * }} Argv
 */
