import React, { useState, useEffect } from "react";
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
	  FormControlLabel,
	  Switch,
} from "@material-ui/core";
import AlertDanger from "../../Utils/AlertDanger";
import { CloseRounded } from "@material-ui/icons";
import { inventoryManagementBackend } from "../../InventoryManagement/inventoryManagementBackend";

const EditSerial = ({ modal, onCancelHandler, preData }) => {
	  const initErrors = {
			total_quantity: false,
			available_quantity: false,
			lost_quantity: false,
	  };



	//   const [loading, setloading] = useState(true);

	  const [state, setState] = useState({
			total_quantity: 0,
			available_quantity:0, 
			lost_quantity: 0,
			is_available:  true,
			is_lost: false ,
			notes: "",
			error: initErrors,
	  });

	  useEffect(()=>{
		if(Object.keys(preData).length > 0){
			setState({
				...state,
				available_quantity:preData.available_quantity,
				total_quantity:preData.total_quantity,
				is_lost:preData.is_lost !== 0 ? true : false,
				is_available:preData.is_lost === 0 ? true : false,
				notes: preData.notes ? preData.notes : ""
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  },[preData])


	  const submitHandler = async () => {
			try{
				const formData = new FormData();
				formData.set("total_quantity",state.total_quantity)
				formData.set("available_quantity",state.available_quantity)
				formData.set("lost_quantity",state.lost_quantity)
				formData.set("is_available",state.is_available)
				formData.set("is_lost",state.is_lost)
				if(state.notes)
					formData.set("notes",state.notes)
				const res = await inventoryManagementBackend.updateSerialData(formData,preData.id);
				console.log(res.data);
			}catch(error){
				console.log(error);
			}
	  };

	  return  (
			<Dialog fullWidth maxWidth="xs" open={modal} component="form">
				  <AppBar position="static" className="bg-dark">
						<Toolbar className="flex  w-full">
							  <Typography variant="subtitle1" color="inherit">
									Edit Serial
							  </Typography>
							  <IconButton onClick={onCancelHandler} className="ml-auto text-white">
									<CloseRounded />
							  </IconButton>
						</Toolbar>
				  </AppBar>
				  <DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
						<div className="d-flex">
							  <div className="col-sm-12 p-0" style={{ borderRight: "1px solid #f5f5f5" }}>
									<AlertDanger error={state.error.total_quantity} />
									<AlertDanger error={state.error.available_quantity} />
									<AlertDanger error={state.error.lost_quantity} />
									<div className="row  mr-3">
										  <div className="col-sm-12 col-xl-12">
												<span className="geb fs-20">Quantities</span>
										  </div>
									</div>
									<div className="row mt-4 ">
										  <div className="col-sm-12">
												<TextField
														type="number"
													  error={state.error.total_quantity}
													  label="Total"
													  value={state.total_quantity}
													  variant="outlined"
													  fullWidth
													  onChange={(evt) => {
															if (evt.target.value < 0) {
																  let newError = state.error;
																  newError.total_quantity = "Quantity can't be less than zero!";
																  return setState({ ...state, error: newError });
															}
															setState({
																  ...state,
																  total_quantity: evt.target.value,
																  error: initErrors,
															});
													  }}
												/>
										  </div>
										  <div className="col-sm-12 mt-3">
												<TextField
													  type="number"
													  error={state.error.available_quantity}
													  label="Available"
													  value={state.available_quantity}
													  variant="outlined"
													  fullWidth
													  onChange={(evt) => {
															if (evt.target.value < 0) {
																  let newError = state.error;
																  newError.available_quantity = "Quantity can't be less than zero!";
																  return setState({ ...state, error: newError });
															}
															setState({
																  ...state,
																  available_quantity: evt.target.value,
																  lost_quantity: state.available_quantity - evt.target.value,
																  error: initErrors,
															});
													  }}
												/>
										  </div>
										  <div className="col-sm-12 mt-3">
												<TextField
													  type="number"
													  error={state.error.lost_quantity}
													  label="Lost"
													  value={state.lost_quantity}
													  variant="outlined"
													  fullWidth
													  onChange={(evt) => {
															if (evt.target.value < 0) {
																  let newError = state.error;
																  newError.total_quantity = "Quantity can't be less than zero!";
																  return setState({ ...state, error: newError });
															}
															setState({
																  ...state,
																  lost_quantity: evt.target.value,
																  available_quantity: state.total_quantity - evt.target.value,
																  total_quantity: Number(state.available_quantity) + Number(evt.target.value),
															});
													  }}
												/>
										  </div>
									</div>
									<div className="row mt-3 mr-3">
										  <div className="col-sm-12 col-xl-12">
												<span className="geb fs-20">Actions</span>
										  </div>
									</div>
									<div className="row mt-2 ">
										<div className="col-sm-12">
											<FormControlLabel
												className="d-flex w-100 m-0 fira"
												control={<Switch
															color="primary"
															className={"ml-auto"}
															value={state.is_lost}
															checked={state.is_lost}
															onChange={(e) => {
																	console.log("Inner");
																	setState({
																		...state,
																		is_lost: !state.is_lost,
																		is_available: !!state.is_lost,
																	});
												}}/>}
												label="Has this item lost?"
												labelPlacement="start"
											/>
										</div>
									</div>
									<div className="row mt-3 mr-3">
										<div className="col-sm-12 col-xl-12">
											<span className="geb fs-20">Optional</span>
										</div>
									</div>
									<div className="row mt-3 mb-3">
										<div className="col-sm-12 ">
											<TextField
													type="text"
													label="Notes"
													value={state.notes}
													variant="outlined"
													fullWidth
													onChange={(evt) => {
														setState({
																...state,
																notes: evt.target.value,
														});
													}}
											/>
										</div>
									</div>
							  </div>
						</div>
				  </DialogContent>
				  <DialogActions>
						<Button
							  onClick={submitHandler}
							  className="h-60 m-2 rounded text-white shadow-1"
							  varient="cotained"
							  style={{ background: "#04a9f5", outline: "none", borderRadius: 10 }}
						>
							  Save
						</Button>
				  </DialogActions>
			</Dialog>
	  )
};

export default EditSerial;
