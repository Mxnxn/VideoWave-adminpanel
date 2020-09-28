import React, { useState, useEffect } from "react";
import {
	TextField,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Icon,
	IconButton,
	Typography,
	Toolbar,
	AppBar,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CloseRounded, AddRounded } from "@material-ui/icons";

import moment from "moment";
import { dashboardBackend } from "../dashboard_backend";
import CustomeTextField from "./CustomeTextFIeld";
import CustomeDateTimePicker from "./CustomeDateTimePicker";
import AlertDanger from "../../Utils/AlertDanger";

const DailogBox = ({ open, edit, start, end, report, setModal, items, subItems }) => {
	const [startD, setStartD] = useState(moment(start).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS));
	const [endD, setEndD] = useState(moment(end).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS));
	const [reportD, setReportD] = useState(moment(report).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS));

	const [inventory, setInventory] = useState(items);
	const [dynamicForm, setDynamicForm] = useState([]);
	const [form, setForm] = useState(
		edit
			? {
					id: edit.id,
					name: edit.name,
					location: edit.location,
					client_name: edit.client_name,
					client_phone: edit.client_phone,
					client_company: edit.client_company,
					technician_name: edit.technician_name,
					technician_phone: edit.technician_phone,
					client_email: edit.client_email,
					vehicle_number: edit.vehicle_number,
					driver_name: edit.driver_name,
					driver_phone: edit.driver_phone,
					invoice_number: edit.invoice_number,
					priority: edit.priority,
			  }
			: {
					id: "A",
					name: "A",
					location: "A",
					client_name: "A",
					client_phone: 1,
					client_company: "A",
					client_email: "A",
					technician_name: "A",
					technician_phone: 1,
					vehicle_number: "A",
					driver_name: "A",
					driver_phone: 1,
					invoice_number: 1, // disable while adding and readonly while editing
					priority: "482ff7",
			  }
	);

	useEffect(() => {
		try {
			if (edit && edit.items.length > 0) {
				let temp = [];
				const assignedItems = edit.items;
				assignedItems.forEach((assignedItem, index) => {
					items.forEach((item) => {
						if (assignedItem.item_id === item.id) {
							const filterArr = item.serials.filter(
								(serial) => assignedItem.id !== serial.id && assignedItem.item_id === serial.item_id
							);
							item.serials = filterArr;
							temp.push({
								id: index,
								selected: item,
								qty: assignedItem.assigned_quantity,
								serial_number: assignedItem,
							});
						}
					});
				});
				setInventory([...items]);
				setDynamicForm([...temp]);
			}
		} catch (error) {}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [copyForm] = useState(form);
	const [error, setError] = useState("");

	function addEventDetail() {
		if (window.localStorage.getItem("wh") === "true") {
			return setError("This account is not authorized to add event.");
		}
		for (let key in form) {
			if (form[key] === "") {
				if (key === "name") return setError("Event name can't be empty.");
				if (key === "location") return setError("Please provide event location.");
				if (key === "client_name") return setError("Please provide client name.");
				if (key === "client_phone") return setError("Please provide client contact detail.");
				if (key === "client_company") return setError("Please provide client company/firm.");
				// if (key === "technician_name")
				// 	return setError("Please provide technician name");
				// if (key === "technician_details")
				// 	return setError("Please provide technician contact detail");
				// if (key === "vehicle_number")
				// 	return setError("Please provide vehicle number");
				if (key === "driver_name") return setError("Please provide driver name");
				if (key === "driver_phone") return setError("Please provide driver contact detail");
				if (key === "invoice_number") return setError("Please provide invoice number");
			}
		}
		// if (form["client_phone"].length !== 10) {
		// 	return setError("Client contact detail should be 10 digit.");
		// }
		// if (form["technician_details"].length !== 10) {
		// 	return setError("Technician contact detail should be 10 digit.");
		// }
		// if (form["driver_phone"].length !== 10) {
		// 	return setError("Driver contact detail should be 10 digit.");
		// }

		const formData = new FormData();
		for (let key in form) {
			formData.set(key, form[key]);
		}
		dynamicForm.forEach((el, index) => {
			formData.set(`serial_number[${index}]`, el.serial_number.serial_number);
			formData.set(`serial_quantity[${index}]`, el.qty);
		});
		formData.set("start_date", moment(startD).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS));
		formData.set("end_date", moment(endD).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS));
		formData.set("reporting_date", reportD);

		dashboardBackend
			.addNewEvent(formData, window.localStorage.getItem("session_token"))
			.then((res) => {
				window.location.reload();
			})
			.catch((err) => {
				console.log("ERR:", err.response);
			});
	}

	const editEventDetail = () => {
		const difference = Object.keys(form).filter((k) => form[k] !== copyForm[k]);
		const formData = new FormData();
		for (let key of difference) {
			formData.set(key, form[key]);
		}
		dynamicForm.forEach((el, index) => {
			formData.set(`serial_number[${index}]`, el.serial_number.serial_number);
			formData.set(`serial_quantity[${index}]`, el.qty);
		});
		dashboardBackend
			.editEvent(form.id, formData, window.localStorage.getItem("session_token"))
			.then((res) => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onValueChange = (e, key) => {
		setError("");
		setForm({ ...form, [key]: e.target.value });
	};

	const onEndDate = (e) => {
		const endDate = moment(e).add(1, "minute").toDate();
		console.log(endDate);
		setEndD(endDate);
	};

	const onValueChangeDynamicForm = (e, un, id) => {
		setError("");
		const i = dynamicForm.findIndex((el) => el.id === id);
		const temp = [...dynamicForm];
		if (e.target.name === "name") {
			console.log("name");
			temp[i].name = e.target.value;
		}
		if (e.target.name === "serial_number") {
			console.log("sn");
			temp[i].serial_number = e.target.value;
		}
		if (e.target.name === "qty") {
			console.log("qty");
			temp[i].qty = e.target.value;
		}
		setDynamicForm([...temp]);
	};

	useEffect(() => {
		console.log("Original Arr : ", dynamicForm);
	}, [dynamicForm]);

	return (
		<Dialog fullWidth maxWidth="md" open={open} component="form">
			<AppBar position="static" className="bg-dark">
				<Toolbar className="flex  w-full">
					<Typography variant="subtitle1" color="inherit">
						Add Event
					</Typography>
					<IconButton className="ml-auto text-white" onClick={(e) => setModal(false)}>
						<CloseRounded />
					</IconButton>
				</Toolbar>
			</AppBar>
			<DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
				<div className="col-sm-12">
					<AlertDanger error={error} />
				</div>
				<div className="d-flex flex-wrap">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-12">
								<Typography>Event Details</Typography>
							</div>
						</div>
						<div className="row ">
							<div className="mt-3 col-sm-4">
								<CustomeTextField
									error={error.includes("Event name")}
									keyName={"name"}
									label={"Event name"}
									value={form.name}
									onValueChange={onValueChange}
								/>
							</div>
							<div className="mt-3 col-sm-4">
								<CustomeDateTimePicker value={startD} label="Start Date" setValue={setStartD} />
							</div>
							<div className="mt-3 col-sm-4">
								<CustomeDateTimePicker label="End Date" value={endD} setValue={onEndDate} />
							</div>
						</div>
						<div className="row">
							<div className="col-sm-4">
								<CustomeDateTimePicker classes={"mt-4"} label="Reporting Date" value={reportD} setValue={setReportD} />
							</div>
							<div className="col-sm-4">
								<CustomeTextField
									error={error.includes("event location")}
									label="Event location"
									classes="mt-4"
									keyName="location"
									value={form.location}
									onValueChange={onValueChange}
								/>
							</div>
							<div className="col-sm-4">
								<FormControl variant="outlined" className="mt-4" fullWidth>
									<InputLabel id="demo-simple-select-outlined-label">Color</InputLabel>
									<Select
										label="Color"
										style={{ color: `#${form.priority}` }}
										value={form.priority}
										onChange={(e) => {
											console.log(e);
											setForm({ ...form, priority: e.target.value });
										}}
									>
										<MenuItem value={"22d1ee"} style={{ color: "#22d1ee" }}>
											Normal
										</MenuItem>
										<MenuItem value={"482ff7"} style={{ color: "#482ff7" }}>
											Highest
										</MenuItem>
										<MenuItem value={"f4c22b"} style={{ color: "#f4c22b" }}>
											Higher
										</MenuItem>
										<MenuItem value={"#3d6cb9"} style={{ color: "#3d6cb9" }}>
											Low
										</MenuItem>
									</Select>
								</FormControl>
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
									error={error.includes("client name")}
									label="Name"
									classes="mt-4"
									keyName="client_name"
									value={form.client_name}
									onValueChange={onValueChange}
								/>
							</div>
							<div className="col-sm-4">
								<CustomeTextField
									error={error.includes("client contact detail") || error.includes("Client contact")}
									type="number"
									label="Contact number"
									classes="mt-4"
									keyName="client_phone"
									value={form.client_phone}
									onValueChange={onValueChange}
								/>
							</div>
							<div className="col-sm-4">
								<CustomeTextField
									error={error.includes("company/firm")}
									label="Firm name"
									classes="mt-4"
									keyName="client_company"
									value={form.client_company}
									onValueChange={onValueChange}
								/>
							</div>
						</div>
						<div className="row ">
							<div className="col-sm-4">
								<CustomeTextField
									error={error.includes("customer email")}
									label="Client email"
									classes="mt-4"
									keyName="client_email"
									value={form.client_email}
									onValueChange={onValueChange}
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
									error={error.includes("technician name")}
									label="Technician Name"
									classes="mt-4"
									keyName="technician_name"
									value={form.technician_name}
									onValueChange={onValueChange}
								/>
							</div>
							<div className="col-sm-4">
								<CustomeTextField
									error={error.includes("technician contact detail") || error.includes("Technician contact")}
									label="Technician Contact"
									classes="mt-4"
									type="number"
									keyName="technician_phone"
									value={form.technician_phone}
									onValueChange={onValueChange}
								/>
							</div>
							<div className="col-sm-4">
								<CustomeTextField
									error={error.includes("vehicle number")}
									label="Vehicle number"
									classes="mt-4"
									keyName="vehicle_number"
									value={form.vehicle_number}
									onValueChange={onValueChange}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-4">
								<CustomeTextField
									error={error.includes("driver name")}
									label="Driver name"
									classes="mt-4"
									keyName="driver_name"
									value={form.driver_name}
									onValueChange={onValueChange}
								/>
							</div>
							<div className="col-sm-4">
								<CustomeTextField
									error={error.includes("driver contact detail") || error.includes("Driver contact")}
									label="Driver Contact Detail"
									classes="mt-4"
									type="number"
									keyName="driver_phone"
									value={form.driver_phone}
									onValueChange={onValueChange}
								/>
							</div>
							<div className="col-sm-4">
								<CustomeTextField
									error={error.includes("invoice number")}
									label="Challan or Invoice number"
									classes="mt-4"
									type="number"
									keyName="invoice_number"
									value={form.invoice_number}
									onValueChange={onValueChange}
								/>
							</div>
						</div>
						<div className="row mt-3">
							<div className="col-sm-12">
								<Typography>Inventory Details</Typography>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12 ">
								{dynamicForm.map((el, index) => {
									return (
										<div key={index} className="row">
											<div className="col-sm-4">
												<Autocomplete
													id="combo-box-demo"
													className="mt-4"
													options={inventory}
													onChange={(e, value, action) => {
														const temp = dynamicForm[index];
														temp.selected = value;
														dynamicForm.splice(index, 1);
														dynamicForm.splice(index, 0, temp);
														setDynamicForm([...dynamicForm]);
													}}
													value={dynamicForm[index].selected}
													getOptionLabel={(option) => {
														if (option && option.name) return option.name;
														else return "";
													}}
													renderInput={(params) => (
														<TextField label="Item" variant="outlined" {...params} value={dynamicForm[index].name} />
													)}
												/>
											</div>
											{el.selected ? (
												<div className="col-sm-4">
													<Autocomplete
														id="combo-box-demo"
														className="mt-4"
														options={el.selected.serials}
														getOptionLabel={(option, value) => {
															if (option && option.serial_number) return option.serial_number;
															else return "";
														}}
														onChange={(evt, value, action) => {
															if (action === "clear") {
																let current = dynamicForm[index].serial_number;
																const currentSelected = dynamicForm[index].selected;
																const inventoryItemIndex = inventory.filter((item) => item.id === currentSelected.id);
																currentSelected.serials = [...currentSelected.serials, current];
																dynamicForm[index].serial_number = "";
																inventory.splice(inventoryItemIndex, 0);
																inventory.splice(inventoryItemIndex, 0, currentSelected);
																setInventory([...inventoryItemIndex]);
																setDynamicForm([...dynamicForm]);
															} else if (action === "select-option" && dynamicForm[index].serial_number) {
																const currentSerialItem = dynamicForm[index].serial_number;
																const currentSelected = dynamicForm[index].selected;
																currentSelected.serials = [...currentSelected.serials, currentSerialItem];
																dynamicForm[index].serial_number = "";
															}
															try {
																const currentSelected = dynamicForm[index].selected;
																const selectItemIndex = currentSelected.serials.findIndex(
																	(serial) => serial.id === value.id
																);
																currentSelected.serials.splice(selectItemIndex, 1);
																dynamicForm[index].serial_number = value;
																setDynamicForm([...dynamicForm]);
																return value.serial_number;
															} catch (error) {
																return "";
															}
														}}
														value={el.serial_number}
														renderInput={(params) => <TextField label="Serial Number" variant="outlined" {...params} />}
													/>
												</div>
											) : null}
											{el.serial_number ? (
												<div className="col-sm-3">
													<TextField
														id={"title"}
														label="Quantity"
														className={`mb-16 mt-4`}
														InputLabelProps={{
															shrink: true,
														}}
														type="number"
														name="qty"
														variant="outlined"
														required
														fullWidth
														value={el.qty}
														onChange={(e) => onValueChangeDynamicForm(e, "qty", el.id)}
													/>
												</div>
											) : null}
											<div className="col-sm-1 d-flex align-items-end justify-content-end">
												<IconButton
													className="mt-3 bg-danger shadow mb-2"
													onClick={(e) => {
														dynamicForm.splice(index, 1);
														setDynamicForm([...dynamicForm]);
													}}
												>
													<CloseRounded className="text-white">Add</CloseRounded>
												</IconButton>
											</div>
										</div>
									);
								})}
								{/* <IconButton
									className="mt-3 bg-purple-gradient shadow mb-3"
									onClick={(e) =>
										setDynamicForm([
											...dynamicForm,
											{
												id: dynamicForm.length,
												selected: "",
												serial_number: "",
												qty: 1,
												assign: false,
											},
										])
									}
								>
									<AddRounded className="text-white">Add</AddRounded>
								</IconButton> */}
								<Button
									onClick={(e) =>
										setDynamicForm([
											...dynamicForm,
											{
												id: dynamicForm.length,
												selected: "",
												serial_number: "",
												qty: 1,
												assign: false,
											},
										])
									}
									className="bg-purple-gradient mt-3 mb-3 py-2 px-3 text-white"
									startIcon={<AddRounded />}
								>
									Add Item
								</Button>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>

			{!edit ? (
				<DialogActions className="justify-content-between pl-4 mt-2 pl-16 mb-2">
					<Button variant="contained" className="btn-dark" onClick={addEventDetail}>
						Add
					</Button>
				</DialogActions>
			) : (
				<DialogActions className="justify-content-between pl-4 pl-16 mb-2">
					<Button onClick={editEventDetail} variant="contained" color="primary">
						{" "}
						Save
					</Button>
					<IconButton>
						<Icon>delete</Icon>
					</IconButton>
				</DialogActions>
			)}
		</Dialog>
	);
};

export default DailogBox;
