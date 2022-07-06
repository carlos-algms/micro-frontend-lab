import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { container, type Configuration } from 'webpack';
import { merge } from 'webpack-merge';

const AssetsPlugin = require('assets-webpack-plugin');

const { ModuleFederationPlugin } = container;

export { ModuleFederationPlugin };

export type ModuleFederationPluginOptions = ConstructorParameters<typeof ModuleFederationPlugin>[0];

export type WebpackEnvFlags = {
  production?: boolean;
  development?: boolean;
  local?: boolean;
};

export type WebpackArgv = {
  color: boolean;
  mode: 'production' | 'development';
  analyze: boolean;
  port: number;
};

export type WebpackConfigFactory = (envFlags: WebpackEnvFlags, args: WebpackArgv) => Configuration;

export function getWebpackConfigForApp(
  config: Configuration | WebpackConfigFactory,
  federatedConfig?: ModuleFederationPluginOptions,
): WebpackConfigFactory {
  return (envFlags, argv) => {
    const baseConfig = getBaseConfig(envFlags, argv, federatedConfig);
    const userConfig = typeof config === 'function' ? config(envFlags, argv) : config;

    const appConfig: Configuration = {
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.resolve(process.cwd(), 'src/index.html'),
          chunks: ['index'],
          env: {
            ...process.env,
          },
        }),
      ],
    };

    return merge(baseConfig, appConfig, userConfig);
  };
}

export function getWebpackConfigForPackage(
  config: Configuration | WebpackConfigFactory,
  federatedConfig?: ModuleFederationPluginOptions,
): WebpackConfigFactory {
  return (envFlags, argv) => {
    const baseConfig = getBaseConfig(envFlags, argv, federatedConfig);
    const userConfig = typeof config === 'function' ? config(envFlags, argv) : config;

    const packageConfig: Configuration = {
      output: {
        libraryTarget: 'umd',
        clean: true,
        umdNamedDefine: true,
      },
    };

    return merge(baseConfig, packageConfig, userConfig);
  };
}

const getBaseConfig = (
  envFlags: WebpackEnvFlags,
  argv: WebpackArgv,
  federatedConfig?: ModuleFederationPluginOptions,
): Configuration => {
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
    },
    plugins: [
      federatedConfig && new ModuleFederationPlugin(federatedConfig),
      new AssetsPlugin({
        filename: 'assets.json',
        useCompilerPath: true,
        prettyPrint: true,
      }),
    ].filter(Boolean) as Configuration['plugins'],
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
      ignored: ['node_modules/**', 'public/**', 'dist/**', '.turbo/**'],
    },
  };
};
