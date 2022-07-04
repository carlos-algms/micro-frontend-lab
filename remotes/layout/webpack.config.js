// @ts-check
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container } = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

const { ModuleFederationPlugin } = container;

/**
 * @param {WebpackEnvFlags} envFlags
 * @param {Argv} argv
 * @return {import('webpack').Configuration}
 */
const factory = (envFlags, argv) => {
  const isProduction = argv.mode === 'production';

  // in a real world app, you'd want to use an incremental counter
  const hash = isProduction ? '00x' : 'LOCAL';
  const publicPath = isProduction ? `/${hash}` : `http://localhost:${argv.port}/`;

  return {
    target: 'web',
    devtool: isProduction ? 'hidden-source-map' : 'eval',
    entry: {
      index: path.resolve(process.cwd(), 'src/index.ts'),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(process.cwd(), 'public', hash),
      publicPath,
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
        exposes: {
          './Header': './src/modules/Header',
        },
        shared: {},
      }),
      new AssetsPlugin({
        filename: 'assets.json',
        useCompilerPath: true,
        prettyPrint: true,
        // removeFullPathAutoPrefix: true,
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
 * port: number
 * }} Argv
 */
