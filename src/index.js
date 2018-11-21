import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';

import App from './components/App';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';

import firebase from './firebase';

class Root extends Component {
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.history.push('/');
			}
		});
	}

	render() {
		return (
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
			</Switch>
		);
	}
}

const RootWithAuth = withRouter(Root);

ReactDOM.render(
	<Router>
		<RootWithAuth />
	</Router>,
	document.getElementById('root')
);

registerServiceWorker();
