import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './container/home';
import Err from './container/error';
import './App.css';

class App extends Component {
	

	render() {
		return(
			<div>
				<BrowserRouter>
					<Switch>
						<Route path='/' component={Home} exact/>
						<Route component={Err}/>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
