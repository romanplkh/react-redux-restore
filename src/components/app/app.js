import React from 'react';
import './app.css';
import { withBookstoreService } from '../hoc';
import { Route, Switch } from 'react-router-dom';
import { HomePage, CartPage } from '../pages';
import ShopHeader from '../shop-header';

const App = ({ bookstoreService }) => {
	return (
		<div className="container" role="main">
			<ShopHeader numItems={5} total={220} />
			<Switch>
				<Route path="/" component={HomePage} exact />
				<Route path="/cart" component={CartPage} />
			</Switch>
		</div>
	);
};

export default withBookstoreService()(App);
