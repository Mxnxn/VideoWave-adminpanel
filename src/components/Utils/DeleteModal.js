import React from "react";
import {
	DialogActions,
	Button,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Dialog,
	DialogContent,
} from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";
import AlertDanger from "./AlertDanger";

const AddModal = ({ onCancelHandler, modal, submitHandler, error }) => {
	return (
		<Dialog fullWidth maxWidth="sm" open={modal} component="form">
			<AppBar position="static" className="bg-dark">
				<Toolbar className="flex  w-full">
					<Typography variant="subtitle1" color="inherit">
						Delete
					</Typography>
					<IconButton onClick={onCancelHandler} className="ml-auto text-white">
						<CloseRounded />
					</IconButton>
				</Toolbar>
			</AppBar>
			<DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
				<div className="col-sm-12 ">
					<AlertDanger error={error} />
				</div>
				<div className="d-flex">
					<div
						className="col-sm-12 p-0"
						style={{ borderRight: "1px solid #f5f5f5" }}
					>
						<div className="row my-4">
							<div className="col-sm-12 col-xl-12">
								<span className="geb fs-20">Are you sure?</span>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={submitHandler}
					className="h-60 m-2 rounded text-white shadow"
					varient="cotained"
					style={{
						background: "#f44236",
						outline: "none",
						borderRadius: 10,
						textTransform: "none",
					}}
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddModal;
