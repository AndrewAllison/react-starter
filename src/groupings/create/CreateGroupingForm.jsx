import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const CreateGroupingForm = (props) => {
	const {
		values,
		touched,
		errors,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
		isValid,
	} = props;

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				fullWidth
				error={errors.name && touched.name}
				label="Name"
				name="name"
				value={values.name}
				onChange={handleChange}
				onBlur={handleBlur}
				helperText={(errors.password && touched.password) && errors.password}
				margin="normal"
				type="text"
			/>
			<TextField
				fullWidth
				error={errors.key && touched.key}
				label="Key"
				name="key"
				value={values.key}
				onChange={handleChange}
				onBlur={handleBlur}
				helperText={(errors.key && touched.key) && errors.key}
				margin="normal"
			/>
			<Button
				color="primary"
				fullWidth
				disabled={isSubmitting || !isValid}
				variant="contained"
				type="submit">
				Submit
			</Button>
			{/*<DisplayPropsState {...props} />*/}
		</form>);
};

export default CreateGroupingForm;
