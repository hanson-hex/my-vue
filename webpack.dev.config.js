const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: [
    './src/myVue.js',
    './src/compile.js',
    './src/index.js',
    ],
  output: {
    path: __dirname,
    filename: './release/bundle.js'
  },

  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './release'), // 根目录
    open: true, // 自动打开webbrower
    port: 9001
  }
}