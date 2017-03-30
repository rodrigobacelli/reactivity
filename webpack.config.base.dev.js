const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const configuration = require('./webpack.config.base')

// Base Dev Webpack config for server and client
configuration.devtool = 'inline-source-map'

configuration.entry = {
  client: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './src/client'
  ]
}

configuration.plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.ProvidePlugin({
    fetch: 'isomorphic-fetch'
  }),
  new Dotenv({
    path: './.env',
    safe: false
  })
]

configuration.devServer = {
  host: 'localhost',
  port: 3001,
  historyApiFallback: true,
  hot: true
}

configuration.output = {
  path: path.join(__dirname, 'dist'),
  publicPath: 'http://localhost:3001/',
  filename: '[name].js'
}

module.exports = configuration
