// @ts-check
const path = require('path');
const { container } = require('webpack');

const { ModuleFederationPlugin } = container;

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
      path: path.resolve(process.cwd(), 'dist'),
      libraryTarget: 'umd',
      clean: true,
      library: 'remoteLoader',
      umdNamedDefine: true,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'remote-loader',
        filename: 'remoteEntry.js',
        exposes: {},
        shared: {},
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
