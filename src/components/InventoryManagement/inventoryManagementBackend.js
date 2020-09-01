const axios = require("axios");
const HEADER = {
	headers: {
		Authorization: "Bearer " + window.localStorage.getItem("session_token"),
	},
};

class InventoryManagementBackend {
	getTags() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/tags?show_id=true`,
					HEADER
				);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}

	setTag(formData) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(
					`${process.env.REACT_APP_API_URL}/tags`,
					formData,
					HEADER
				);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				reject(error.response);
			}
		});
	}

	updateTag(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(
					`${process.env.REACT_APP_API_URL}/tags/${id}`,
					{},
					HEADER
				);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}

	deleteTag(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.delete(
					`${process.env.REACT_APP_API_URL}/tags/${id}`,
					HEADER
				);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				reject(error.response.data.message);
			}
		});
	}

	addItemsWithSerial(formData) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(
					`${process.env.REACT_APP_API_URL}/items`,
					formData,
					HEADER
				);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}

	updateItemsWithSerial(formData, id) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(
					`${process.env.REACT_APP_API_URL}/items/update/${id}`,
					formData,
					HEADER
				);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}

	deleteEntireItem(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.delete(
					`${process.env.REACT_APP_API_URL}/items/${id}`,
					HEADER
				);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}
}

export let inventoryManagementBackend = new InventoryManagementBackend();
