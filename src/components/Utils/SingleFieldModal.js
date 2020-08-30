import React from "react";
import { DialogActions,Button,AppBar, Toolbar, Typography, IconButton, Dialog, DialogContent, TextField } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";
import AlertDanger from "./AlertDanger";

const AddModal = ({onCancelHandler,modal,error,title,value,setValue,submitHandler}) => {
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
                                        <TextField
                                            label={"New Name"}
                                            className={`mb-16 `}
                                            variant="outlined"
                                            fullWidth
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
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