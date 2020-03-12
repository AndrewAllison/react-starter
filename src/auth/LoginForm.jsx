import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";

const LoginForm = (props) => {
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
				error={errors.email && touched.email}
				label="Email"
				name="email"
				value={values.email}
				onChange={handleChange}
				onBlur={handleBlur}
				helperText={(errors.email && touched.email) && errors.email}
				margin="normal"
			/>
			<TextField
				fullWidth
				error={errors.password && touched.password}
				label="Password"
				name="password"
				value={values.password}
				onChange={handleChange}
				onBlur={handleBlur}
				helperText={(errors.password && touched.password) && errors.password}
				margin="normal"
				type="password"
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
		</form>
	)
};
export default LoginForm;
