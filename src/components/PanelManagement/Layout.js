import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import PaceLoader from "../Utils/PaceLoader";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Toolbar,
    Paper,
    Tooltip,
    DialogActions,
	Button,
	AppBar,
	Typography,
	IconButton,
	Dialog,
	DialogContent,
	TextField,
} from "@material-ui/core";
import { DeleteRounded, CloseRounded, } from "@material-ui/icons";
import Header from "../AdminLayout/components/Header";
import { PlusCircle } from "react-feather";
import { panelManagementbackend } from "./panelManagementBackend";
const Layout = (props) => {

    const [progress] = useState({ count: 0, view: false });

    const [modal, setModal] = useState({
        addItemToMaintenance: false,
        delete: false,
        removeFromMaintenance: false
    })

    const [state,setState] = useState({
        modalInput:"",
        allCabinets:[],
        error:false
    })

    const initModalState = {
        addItemToMaintenance: false,
        delete: false,
        removeFromMaintenance: false
    }

    const modalOpener = (whichToToggle) => {
        setModal(prev => { return { ...initModalState, [whichToToggle]: !prev[whichToToggle] } })
    }

    const deleteCabinetListener = async () => {
        if(!state.modalInput){
            return setState({...state,error:"Field can't be empty"});
        }
        try {
            await panelManagementbackend.deleteCabinet(state.modalInput);
            window.location.reload();
        } catch (error) {
            alert(error.response.data.message);
            setModal({...initModalState});
            setState({...state,modalInput:""})
        }
    }

    const addToMaintenanceCabinet = async () => {
        if(!state.modalInput){
            return setState({...state,error:"Field can't be empty"});
        }
        try {
            await panelManagementbackend.addCabinetToMaintenance(state.modalInput);
            window.location.reload();
        } catch (error) {
            alert(error.response.data.message);
            setModal({...initModalState});
            setState({...state,modalInput:""})
        }
    }
    
    const [loading,setLoading] = useState(false);

    const getAllCabinets = useCallback(async ()=>{
        try {
            const res = await panelManagementbackend.getAllMaintenanceCabinets();
            setState(prev=> {return {...prev,allCabinets:res.data}});
            setLoading(true);
        } catch (error) {
            // alert(error.response.data.message);
            setModal({...initModalState});
            setState(prev=>{return {...prev,modalInput:"",allCabinets:[]}})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        getAllCabinets();
    },[getAllCabinets]);

    const removeFromMaintenance = async (serial) => {
        try {
            await panelManagementbackend.removeCabinetFromMaintenance(serial);
            window.location.reload();
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return loading && (<>
        <PaceLoader progress={progress.count} view={progress.view} />
        <div className="fullscreen">
            <Navbar />
            <Header heading={"Management"} />
            <div className="pcoded-main-container">
                <div className="pcoded-wrapper ">
                    <div className="pcoded-content pt-0">
                        <div className="pcoded-inner-content">
                            <div className="main-body ">
                                <div className="row">
                                    <div className="col-xl-8 col-sm-12 py-4">
                                        <Paper elevation={1}>
                                            <Toolbar>
                                                <span id="tableTitle" component="div" className="geb fs-24">Maintenance</span>
                                                <Tooltip title="Add a led cabinet to maintenance">
                                                    <IconButton
                                                        className="text-primary"
                                                        onClick={evt=>modalOpener("addItemToMaintenance")}
                                                    >
                                                        <PlusCircle />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Add a led cabinet to maintenance" className="ml-auto">
                                                    <IconButton
                                                        className="text-danger"
                                                    >
                                                        <DeleteRounded onClick={evt=>modalOpener("delete")}/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Toolbar>
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell className="nn fs-18" align="center">
                                                            Id
                                                        </TableCell>
                                                        <TableCell className="nn fs-18" align="center">
                                                            Name
						                                </TableCell>
                                                        <TableCell className="nn fs-18" align="center">
                                                            Serial number
						                                </TableCell>
                                                        <TableCell className="nn fs-18" align="center">
                                                            Action
						                                </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {state.allCabinets.map((el,index)=> <TableRow hover key={el.id}>
                                                        <TableCell align="center" component="th" scope="row" className="pp-600" style={{ fontSize: 14 }}>
                                                            {el.id}
                                                        </TableCell>
                                                        <TableCell align="center" className="pp-600" style={{ fontSize: 14 }}>
                                                            {el.item_name}
                                                        </TableCell>
                                                        <TableCell align="center" className="pp-600" style={{ fontSize: 14 }}>
                                                            {el.serial_number}
                                                        </TableCell>
                                                        <TableCell align="center" className="pp-600 fs-20">
                                                            <IconButton
                                                                className="text-danger"
                                                            >
                                                                <DeleteRounded onClick={evt=>removeFromMaintenance(el.serial_number)}/>
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>)}
                                                </TableBody>
                                            </Table>
                                        </Paper>
                                    </div>
                                    <div className="col-xl-4 col-sm-12 py-4">

                                    </div>
                                </div>
                                <Dialog fullWidth maxWidth="xs" open={modal.delete} component="form">
                                <AppBar position="static" className="bg-dark">
                                    <Toolbar className="flex  w-full">
                                        <Typography variant="subtitle1" color="inherit">
                                            Delete Cabinet
                                        </Typography>
                                        <IconButton onClick={evt=>modalOpener("delete")} className="ml-auto text-white">
                                            <CloseRounded />
                                        </IconButton>
                                    </Toolbar>
                                </AppBar>
                                <DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
                                    <div className="d-flex">
                                        <div
                                            className="col-sm-12 p-0"
                                        >
                                            <div className="row  mr-3">
                                                <div className="col-sm-12 col-xl-12">
                                                    <span className="geb fs-20">Serial number</span>
                                                </div>
                                            </div>
                                            <div className="row mt-4 ">
                                                <div className="col-sm-12">
                                                    <TextField
                                                        type="text"
                                                        label="Serial"
                                                        variant="outlined"
                                                        fullWidth
                                                        error={state.error}
                                                        value={state.modalInput}
                                                        onChange={(evt) => {
                                                            setState({...state,error:false,modalInput:evt.target.value})
                                                        }}
                                                    />
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={deleteCabinetListener}
                                        className="h-60 m-2 rounded text-white shadow-1"
                                        varient="cotained"
                                        style={{ background: "#04a9f5", outline: "none", borderRadius: 10 }}
                                    >
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog fullWidth maxWidth="xs" open={modal.addItemToMaintenance} component="form">
                                <AppBar position="static" className="bg-dark">
                                    <Toolbar className="flex  w-full">
                                        <Typography variant="subtitle1" color="inherit">
                                            Add To Maintenance
                                        </Typography>
                                        <IconButton onClick={evt=>modalOpener("addItemToMaintenance")} className="ml-auto text-white">
                                            <CloseRounded />
                                        </IconButton>
                                    </Toolbar>
                                </AppBar>
                                <DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
                                    <div className="d-flex">
                                        <div
                                            className="col-sm-12 p-0"
                                        >
                                            <div className="row  mr-3">
                                                <div className="col-sm-12 col-xl-12">
                                                    <span className="geb fs-20">Serial number</span>
                                                </div>
                                            </div>
                                            <div className="row mt-4 ">
                                                <div className="col-sm-12">
                                                    <TextField
                                                        type="text"
                                                        label="Serial"
                                                        variant="outlined"
                                                        fullWidth
                                                        error={state.error}
                                                        value={state.modalInput}
                                                        onChange={(evt) => {
                                                            setState({...state,error:false,modalInput:evt.target.value})
                                                        }}
                                                    />
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={addToMaintenanceCabinet}
                                        className="h-60 m-2 rounded text-white shadow-1"
                                        varient="cotained"
                                        style={{ background: "#04a9f5", outline: "none", borderRadius: 10 }}
                                    >
                                        Done
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Layout;
