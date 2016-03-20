var path = require('path');

module.exports = {
  clientSrc: path.join(__dirname, '../src/client'),
  serverSrc: path.join(__dirname, '../src/server'),
  scssSrc: path.join(__dirname, '../src/client/scss'),
  clientDest: path.join(__dirname, '../public/assets/js'),
  serverDest: path.join(__dirname, '..'),
  scssDest: path.join(__dirname, '../public/assets/css')
}
