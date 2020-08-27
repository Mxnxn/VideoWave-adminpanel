import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "./components/Header";
import ItemsCategories from "./components/ItemsCategories";
import ItemsTypes from "./components/ItemsTypes";
import ItemsClasses from "./components/ItemsClasses";
import { AppBar, Toolbar, Typography, IconButton, Dialog, DialogContent } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";
import AlertDanger from "../Utils/AlertDanger";
const InventoryManagement = (props) => {
	const items = [0,1,2,3,4,56,7,8,9,0,12,31,5415,151,6,1,12,31,3,1,14,16,16,161,61,61];

	const [error, setError] = useState(false);
	const [openAddModal, setOpenAddModal] = useState(false);
	return (
		<div className="fullscreen">
			<Navbar  />
            <Header heading={"Management"} setOpenAddModal={setOpenAddModal} />
			<div className="pcoded-main-container" style={{height:"100vh",minHeight:"100vh"}}>
				<div className="pcoded-wrapper" >
					<div className="pcoded-content">
						<div className="pcoded-inner-content">
							<div className="main-body">
								<div className="row fix-h-85">
									<div className="col-lg-4 h-100">
										<ItemsClasses items={items} />
									</div>
									<div className="col-lg-8 h-100   d-flex flex-column ">
										<ItemsCategories items={items}/>
										<ItemsTypes items={items}/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Dialog fullWidth maxWidth="sm" open={openAddModal} component="form">
					<AppBar position="static" className="bg-dark">
						<Toolbar className="flex  w-full">
							<Typography variant="subtitle1" color="inherit">
								Add Items
							</Typography>
							<IconButton className="ml-auto text-white">
								<CloseRounded/>
							</IconButton>
						</Toolbar>
					</AppBar>
					<DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
					<AlertDanger error={error} />
					<div className="d-flex flex-wrap">
						<div
							className="col-sm-4"
							style={{ borderRight: "1px solid #f5f5f5" }}
						>
							<div className="row">
								<div className="col-sm-12">
									<div className="row">
										<div className="col-sm-12">
											<Typography></Typography>
										</div>
									</div>
									</div></div></div></div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};

export default InventoryManagement;
