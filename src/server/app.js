import express from 'express';
import http from 'http';
import io from 'socket.io';
import gravatar from 'gravatar';
import path from 'path';

let app = express();
let server = http.Server(app);
let chat = io(server);


app.use(express.static('public'));

chat.on('connection', (socket) => {

  socket.on('chat message', (msg) => {
      chat.emit('chat message', msg);
  });

  socket.on('chat email', (data) => {
      socket.emit('chat email', gravatar.url(data.email));
  });
});

server.listen(3000, () => {
  console.log('listening to *:3000');
});
