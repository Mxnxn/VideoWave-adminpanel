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
import CustomeTextField from "../../Dashboard/components/CustomeTextFIeld";

const AddAdminModal = ({ onCancelHandler, modal, submitHandler, error, state, onChangeValue }) => {
	return (
		<Dialog fullWidth maxWidth="xs" open={modal} component="form">
			<AppBar position="static" className="bg-dark">
				<Toolbar className="flex  w-full">
					<Typography variant="subtitle1" color="inherit">
						Add New
					</Typography>
					<IconButton onClick={onCancelHandler} className="ml-auto text-white">
						<CloseRounded />
					</IconButton>
				</Toolbar>
			</AppBar>
			<DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
				{error.email || error.password || error.name || error.phone ? (
					<div className="alert alert-danger rounded">
						{error.email || error.password || error.name || error.number}
					</div>
				) : null}
				<div className="col-sm-12">
					<div className="row mt-4">
						<div className="col-sm-12 p-0">
							<CustomeTextField
								error={error.name}
								label="Name"
								type="text"
								keyName="name"
								value={state.name}
								onValueChange={onChangeValue}
							/>
						</div>
					</div>

					<div className="row mt-4">
						<div className="col-sm-12 p-0">
							<CustomeTextField
								label="Email"
								error={error.email}
								type="email"
								keyName="email"
								value={state.email}
								onValueChange={onChangeValue}
							/>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-sm-12 p-0">
							<CustomeTextField
								label="Phone Number"
								type="number"
								error={error.phone}
								keyName="phone"
								value={state.phone}
								onValueChange={onChangeValue}
							/>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-sm-12 p-0">
							<CustomeTextField
								label="Password"
								type="password"
								error={error.password}
								keyName="password"
								value={state.password}
								onValueChange={onChangeValue}
							/>
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
						background: "#482ff7",
						outline: "none",
						borderRadius: 10,
						textTransform: "none",
					}}
				>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddAdminModal;
