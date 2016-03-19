var fs = require('fs');
var path = require('path');

var SERVER_APP_NAME = 'app';
var CLIENT_APP_NAME = 'app';
var PATHS = {
  context: path.join(__dirname, ''),
  public: path.join(__dirname, 'public'),
  src: path.join(__dirname, 'src'),
  server: './server',
  client: './client'
}

var nodeModules = {};
fs.readdirSync('node_modules').filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
}).forEach(function(mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});

serverConfig = {
  context: PATHS.src,
  entry: {
    server: './' + path.join(PATHS.server, SERVER_APP_NAME)
  },
  output: {
    path: PATHS.context,
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

clientConfig = {
  context: PATHS.src,
  entry: {
    client: './' + path.join(PATHS.client, CLIENT_APP_NAME),
  },
  output: {
    path: path.join(PATHS.public, 'js'),
    filename: '[name].bundle.js'
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        include: [path.join(PATHS.src, PATHS.client)],
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
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
