// var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'js/app/index.js'),
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'javascripts/index.js'
  },
  module: {
    rules: [
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }
    ]
  },
  resolve: {
    alias: {
      'jquery': path.resolve(__dirname, 'js/lib/jquery-2.0.3.min.js'),
      'mod': path.resolve(__dirname, 'js/mod'),
      'less': path.resolve(__dirname, 'less')
    }
  }
}
