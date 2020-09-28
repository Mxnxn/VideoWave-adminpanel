const axios = require("axios");
const HEADER = {
	headers: {
		Authorization: `Bearer ${window.localStorage.getItem("session_token")}`,
	},
};
class AdminBackend {
	getAdmins() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/index`, HEADER);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}
	deleteUser(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.delete(`${process.env.REACT_APP_API_URL}/user/delete/${id}`, HEADER);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}

	addNewAdmin(formData) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, formData, HEADER);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}

	addNewWarehouseUser(formData) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${process.env.REACT_APP_API_URL}/whuser/register`, formData, HEADER);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}

	getAppUsers() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${process.env.REACT_APP_API_URL}/whuser/index`, HEADER);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}
	deleteWhuser(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.delete(`${process.env.REACT_APP_API_URL}/whuser/delete/${id}`, HEADER);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}
}

export let adminBackend = new AdminBackend();
