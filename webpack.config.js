const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {htmlWebpackPluginTemplateCustomizer} = require('template-ejs-loader');
const {GenerateSW} = require('workbox-webpack-plugin');

const CLIENT_PATH = path.resolve(__dirname, 'client/');
const PUBLIC_PATH = path.resolve(__dirname, 'docs');
const treeMonths = 60 * 60 * 24 * 90;

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
  navigateFallback: 'index.html',
  clientsClaim: true,
  maximumFileSizeToCacheInBytes: 15728640, // 15 MB
  runtimeCaching: [{
    urlPattern: /^https:\/\/fonts\.googleapis\.com/,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'fonts.googleapis.com'
    }
  }, {
    urlPattern: /^https:\/\/fonts\.gstatic\.com/,
    handler: "CacheFirst",
    options: {
      cacheName: 'fonts.gstatic.com',
      expiration: {
        maxAgeSeconds: treeMonths
      }
    }
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
  let production = options.mode === 'production';
  let pwa = production || env.pwa || false;

  let htmlWebPackPlugin = new HtmlWebPackPlugin({
    filename: "index.html",
    template: htmlWebpackPluginTemplateCustomizer({
      templatePath: path.resolve(CLIENT_PATH, 'index.ejs'),
      templateEjsLoaderOption: {
        data: { 
          production, pwa
        }
      }
    })
  });

  let config = {
    entry: {
      app: path.resolve(CLIENT_PATH, 'index.jsx')
    },
    output: {
      path: PUBLIC_PATH,
      filename: 'build/[name].js',
      publicPath: production ? '': '/'
    },
    plugins: [
      htmlWebPackPlugin
    ],
    experiments: {
      topLevelAwait: true
    },
    devtool: production ? 'source-map': 'eval-source-map',
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
            path.resolve(__dirname, 'node_modules/normalize.css/'),
            path.resolve(__dirname, 'node_modules/toastify-js/')
          ],
          use: [
            production ? MiniCssExtractPlugin.loader: 'style-loader',
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
  
  if (pwa) {
    config.plugins.push(
      webpackPwaManifest,
      generateSW
    );
  }

  if (production) {
    config.plugins.push(new MiniCssExtractPlugin({
      filename: 'build/app.css'
    }));
  }

  return config;
};