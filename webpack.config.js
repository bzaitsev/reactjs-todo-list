const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {htmlWebpackPluginTemplateCustomizer} = require('template-ejs-loader');
const {GenerateSW} = require('workbox-webpack-plugin');

const CLIENT_PATH = path.resolve(__dirname, 'client/');
const PUBLIC_PATH = path.resolve(__dirname, 'docs');
const normalizeCssPath = path.resolve(__dirname, 'node_modules/normalize.css/');

let isServiceWorker = false;

let webpackPwaManifest = new WebpackPwaManifest({
  name: "Todo list on React",
  short_name: "Todo list",
  display: "standalone",
  start_url: ".",
  background_color: "#fff",
  description: "",
  crossorigin: 'use-credentials',
  ios: false,
  icons: [{
    src: path.resolve(CLIENT_PATH, 'images/manifest-512.png'),
    sizes: [16, 48, 128, 192, 512]
  }]
});

let generateSW = new GenerateSW({
  clientsClaim: true,
  maximumFileSizeToCacheInBytes: 15728640, // 15 MB
  runtimeCaching: [{
    urlPattern: /^https:\/\/fonts\.googleapis\.com/,
    handler: 'CacheFirst',
    options: {cacheName: 'fonts.googleapis.com'}
  }, {
    urlPattern: /^https:\/\/fonts\.gstatic\.com/,
    handler: "CacheFirst",
    options: {cacheName: 'fonts.gstatic.com'}
  }, {
    urlPattern: /\/manifest.*\.json/,
    handler: "StaleWhileRevalidate",
    options: {cacheName: 'manifest'}
  }, {
    urlPattern: /\/*\.png/,
    handler: "StaleWhileRevalidate",
    options: {cacheName: 'images'}
  }]
});

module.exports = (env, options) => {
  let isProduction = options.mode === 'production';
  let plugins = [];
  
  let htmlWebPackPlugin = new HtmlWebPackPlugin({
    filename: "index.html",
    template: htmlWebpackPluginTemplateCustomizer({
      templatePath: path.resolve(CLIENT_PATH, 'index.ejs'),
      templateEjsLoaderOption: {
        data: { isProduction, isServiceWorker }
      }
    })
  });

  plugins.push(
    htmlWebPackPlugin
  );

  if (isProduction || isServiceWorker) {
    plugins.push(
      webpackPwaManifest,
      generateSW
    );
  }

  let config = {
    plugins,
    entry: path.resolve(CLIENT_PATH, 'index.jsx'),
    devtool: isProduction ? 'source-map': 'eval-source-map',
    output: {
      path: PUBLIC_PATH,
      filename: 'build/app.js',
      publicPath: isProduction ? '': '/'
    },
    devServer: {
      static: {
        directory: PUBLIC_PATH
      },
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.(gif|png|jpe?g|svg|ico|eot|ttf|woff|woff2|otf)$/i,
          include: [CLIENT_PATH],
          type: 'asset/resource'
        }, {
          test: /\.(js|jsx)$/,
          include: [CLIENT_PATH],
          loader: 'babel-loader'
        }, {
          test: /\.scss$|\.css$/,
          include: [
            CLIENT_PATH,
            normalizeCssPath
          ],
          use: [
            isProduction ? MiniCssExtractPlugin.loader: 'style-loader',
            "css-loader",
            "sass-loader"
          ],
        }, {
          test: /\.ejs$/,
          include: [CLIENT_PATH],
          use: ["html-loader", 'template-ejs-loader']
        }
      ]
    }
  };

  if (isProduction) {
    config.plugins.push(new MiniCssExtractPlugin({
      filename: 'build/app.css'
    }));
  }

  return config;
};