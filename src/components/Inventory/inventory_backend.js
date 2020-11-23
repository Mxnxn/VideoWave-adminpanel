import axios from "axios";

const onUnauthentication = () => {
	window.localStorage.removeItem("session_token");
	window.localStorage.removeItem("nu");
	window.location.reload();
}

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
				if(error.response)	
					if(error.response.data.code === 401){
						onUnauthentication();
					}
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
				if(error.response)	
					if(error.response.data.code === 401){
						onUnauthentication();
					}
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
				if(error.response)	
					if(error.response.data.code === 401){
						onUnauthentication();
					}
			}
		});
	}

	
}

export let inventoryBackend = new Inventory();
