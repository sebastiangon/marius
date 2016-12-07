var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  entry: "./public/js/app.js",
  output: {
    path: path.join(__dirname,'/public/'),
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
     loaders: [
      { test: /\.js$/,
        loader: 'babel-loader',
      }]
  },
  resolve: {
    extensions: ['', '.js']
  },
};
