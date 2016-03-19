var React = require('react');
var ReactDOM = require('react-dom');
var socket = require('socket.io-client')();

user = {
  email: '',
  avatar: ''
}

socket.on('chat email', function (avatar) {
  user.avatar = avatar;
});

var ChatMessage = React.createClass({
  render: function () {
    var bodyClass = ['message'];
    if (this.props.user == socket.id) {
      bodyClass.push('message-myself');
    } else {
      bodyClass.push('message-other');
    }
    bodyClass = bodyClass.join(' ');

    var styles = {
      backgroundImage: 'url(' + this.props.avatar + ')',
    }

    return (
          <div className={ bodyClass }>
              <span className="avatar" style={ styles }></span>
              <p className="text">
                  { this.props.text }
              </p>
          </div>
    )
  }
});

ChatMessageList = React.createClass({
    componentDidUpdate: function () {
        var domElement = ReactDOM.findDOMNode(this);
        domElement.scrollTop = domElement.scrollHeight;
    },
    render: function () {
        var messages = this.props.messages.map(function (message) {
            return (
                <ChatMessage
                    user={ message.user }
                    text={ message.text }
                    avatar={ message.avatar }
                />
            )
        });
        return (
            <div className="list">
                { messages }
            </div>
        )
    }
});

ChatForm = React.createClass({
    getInitialState: function () {
        return { text: ''}
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var text = this.state.text.trim();

        if (text) {
            this.props.handleChatSubmit({
                text: text,
                user: socket.id,
                avatar: user.avatar
            });
        }

        this.setState({ text: '' });
    },
    handleTextChange: function (e) {
        this.setState({ text: e.target.value });
    },
    handleTextKeyDown: function (e) {
        if (e.keyCode === 13) {
            if (!e.shiftKey) {
                this.handleSubmit(e);
            }
        }
    },
    render: function () {
        return (
            <form className="chat-form" onSubmit={ this.handleSubmit }>
                <textarea
                    className="chat-input"
                    value={ this.state.text }
                    onChange={ this.handleTextChange }
                    onKeyDown={ this.handleTextKeyDown }
                />
            </form>
        )
    }
});

var ChatConfiguration = React.createClass({
    getInitialState: function () {
        return { email: 'hostsuarezpablo@gmail.com' };
    },
    handleSubmit: function (e) {
        e.preventDefault();
        user.email = this.state.email;
        socket.emit('chat email', { email: user.email });
    },
    handleTextChange: function (e) {
        this.setState({ email: e.target.value });
    },
    render: function () {
        return (
            <div className="chat-configuration">
                <form className="chat-configuration-form" onSubmit={ this.handleSubmit }>
                    <input
                        className="configuration-form-email"
                        placeholder="Enter your email.."
                        type="text"
                        value={ this.state.email }
                        onChange={ this.handleTextChange }
                        />
                    <button type="submit">save</button>
                </form>
            </div>
        )
    }
});

var ChatBox = React.createClass({
    getInitialState: function () {
        return {
            messages: [],
            user: {
                email: '',
                avatar: ''
            }
        };
    },
    componentDidMount: function () {
        socket.on('chat message', function (msg) {
            this.setState({
                messages: this.state.messages.concat(msg)
            });
        }.bind(this));
    },
    handleChatSubmit: function (msg) {
        socket.emit('chat message', msg);
    },
    render: function () {
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
});

ReactDOM.render(
  <ChatBox />,
  document.getElementById('chat-container')
);
