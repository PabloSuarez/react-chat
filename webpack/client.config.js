var paths = require('./paths');

module.exports = {
  context: paths.clientSrc,
  entry: {
    client: './app',
  },
  output: {
    path: paths.clientDest,
    filename: '[name].bundle.js'
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        include: [paths.clientSrc],
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js' ,'.jsx']
  }
}
