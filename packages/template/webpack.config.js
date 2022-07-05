// @ts-check
const path = require('path');
const { container } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      index: {
        import: path.resolve(process.cwd(), 'src/index.ts'),
      },
    },
    output: {
      filename: '[name].js',
      path: path.resolve(process.cwd(), 'dist'),
      libraryTarget: 'umd',
      clean: true,
      library: 'template',
      umdNamedDefine: true,
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
        name: 'template',
        filename: 'remoteEntry.js',
        exposes: {},
        shared: {
          react: { singleton: true, requiredVersion: deps.react },
          'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
          'single-spa-react': { singleton: true, requiredVersion: deps['single-spa-react'] },
        },
      }),
    ],
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
      ignored: ['node_modules/**', 'public/**', 'dist/**', '.turbo/**'],
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
