import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Formik } from "formik";

import Alert from "@material-ui/lab/Alert";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import authenticationService from "../_services/authentication.service";
import { loginValidation } from "./login.validator";
import LoginForm from "./LoginForm";

const getLoginErrorMessage = (code) => {
	switch (code) {
		case '401':
			return 'Email and password do not match our records.';
		case '500':
			return 'Server Error, please contact support';
		default:
			return 'Something went wrong when logging in.';
	}
};

const LoginPage = () => {
	const history = useHistory();
	const [loginFailed, setLoginFailed] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const onSubmit = async (values, { setSubmitting }) => {
		try {
			await authenticationService.login(values.email, values.password);
			history.push('/staging');
		} catch (e) {
			setErrorMessage(getLoginErrorMessage(e.status.toString()));
			setLoginFailed(true);
		}
		setSubmitting(false);
	};

	const initialValues = { email: '', password: '' };

	return (
		<div>
			<Grid style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
				  container
				  spacing={3}
				  direction="row"
				  justify="center"
				  alignItems="center">
				<Grid item xs={8}>
					<Card>
						<CardContent style={{ padding: '4rem', paddingTop: '0' }}>
							<h1>Login</h1>
							{loginFailed && <div>
								<Alert severity="error">{errorMessage}</Alert>
							</div>}
							<Formik
								initialValues={initialValues}
								validationSchema={loginValidation}
								onSubmit={onSubmit}
							>
								{props => <LoginForm {...props} />}
							</Formik>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default LoginPage;
