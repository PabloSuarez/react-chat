var paths = require('./paths');

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
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      }
    ]
  },
  resolve: {
    extensions: ['', '.css' ,'.scss']
  }
}
