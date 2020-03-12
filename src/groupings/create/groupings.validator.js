import * as Yup from "yup";

export const groupingValidator = Yup.object().shape({
	name: Yup.string()
		.required('Please enter a name.'),
	key: Yup.string()
		.required('Please enter a key.')
});
