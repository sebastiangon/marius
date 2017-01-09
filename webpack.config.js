var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
  pixi = path.join(phaserModule, 'build/custom/pixi.js'),
  p2 = path.join(phaserModule, 'build/custom/p2.js');

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
      },
      { test: /pixi\.js/, loader: 'expose?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
      { test: /p2\.js/, loader: 'expose?p2' }
      ]
  },
  resolve: {
    alias: {
            'phaser': phaser,
            'pixi.js': pixi,
            'p2': p2,
        },
    extensions: ['', '.js']
  },
};
