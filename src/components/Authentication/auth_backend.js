const axios = require("axios");

class AuthBackend {
	loginWithEmailAndPassword(formData) {
		return new Promise((resolve, reject) => {
			axios
				.post(`${process.env.REACT_APP_API_URL}/user/login`, formData)
				.then((res) => {
					if (res.data.code !== 200) throw res.data;
					resolve(res.data);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	registerWithEmailAndPassword(formData) {
		return new Promise((resolve, reject) => {
			axios
				.post(`${process.env.REACT_APP_API_URL}/user/register`, formData)
				.then((res) => {
					if (res.data.code !== 200) throw res.data;
					resolve(res.data);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}

export let authBackend = new AuthBackend();
