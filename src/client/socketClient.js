import Socket from 'socket.io-client';

let socket = Socket();

socket.on('chat email', avatar => {
  socket.user.avatar = avatar;
});

socket.user = {
  email: '',
  avatar: ''
}

export default socket;
