import axios from "axios";
const HEADER = {
	headers: {
		Authorization: "Bearer " + window.localStorage.getItem("session_token"),
	},
};

class PanelManagement {


    getAllMaintenanceCabinets(){
        return new Promise(async (resolve,reject)=>{
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/ledCabinets?show=in_maintenance`,HEADER);
                if(res.data.code !== 200) throw res;
                resolve(res.data)
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteCabinet(serial){
        return new Promise(async (resolve,reject)=>{
            try {
                const res = await axios.delete(`${process.env.REACT_APP_API_URL}/ledCabinets/${serial}`,HEADER);
                if(res.data.code !== 200) throw res;
                resolve(res.data)
            } catch (error) {
                reject(error);
            }
        })
        
    }

    addCabinetToMaintenance(serial){
        return new Promise(async (resolve,reject)=>{
            try {
                const formData = new FormData();
                formData.set("in_maintenance",1);
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/ledCabinets/update/${serial}`,formData,HEADER);
                if(res.data.code !== 200) throw res;
                resolve(res.data)
            } catch (error) {
                reject(error);
            }
        })
    }

    removeCabinetFromMaintenance(serial){
        return new Promise(async (resolve,reject)=>{
            try {
                const formData = new FormData();
                formData.set("in_maintenance",0);
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/ledCabinets/update/${serial}`,formData,HEADER);
                if(res.data.code !== 200) throw res;
                resolve(res.data)
            } catch (error) {
                reject(error);
            }
        })
    }

}

export let panelManagementbackend = new PanelManagement();