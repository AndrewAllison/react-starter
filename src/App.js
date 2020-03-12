import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from "react-router-dom";

import { Toolbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import AppBar from "@material-ui/core/AppBar";

import authenticationService from "./_services/authentication.service";

import './index.css';
import LoginPage from "./auth/LoginPage";
import LoadingPage from "./_helpers/LoadingPage";
import GroupingsListPage from "./groupings/list/GroupingsListPage";

const dotenv = require('dotenv');
dotenv.config();

function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		authenticationService.currentUser
			.subscribe((userDetails) => {
				setCurrentUser(userDetails);
				// bit of a meadness. We use this to allow the router time not to hit the redirect to login every time.
				setTimeout(() => setLoading(false), 400);
			});
	}, []);

	const doLogout = () => {
		authenticationService.logOut();
	};

	return (
		<Router>
			{loading &&
			<LoadingPage/>
			}
			{!loading &&
			<div>
				{currentUser &&
				<div>
					<AppBar position="static">
						<Toolbar className="appBar-topNav">
							<Button>
								<Link to="/">Home</Link>
							</Button>
							<Button>
								<Link to="/groupings">Groupings</Link>
							</Button>
							<div className="spacer">&nbsp;</div>
							<Button color="inherit" onClick={doLogout}>Logout</Button>
						</Toolbar>
					</AppBar>
					<Switch>
						<Route exact path="/groupings">
							<GroupingsListPage/>
						</Route>
						{/*<Route exact path="/charities/id/:id">*/}
						{/*	<CharitiesDetailsPage />*/}
						{/*</Route>*/}
					</Switch>
				</div>
				}
				{!currentUser &&
				<div>
					<Redirect
						to={{
							pathname: "/login",
							state: { from: 'location' }
						}}
					/>
					<Switch>
						<Route path="/login">
							<LoginPage/>
						</Route>
					</Switch>
				</div>
				}
			</div>
			}
		</Router>
	);
}

export default App;
