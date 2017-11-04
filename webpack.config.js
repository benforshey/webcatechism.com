const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './scripts/main.js',
    polyfill: './scripts/polyfill.js'
  },
  output: {
    path: path.resolve(__dirname, './static/build/'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(['css-loader', 'postcss-loader'])
      },
      {
        test: /\.woff|\.woff2$/,
        use: 'file-loader?name=[name].[ext]&outputPath=../fonts/'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  watch: false
}

module.exports = config
