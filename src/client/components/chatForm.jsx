import React from 'react';
import socket from './../socketClient';

export default class ChatForm extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      text: ''
    }

    // TODO: Look for ways to autobind
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextKeyDown = this.handleTextKeyDown.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    let text = this.state.text.trim();

    if (text) {
      this.props.handleChatSubmit({
        text: text,
        user: socket.id,
        avatar: socket.user.avatar
      });
    }

    this.setState({ text: '' });
  }

  handleTextChange (e) {
    this.setState({ text: e.target.value });
  }

  handleTextKeyDown (e) {
    if (e.keyCode === 13) {
      if (!e.shiftKey) {
        this.handleSubmit(e);
      }
    }
  }

  render () {
    return (
      <form className="chat-form" onSubmit={ this.handleSubmit }>
        <textarea
          className="chat-input"
          value={ this.state.text }
          onChange={ this.handleTextChange }
          onKeyDown={ this.handleTextKeyDown }/>
      </form>
    )
  }
}
