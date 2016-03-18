var fs = require('fs');
var path = require('path');

var SERVER_APP_NAME = 'app';
var CLIENT_APP_NAME = 'app';
var PATHS = {
  context: path.join(__dirname, ''),
  server: './server',
  client: './client',
  build: path.join(__dirname, 'build')
}

var nodeModules = {};
fs.readdirSync('node_modules').filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
}).forEach(function(mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});

serverConfig = {
  context: PATHS.context,
  entry: {
    server: './' + path.join(PATHS.server, SERVER_APP_NAME)
  },
  output: {
    path: PATHS.build,
    filename: '[name].bundle.js'
  },
  target: 'node',
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

clientConfig = {
  context: PATHS.context,
  entry: {
    client: './' + path.join(PATHS.client, CLIENT_APP_NAME)
  },
  output: {
    path: PATHS.build,
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        include: [path.join(PATHS.context, PATHS.client)],
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

module.exports = [
  serverConfig,
  clientConfig
]
