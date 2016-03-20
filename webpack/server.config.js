var fs = require('fs');
var paths = require('./paths');
var path = require('path');

var nodeModules = {};
fs.readdirSync(path.join(__dirname, '../node_modules/')).filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
}).forEach(function(mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
  context: paths.serverSrc,
  entry: {
    server: './app'
  },
  output: {
    path: paths.serverDest,
    filename: 'main.js'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
}
