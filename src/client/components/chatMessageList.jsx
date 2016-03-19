import React from 'react';
import ReactDOM from 'react-dom';
import ChatMessage from './chatMessage';

export default class ChatMessageList extends React.Component {

  componentDidUpdate () {
    let domElement = ReactDOM.findDOMNode(this);
    domElement.scrollTop = domElement.scrollHeight;
  }

  render () {
    let messages = this.props.messages.map(message => {
      return (
        <ChatMessage
          user={ message.user }
          text={ message.text }
          avatar={ message.avatar }/>
      )
    });

    return ( <div className="list">{ messages }</div> );
  }
}
