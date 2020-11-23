import React, { useState} from "react";
import {
	DialogActions,
	Button,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Dialog,
	DialogContent,
	TextField,
} from "@material-ui/core";
import AlertDanger from "../../Utils/AlertDanger";
import { CloseRounded } from "@material-ui/icons";
import { inventoryManagementBackend } from "../../InventoryManagement/inventoryManagementBackend";

const StoreLedModal = ({modal,itemId,setModal} ) => {

    const [state,setState] = useState({values  : {
        totalQuality:0,
        baseSerial:""
    },error:""});

    const submitHandler = async () => {
        if(!state.values.totalQuality || !state.values.baseSerial){
            return setState({...state,error:"Fields can't be empty!"})
        }
        try {
            const formData = new FormData();
            formData.set("total_quantity",state.values.totalQuality);
            formData.set("base_serial",state.values.baseSerial);
            await inventoryManagementBackend.storeLedCabinet(itemId,formData);
            setModal(false);
        } catch (error) {
            setState({...state,error:error.response.data.message})
        }
    }

    return (<Dialog fullWidth maxWidth="xs" open={modal} component="form">
    <AppBar position="static" className="bg-dark">
        <Toolbar className="flex  w-full">
            <Typography variant="subtitle1" color="inherit">
                Edit Serial
            </Typography>
            <IconButton  className="ml-auto text-white">
                <CloseRounded onClick={(evt)=>{setModal(false)}}/>
            </IconButton>
        </Toolbar>
    </AppBar>
    <DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
        <div className="d-flex">
            <div
                className="col-sm-12 p-0"
                style={{ borderRight: "1px solid #f5f5f5" }}
            >
               
                <div className="row  mr-3">
                    <div className="col-sm-12 col-xl-12">
                        <span className="geb fs-20">Add New Led</span>
                    </div>
                </div>
                    <AlertDanger error={state.error} />
                <div className="row mt-4 ">
                    <div className="col-sm-12">
                        <TextField
                            type="string"
                            label="Serial Number"
                            variant="outlined"
                            fullWidth
                            value={state.values.baseSerial}
                            onChange={(evt) => {
                                setState({...state,error:false,values:{...state.values,baseSerial:evt.target.value}})
                            }}
                        />
                    </div>
                    <div className="col-sm-12 mt-3">
                        <TextField
                            type="number"
                            label="Total Quantity"
                            variant="outlined"
                            fullWidth
                            value={state.values.totalQuality}
                            onChange={(evt) => {
                                setState({...state,error:false,values:{...state.values,totalQuality:evt.target.value}})
                            }}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    </DialogContent>
    <DialogActions>
        <Button
            className="h-60 m-2 rounded text-white shadow-1"
            varient="cotained"
            style={{ background: "#04a9f5", outline: "none", borderRadius: 10 }}
            onClick={submitHandler}
        >
            Save
        </Button>
    </DialogActions>
</Dialog>)
}

export default StoreLedModal;