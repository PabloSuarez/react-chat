import React from 'react';
import socket from './../socketClient';

export default class ChatConfiguration extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: 'hostsuarezpablo@gmail.com'
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    socket.user.email = this.state.email;
    socket.emit('chat email', { email: socket.user.email });
  }

  handleTextChange (e) {
    this.setState({ email: e.target.value });
  }

  render () {
    return (
      <div className="chat-configuration">
        <form className="chat-configuration-form" onSubmit={ this.handleSubmit }>
          <input
            className="configuration-form-email"
            placeholder="Enter your email.."
            type="text"
            value={ this.state.email }
            onChange={ this.handleTextChange }/>
          <button type="submit">save</button>
        </form>
      </div>
    )
  }
}
