import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Form, Icon, Input, Menu, Modal } from 'semantic-ui-react';

import firebase from '../../firebase';

import { setCurrentChannel } from '../../actions';

class Channels extends Component {
	state = {
		user: this.props.currentUser,
		channels: [],
		activeChannel: '',
		channelName: '',
		channelDetails: '',
		channelsRef: firebase.database().ref('channels'),
		modal: false,
		firstLoad: true
	};

	componentDidMount() {
		this.addListeners();
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	addListeners = () => {
		let loadedChannels = [];

		this.state.channelsRef.on('child_added', snap => {
			loadedChannels.push(snap.val());
			this.setState(
				{
					channels: loadedChannels
				},
				() => {
					this.setFirstChannel();
				}
			);
		});
	};

	removeListeners = () => {
		this.state.channelsRef.off();
	};

	setFirstChannel = () => {
		const { channels } = this.state;

		if (this.state.firstLoad && channels.length > 0) {
			const firstChannel = channels[Math.floor(Math.random() * channels.length)];

			this.setActiveChannel(firstChannel);
			this.props.setCurrentChannel(firstChannel);
		}

		this.setState({
			firstLoad: false
		});
	};

	setActiveChannel = channel => {
		this.setState({
			activeChannel: channel.id
		});
	};

	displayChannels = channels => {
		return channels.map(channel => (
			<Menu.Item
				key={channel.id}
				onClick={() => {
					this.changeChannel(channel);
				}}
				name={channel.name}
				style={{ opacity: 0.7 }}
				active={channel.id === this.state.activeChannel}
			>
				# {channel.name}
			</Menu.Item>
		));
	};

	openModal = () => {
		this.setState({
			modal: true
		});
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	closeModal = () => {
		this.setState({
			modal: false
		});
	};

	isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails;

	handleSubmit = event => {
		event.preventDefault();

		if (this.isFormValid(this.state)) {
			this.addChannel(this.state);
		}
	};

	addChannel = () => {
		const { channelsRef, channelName, channelDetails, user } = this.state;
		const key = channelsRef.push().key;
		const newChannel = {
			id: key,
			name: channelName,
			details: channelDetails,
			createdBy: {
				name: user.displayName,
				avatar: user.photoURL
			}
		};

		channelsRef
			.child(key)
			.update(newChannel)
			.then(() => {
				this.setState({
					channelName: '',
					channelDetails: ''
				});
				this.closeModal();
			})
			.catch(err => {
				console.error(err);
			});
	};

	changeChannel = channel => {
		this.setActiveChannel(channel);
		this.props.setCurrentChannel(channel);
	};

	render() {
		const { channels, modal } = this.state;

		return (
			<React.Fragment>
				<Menu.Menu style={{ paddingBottom: '2em' }}>
					<Menu.Item>
						<span>
							<Icon name="exchange" /> CHANNELS
						</span>
						{'  '}({channels.length}) <Icon name="add" onClick={this.openModal} />
					</Menu.Item>
					{channels.length > 0 && this.displayChannels(channels)}
				</Menu.Menu>
				<Modal basic open={modal} onClose={this.closeModal}>
					<Modal.Header>Add a Channel</Modal.Header>
					<Modal.Content>
						<Form onSubmit={this.handleSubmit}>
							<Form.Field>
								<Input fluid label="Name of Channel" name="channelName" onChange={this.handleChange} />
							</Form.Field>
							<Form.Field>
								<Input
									fluid
									label="About the Channel"
									name="channelDetails"
									onChange={this.handleChange}
								/>
							</Form.Field>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button color="green" inverted onClick={this.handleSubmit}>
							<Icon name="checkmark" /> Add
						</Button>
						<Button color="red" inverted onClick={this.closeModal}>
							<Icon name="remove" /> Cancel
						</Button>
					</Modal.Actions>
				</Modal>
			</React.Fragment>
		);
	}
}

export default connect(
	null,
	{ setCurrentChannel }
)(Channels);