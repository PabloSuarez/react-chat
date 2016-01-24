var express = require('express');
var http = require('http');
var io = require('socket.io');
var gravatar = require('gravatar');

var app = express();
var server = http.Server(app);
var chat = io(server);

app.use(express.static('build'));
app.use(express.static('css'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/react.html');
});

chat.on('connection', function (socket) {
    socket.on('chat message', function(msg){
        chat.emit('chat message', msg);
    });

    socket.on('chat email', function(data) {
        var email = data.email;
        socket.emit('chat email', gravatar.url(email));
    });
});

server.listen(3000, function () {
  console.log('listening to *:3000');
});
