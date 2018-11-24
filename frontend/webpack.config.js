var debug = process.env.NODE_ENV !== "production"
var webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

var path = require("path")

var DIST_DIR = path.resolve(__dirname, "dist")
var SRC_DIR = path.resolve(__dirname, "src")

module.exports = {
  entry: SRC_DIR + "/js/index.js",
  output: {
    path: DIST_DIR,
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: SRC_DIR,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015", "stage-2"]
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({ template: SRC_DIR + "/index.html" })
  ]
}
