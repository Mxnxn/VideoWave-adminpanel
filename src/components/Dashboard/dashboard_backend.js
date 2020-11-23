import moment from "moment";
import axios from "axios";

const HEADERS = {
	headers: {
		Authorization: "Bearer " + window.localStorage.getItem("session_token"),
	},
};

const onUnauthentication = () => {
	window.localStorage.removeItem("session_token");
	window.localStorage.removeItem("nu");
	window.location.reload();
}

class DashboardBackend {
	getAllEvents(stoken) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${process.env.REACT_APP_API_URL}/events`, HEADERS)
				.then((res) => {
					if (res.data.code !== 200) throw res.data;
					let temp = [];
					res.data.data.forEach((el) => {
						temp.push({
							...el,
							start_date: moment(el.start_date).toDate(),
							end_date: moment(el.end_date).toDate(),
							reporting_date: moment(el.reporting_date).toDate(),
						});
					});
					resolve(temp);
				})
				.catch((err) => {
					if (err.code === 401) {
						reject(401);
					} else {
						reject(err.response);
					}
				});
		});
	}

	addNewEvent(formData, stoken) {
		return new Promise((resolve, reject) => {
			axios
				.post(`${process.env.REACT_APP_API_URL}/events`, formData, HEADERS)
				.then((res) => {
					resolve(res.data.data);
				})
				.catch((err) => {
					reject(err);
					if(err.response)	
						if(err.response.data.code === 401){
							onUnauthentication();
						}
				});
		});
	}

	editEvent(id, formData, stoken) {
		return new Promise((resolve, reject) => {
			axios
				.post(`${process.env.REACT_APP_API_URL}/events/update/${id}`, formData, HEADERS)
				.then((res) => {
					if (res.data.code !== 200) throw res.data;
					resolve(res.data.data);
				})
				.catch((err) => {
					reject(err);
					if(err.response)	
					if(err.response.data.code === 401){
						onUnauthentication();
					}
				});
		});
	}

	getAllItems(stoken) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${process.env.REACT_APP_API_URL}/items?available=true`, HEADERS);
				if (res) {
					if (res.data.code !== 200) throw res.data;
					resolve(res.data);
				}
			} catch (err) {
				reject(err);
				if(err.response)	
					if(err.response.data.code === 401){
						onUnauthentication();
					}
			}
		});
	}
	getEventRanged(stoken) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${process.env.REACT_APP_API_URL}/eventsInRange`, HEADERS)
				.then((res) => {
					if (res.data.code !== 200) throw res.data;
					let temp = [];
					res.data.data.forEach((el) => {
						temp.push({
							...el,
							start_date: moment(el.start_date).toDate(),
							end_date: moment(el.end_date).toDate(),
							reporting_date: moment(el.reporting_date).toDate(),
						});
					});
					resolve(temp);
				})
				.catch((err) => {
					if (err.code === 401) {
						reject(401);
					} else {
						reject(err.response);
					}
					if(err.response)	
						if(err.response.data.code === 401){
							onUnauthentication();
						}
				});
		});
	}

	getEndedEvents() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${process.env.REACT_APP_API_URL}/events?show=ended`, HEADERS);
				if (res) {
					if (res.data.code !== 200) throw res.data;
					resolve(res.data);
				}
			} catch (err) {
				reject(err);
				if(err.response)	
					if(err.response.data.code === 401){
						onUnauthentication();
					}
			}
		});
	}
}
export let dashboardBackend = new DashboardBackend();
