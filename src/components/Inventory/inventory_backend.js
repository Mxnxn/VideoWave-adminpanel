import axios from "axios";

class Inventory {
	getAllInventory(stoken) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${process.env.REACT_APP_API_URL}/items`, {
					headers: {
						Authorization: "Bearer " + stoken,
					},
				});
				if (res.data.code !== 200) throw res.data;
				resolve(res.data.data);
			} catch (error) {
				reject(error);
			}
		});
	}

	getAllAvailableInventory(formData, stoken) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(
					`${process.env.REACT_APP_API_URL}/items?show=available`,
					formData,
					{
						headers: {
							Authorization: "Bearer " + stoken,
						},
					}
				);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data.data);
			} catch (error) {
				reject(error);
			}
		});
	}

	getInventoryDetail(id, stoken) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(
					`${process.env.REACT_APP_API_URL}/items/${id}`,
					{},
					{
						headers: {
							Authorization: "Bearer " + stoken,
						},
					}
				);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data.data);
			} catch (error) {
				reject(error);
			}
		});
	}
}

export let inventoryBackend = new Inventory();
