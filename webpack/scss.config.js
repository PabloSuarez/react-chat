var paths = require('./paths');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: paths.scssSrc,
  entry: {
    main: './main.scss',
  },
  output: {
    path: paths.scssDest,
    filename: '[name].css'
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.scss$/,
        // loaders: ["style", "css?sourceMap", "sass?sourceMap"]
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader?sourceMap")
      }
    ]
  },
  resolve: {
    extensions: ['', '.css' ,'.scss']
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
}
