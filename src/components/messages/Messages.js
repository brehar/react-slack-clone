import React, { Component } from 'react';

import { Comment, Segment } from 'semantic-ui-react';

import firebase from '../../firebase';

import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';

class Messages extends Component {
	state = {
		//
	};

	render() {
		return (
			<React.Fragment>
				<MessagesHeader />
				<Segment>
					<Comment.Group className="messages">{/* TODO: Display Messages */}</Comment.Group>
				</Segment>
				<MessageForm />
			</React.Fragment>
		);
	}
}

export default Messages;
