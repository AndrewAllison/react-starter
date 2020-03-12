import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Formik } from "formik";

import Alert from "@material-ui/lab/Alert";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { groupingValidator } from "./groupings.validator";
import groupingsApi from "../../_services/groupingsApi";
import CreateGroupingForm from "./CreateGroupingForm";

const mapErrorMessage = (code) => {
	switch (code) {
		case '401':
			return 'Email and password do not match our records.';
		case '500':
			return 'Server Error, please contact support';
		default:
			return 'Something went wrong when logging in.';
	}
};

const CreateGrouping = () => {
	const history = useHistory();
	const [createFailed, setCreateFailed] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const initialValues = { name: '', key: '' };

	const onSubmit = async (values, { setSubmitting }) => {
		try {
			await groupingsApi.create({ name: values.name, key: values.key });
			history.push('/groupings');
		} catch (e) {
			setErrorMessage(mapErrorMessage(e.status.toString()));
			setCreateFailed(true);
		}
		setSubmitting(false);
	};

	return (<div>
		<Grid style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
			  container
			  spacing={3}
			  direction="row"
			  justify="center"
			  alignItems="center">
			<Grid item xs={8}>
				<Card>
					<CardContent style={{ padding: '4rem', paddingTop: '0' }}>
						<h1>Group</h1>
						{createFailed && <div>
							<Alert severity="error">{errorMessage}</Alert>
						</div>}
						<Formik
							initialValues={initialValues}
							validationSchema={groupingValidator}
							onSubmit={onSubmit}
						>
							{props => <CreateGroupingForm {...props} />}
						</Formik>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	</div>);
};

export default CreateGrouping;
