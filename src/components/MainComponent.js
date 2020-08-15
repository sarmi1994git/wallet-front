import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Menu from './MenuComponent';
import Register from './RegisterComponent';

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<Switch>
				<Route exact path="/" component={Menu} />
				<Route exact path="/register" component={Register} />
			</Switch>
		);
	}
}

export default withRouter(Main);