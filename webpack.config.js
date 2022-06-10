const path = require('path'), 
      ExtractTextPlugin = require("extract-text-webpack-plugin"),
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
    overlay: true,
    contentBase: PUBLIC_PATH,
    historyApiFallback: true
  },
  plugins: [
    new ExtractTextPlugin('build/app.css'),
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
        loader: 'file-loader'
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
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