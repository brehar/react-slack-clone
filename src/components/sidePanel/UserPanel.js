import React, { Component } from 'react';

import { Dropdown, Grid, Header, Icon, Image } from 'semantic-ui-react';

import firebase from '../../firebase';

class UserPanel extends Component {
	state = {
		user: this.props.currentUser
	};

	dropdownOptions = () => [
		{
			key: 'user',
			text: this.state.user && (
				<span>
					Signed in as <strong>{this.state.user.displayName}</strong>
				</span>
			),
			disabled: true
		},
		{
			key: 'avatar',
			text: <span>Change Avatar</span>
		},
		{
			key: 'signout',
			text: <span onClick={this.handleSignOut}>Sign Out</span>
		}
	];

	handleSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {});
	};

	render() {
		const { user } = this.state;

		return (
			<Grid style={{ background: '#4c3c4c' }}>
				<Grid.Column>
					<Grid.Row style={{ padding: '1.2em', margin: 0 }}>
						<Header inverted floated="left" as="h2">
							<Icon name="code" />
							<Header.Content>DevChat</Header.Content>
						</Header>
						<Header style={{ padding: '0.25em' }} as="h4" inverted>
							<Dropdown
								trigger={
									<span>
										{user && <Image src={user.photoURL} spaced="right" avatar />}
										{user && user.displayName}
									</span>
								}
								options={this.dropdownOptions()}
							/>
						</Header>
					</Grid.Row>
				</Grid.Column>
			</Grid>
		);
	}
}

export default UserPanel;
