const path = require('path')
const webpack = require('webpack')

const config = {
  entry: './global.js',
  output: {
    filename: 'idom.js',
    path: path.join(__dirname, './dist'),
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
    ]
  },
  devServer: {
    contentBase: './'
  }
}

module.exports = config
