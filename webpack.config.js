const path = require('path'), 
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      HtmlWebPackPlugin = require("html-webpack-plugin");

const CLIENT_PATH = path.resolve(__dirname, 'client'),
      PUBLIC_PATH = path.resolve(__dirname, 'docs'),
      normalizeCssPath = path.resolve(__dirname, 'node_modules/normalize.css/');

let config = {
  entry: path.resolve(CLIENT_PATH, 'index.jsx'),
  output: {
    path: PUBLIC_PATH,
    filename: 'build/app.js',
    publicPath: '/'
  },
  devServer: {
    static: {
      directory: PUBLIC_PATH
    },
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'build/app.css'
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(CLIENT_PATH, 'index.html'),
      filename: "index.html"
    })    
  ],  
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg|ico|eot|ttf|woff|woff2|otf)$/i,
        include: [
          CLIENT_PATH
        ],
        type: 'asset/resource'
      }, {
        test: /\.(js|jsx)$/,
        include: [
          CLIENT_PATH
        ],
        loader: 'babel-loader'
      }, {
        test: /\.scss$|\.css$/,
        include: [
          CLIENT_PATH,
          normalizeCssPath
        ],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ],
      }, {
        test: /\.html$/,
        include: [
          CLIENT_PATH
        ],        
        loader: "html-loader"
      }
    ] 
  }
};

module.exports = (env, options) => {
  let production = options.mode === 'production';
  
  config.devtool = production
    ? 'source-map'
    : 'eval-source-map';

  return config;
};