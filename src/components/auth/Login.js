import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';

import firebase from '../../firebase';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: [],
		loading: false
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	isFormValid = ({ email, password }) => email && password;

	handleSubmit = event => {
		event.preventDefault();

		if (this.isFormValid(this.state)) {
			this.setState({ errors: [], loading: true });

			firebase
				.auth()
				.signInWithEmailAndPassword(this.state.email, this.state.password)
				.then(signedInUser => {
					this.setState({ loading: false });
				})
				.catch(err => {
					this.setState({ errors: this.state.errors.concat(err), loading: false });
				});
		} else {
			const error = { message: 'All fields are required.' };

			this.setState({ errors: this.state.errors.concat(error) });
		}
	};

	handleInputError = (errors, inputName) => {
		return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
	};

	displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

	render() {
		const { email, password, errors, loading } = this.state;

		return (
			<Grid textAlign="center" verticalAlign="middle" className="app">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h1" icon color="violet" textAlign="center">
						<Icon name="code branch" color="violet" />
						Login to DevChat
					</Header>
					<Form onSubmit={this.handleSubmit} size="large">
						<Segment stacked>
							<Form.Input
								fluid
								name="email"
								icon="mail"
								iconPosition="left"
								placeholder="Email Address"
								onChange={this.handleChange}
								value={email}
								className={this.handleInputError(errors, 'email')}
								type="email"
							/>
							<Form.Input
								fluid
								name="password"
								icon="lock"
								iconPosition="left"
								placeholder="Password"
								onChange={this.handleChange}
								value={password}
								className={this.handleInputError(errors, 'password')}
								type="password"
							/>
							<Button
								disabled={loading}
								className={loading ? 'loading' : ''}
								color="violet"
								fluid
								size="large"
							>
								Login
							</Button>
						</Segment>
					</Form>
					{errors.length > 0 && (
						<Message error>
							<h3>Oops!</h3>
							{this.displayErrors(errors)}
						</Message>
					)}
					<Message>
						Don't have an account? <Link to="/register">Register here.</Link>
					</Message>
				</Grid.Column>
			</Grid>
		);
	}
}

export default Login;
