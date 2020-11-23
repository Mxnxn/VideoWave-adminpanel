import React, { useEffect, useState } from "react";
import {  Dialog, DialogContent, IconButton, Typography, Toolbar, AppBar } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";

import moment from "moment";
import CustomeTextField from "../../Dashboard/components/CustomeTextFIeld";
import CustomeDateTimePicker from "../../Dashboard/components/CustomeDateTimePicker";

const DailogBox = ({ modal, onCancelHandler, event }) => {
	const [dynamicForm, setDynamicForm] = useState([]);
	useEffect(() => {
		const temp = event.items;
		setDynamicForm([...temp]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Dialog fullWidth maxWidth="md" open={modal} component="form">
			<AppBar position="static" className="bg-dark">
				<Toolbar className="flex  w-full">
					<Typography variant="subtitle1" color="inherit">
						Add Event
					</Typography>
					<IconButton className="ml-auto text-white" onClick={onCancelHandler}>
						<CloseRounded />
					</IconButton>
				</Toolbar>
			</AppBar>
			<DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
				<div className="d-flex flex-wrap">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-12">
								<Typography>Event Details</Typography>
							</div>
						</div>
						<div className="row ">
							<div className="mt-3 col-sm-4">
								<CustomeTextField keyName={"name"} label={"Event name"} value={event.name} onValueChange={() => {}} />
							</div>
							<div className="mt-3 col-sm-4">
								<CustomeDateTimePicker
									value={moment(event.start_date).toDate()}
									label="Start Date"
									setValue={() => {}}
								/>
							</div>
							<div className="mt-3 col-sm-4">
								<CustomeDateTimePicker label="End Date" value={moment(event.end_date).toDate()} setValue={() => {}} />
							</div>
						</div>
						<div className="row">
							<div className="col-sm-4">
								<CustomeDateTimePicker classes={"mt-4"} label="Reporting Date" setValue={() => {}} />
							</div>
							<div className="col-sm-4">
								<CustomeTextField
									label="Event location"
									classes="mt-4"
									keyName="location"
									value={event.location}
									onValueChange={() => {}}
								/>
							</div>
						</div>
						<div className="row mt-3">
							<div className="col-sm-12">
								<Typography>Client Details</Typography>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-4">
								<CustomeTextField
									label="Name"
									classes="mt-4"
									keyName="client_name"
									value={event.client_name}
									onValueChange={() => {}}
								/>
							</div>
							<div className="col-sm-4">
								<CustomeTextField
									type="number"
									label="Contact number"
									classes="mt-4"
									keyName="client_phone"
									value={event.client_phone}
									onValueChange={() => {}}
								/>
							</div>
							<div className="col-sm-4">
								<CustomeTextField
									label="Firm name"
									classes="mt-4"
									keyName="client_company"
									value={event.client_company}
									onValueChange={() => {}}
								/>
							</div>
						</div>
						<div className="row ">
							<div className="col-sm-4">
								<CustomeTextField
									label="Client email"
									classes="mt-4"
									keyName="client_email"
									value={event.client_email}
									onValueChange={() => {}}
								/>
							</div>
						</div>
						<div className="row mt-3">
							<div className="col-sm-12">
								<Typography>Employee Details</Typography>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-4">
								<CustomeTextField
									label="Technician Name"
									classes="mt-4"
									keyName="technician_name"
									value={event.technician_name}
									onValueChange={() => {}}
								/>
							</div>
							<div className="col-sm-4">
								<CustomeTextField
									label="Technician Contact"
									classes="mt-4"
									type="number"
									keyName="technician_phone"
									value={event.technician_phone}
									onValueChange={() => {}}
								/>
							</div>
							<div className="col-sm-4">
								<CustomeTextField
									label="Vehicle number"
									classes="mt-4"
									keyName="vehicle_number"
									value={event.vehicle_number}
									onValueChange={() => {}}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-4">
								<CustomeTextField
									label="Driver name"
									classes="mt-4"
									keyName="driver_name"
									value={event.driver_name}
									onValueChange={() => {}}
								/>
							</div>
							<div className="col-sm-4">
								<CustomeTextField
									label="Driver Contact Detail"
									classes="mt-4"
									type="number"
									keyName="driver_phone"
									value={event.driver_phone}
									onValueChange={() => {}}
								/>
							</div>
							<div className="col-sm-4">
								<CustomeTextField
									label="Challan or Invoice number"
									classes="mt-4"
									type="text"
									keyName="invoice_number"
									value={event.invoice_number}
									onValueChange={() => {}}
								/>
							</div>
						</div>
						<div className="row mt-3">
							<div className="col-sm-12">
								<Typography>Inventory Details</Typography>
							</div>
						</div>
						<div className="row mb-4">
							{dynamicForm.map((el, index) => (
								<>
									<div className="col-sm-6 ">
										<CustomeTextField
											label="Serial Number"
											classes="mt-4"
											type="text"
											keyName="invoice_number"
											value={el.serial_number}
											onValueChange={() => {}}
										/>
									</div>
									<div className="col-sm-6 ">
										<CustomeTextField
											label="Quantity"
											classes="mt-4"
											type="number"
											keyName="invoice_number"
											value={el.assigned_quantity}
											onValueChange={() => {}}
										/>
									</div>
								</>
							))}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DailogBox;
