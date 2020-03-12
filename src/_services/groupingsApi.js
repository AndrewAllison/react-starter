const axios = require('axios').default;

const get = (request) => {
	let url = process.env.REACT_APP_LOOKUP_API_URL + '/api/groupings';

	const { rowsPerPage, page, name } = request;
	const params = {
		pageSize: rowsPerPage,
		pageIndex: page,
		name,
	};

	return axios.get(url, { params })
		.then((response) => response.data);
};

const getById = (id) => {
	let url = process.env.REACT_APP_LOOKUP_API_URL + `/api/groupings/${id}`;
	return axios.get(url, {}).then(response => response.data);
};
const create = (details) => {
	let url = process.env.REACT_APP_LOOKUP_API_URL + `/api/groupings`;
	return axios.post(url, details).then(response => response.data);
};
const update = (id, details) => {
	let url = process.env.REACT_APP_LOOKUP_API_URL + `/api/master-records/id/${id}`;
	return axios.put(url, details).then(response => response.data);
};

const groupingsApi = {
	get,
	getById,
	create,
	update,
};

export default groupingsApi;
