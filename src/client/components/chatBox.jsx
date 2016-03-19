import React from 'react';
import ChatConfiguration from './chatConfiguration';
import ChatMessageList from './chatMessageList';
import ChatForm from './chatForm';
import socket from './../socketClient';

export default class ChatBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      messages: [],
      user: {
        email: '',
        avatar: ''
      }
    };

    this.handleChatSubmit = this.handleChatSubmit.bind(this);
  }

  componentDidMount () {
    socket.on('chat message', (msg) => {
      this.setState({
        messages: this.state.messages.concat(msg)
      });
    });
  }

  handleChatSubmit (msg) {
    socket.emit('chat message', msg);
  }

  render () {
    return (
      <div className="chat">
        <ChatConfiguration/>
        <div className="messages-container">
          <ChatMessageList messages={ this.state.messages } />
          <ChatForm handleChatSubmit={ this.handleChatSubmit } />
        </div>
      </div>
    )
  }
}
