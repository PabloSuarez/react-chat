import express from 'express';
import http from 'http';
import io from 'socket.io';
import gravatar from 'gravatar';

let app = express();
let server = http.Server(app);
let chat = io(server);

app.use(express.static('build'));
app.use(express.static('css'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

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
