import React from "react";
import { DialogActions,Button,AppBar, Toolbar, Typography, IconButton, Dialog, DialogContent } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";
import AlertDanger from "../../Utils/AlertDanger";
import CustomeTextField from "../../Dashboard/components/CustomeTextFIeld";

const AddModal = ({onCancelHandler,modal,error,title,state,onValueChange,keyName,submitHandler}) => {
    return (
        <Dialog fullWidth maxWidth="sm" open={modal} component="form">
					<AppBar position="static" className="bg-dark">
						<Toolbar className="flex  w-full">
							<Typography variant="subtitle1" color="inherit">
								{title}
							</Typography>
							<IconButton onClick={onCancelHandler} className="ml-auto text-white">
								<CloseRounded />
							</IconButton>
						</Toolbar>
					</AppBar>
					<DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
						
						<div className="d-flex">
							<div
								className="col-sm-12 p-0"
								style={{ borderRight: "1px solid #f5f5f5" }}
							>
                                <div className="alert alert-info w-100 rounded mt-2">Note: Enter it Properly, it will be used later!</div>
                                <AlertDanger error={error} />
                                        <div className="row mt-1 mb-3 px-3">
                                            <CustomeTextField
                                                keyName={keyName}
                                                label={"Name"}
                                                value={state[keyName]}
                                                onValueChange={onValueChange}
                                            />
										</div>
							</div>
						</div>
					</DialogContent>
                    <DialogActions >
                        <Button onClick={submitHandler}  className="h-60 m-2 rounded text-white shadow-1" varient="cotained" style={{ background: "#04a9f5", outline: "none", borderRadius: 10 }} >Add</Button>
                    </DialogActions>
				</Dialog>
    )
}

export default AddModal;