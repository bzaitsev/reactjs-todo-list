const path = require('path'), 
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      HtmlWebPackPlugin = require("html-webpack-plugin");

const CLIENT_PATH = path.resolve(__dirname, 'client'),
      PUBLIC_PATH = path.resolve(__dirname, 'docs'),
      normalizeCssPath = path.resolve(__dirname, 'node_modules/normalize.css/');

const { htmlWebpackPluginTemplateCustomizer } = require('template-ejs-loader');

module.exports = (env, options) => {
  let isProduction = options.mode === 'production';
  
  let config = {
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
    plugins: [
      new HtmlWebPackPlugin({
        filename: "index.html",
        template: htmlWebpackPluginTemplateCustomizer({
          templatePath: path.resolve(CLIENT_PATH, 'index.ejs'),
          templateEjsLoaderOption: {
            data: {
              ga: isProduction
            }
          }
        })
      })
    ],
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