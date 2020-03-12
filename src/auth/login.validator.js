import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
	email: Yup.string()
		.email('Please enter a valid email.')
		.required('Email is required'),
	password: Yup.string()
		.required('Please enter a password.')
});
