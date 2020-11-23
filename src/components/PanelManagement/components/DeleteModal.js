import React from "react";

const DeleteModal = (props) => {
    return (
        <Dialog fullWidth maxWidth="xs" open={modal} component="form">
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
        </Dialog>
    )
}