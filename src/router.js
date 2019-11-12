import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/dashboard" component={Dashboard} />
			</Switch>
		</BrowserRouter>
	)
}