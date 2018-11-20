import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import AppStore from './Store'
import { pages } from './SiteBuilder'
const routeComponents = pages.map(({ path, component }, key) => <Route exact path={path} component={component} key={key} />);

import Menu from './components/includes/Menu'

ReactDom.render(
	<Provider store={AppStore} >
		<Menu />
	</Provider>
	,
	document.getElementById("menuContainer")
);

ReactDom.render(
	<Provider store={AppStore} >
		<Router>
			<Switch>
				{routeComponents}
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("appContainer")
);
