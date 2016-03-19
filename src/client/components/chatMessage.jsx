import React from 'react';
import socket from '../socketClient';

export default class ChatMessage extends React.Component {

  constructor (props) {
    super(props);

    this.getBodyClass = this.getBodyClass.bind(this);
  }

  getBodyClass () {
    let bodyClass = 'message ';

    return (this.props.user == socket.id)
      ? bodyClass + 'message-myself'
      : bodyClass + 'message-other';
  }

  render () {
    let styles = {
      backgroundImage: 'url(' + this.props.avatar + ')',
    }

    return (
      <div className={ this.getBodyClass() }>
        <span className="avatar" style={ styles }></span>
        <p className="text">
          { this.props.text }
        </p>
      </div>
    )
  }

}
