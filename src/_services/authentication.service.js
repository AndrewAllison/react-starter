import { BehaviorSubject } from 'rxjs';

const store = require('store');
const axios = require('axios').default;

const storedToken = store.get('fdy:access_token');
const storedUser = store.get('fdy:user');

const currentUserSubject = new BehaviorSubject(storedUser);
const currentTokenSubject = new BehaviorSubject(storedToken);

const baseUrl = process.env.REACT_APP_LOOKUP_API_URL;

const login = async (email, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url = baseUrl + '/api/auth/login';
			const params = {};
			const response = await axios.post(url, { email, password }, { params });

			store.set('fdy:access_token', response.data.access_token);
			store.set('fdy:user', response.data.profile);
			currentUserSubject.next(response.data.profile);
			currentTokenSubject.next(response.data.access_token);
			return resolve(response.data.profile);
		} catch (error) {
			console.log(error.response);
			return reject(error.response)
		}
	})
};

const logOut = () => {
	store.remove('fdy:user');
	store.remove('fdy:access_token');
	currentUserSubject.next(currentUserSubject);
	currentTokenSubject.next(currentTokenSubject);
};

const authenticationService = {
	login,
	storedUser,
	currentUser: currentUserSubject.asObservable(),
	logOut,
};

export default authenticationService;
