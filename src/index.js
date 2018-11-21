import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './components/App';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

const Root = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={App} />
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
		</Switch>
	</Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
