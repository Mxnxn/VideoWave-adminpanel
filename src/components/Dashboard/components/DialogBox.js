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
	OutlinedInput,
	InputAdornment,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
	CloseRounded,
	AddRounded,
} from "@material-ui/icons";

import moment from "moment";
import { dashboardBackend } from "../dashboard_backend";
import CustomeTextField from "./CustomeTextFIeld";
import CustomeDateTimePicker from "./CustomeDateTimePicker";
import AlertDanger from "../../Utils/AlertDanger";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const DailogBox = ({
	open,
	edit,
	start,
	end,
	report,
	setModal,
	items,
	subItems,
}) => {
	const [startD, setStartD] = useState(
		moment(start).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
	);
	const [endD, setEndD] = useState(
		moment(end).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
	);
	const [reportD, setReportD] = useState(
		moment(report).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
	);

	const [inventory, setInventory] = useState(items);
	const [dynamicForm, setDynamicForm] = useState([]);
	const [copyDynamicForm, setCopyDynamicForm] = useState([]);
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
				technician_details: edit.technician_details,
				vehicle_number: edit.vehicle_number,
				driver_name: edit.driver_name,
				driver_phone: edit.driver_phone,
				invoice_number: edit.invoice_number,
				priority: edit.priority,
			}
			: {
				id: "",
				name: "",
				location: "",
				client_name: "",
				client_phone: "",
				client_company: "",
				technician_name: "",
				technician_details: "",
				vehicle_number: "",
				driver_name: "",
				driver_phone: "",
				invoice_number: "",
				priority: "04a9f5",
			}
	);

	useEffect(() => {
		try {
			if (edit && edit.items.length > 0) {
				let temp = [];
				// edit.items.forEach((el, index) => {
				// 	for (let i = 0; i < items.length; i++) {
				// 		if (items[i].id === el.id) {
				// 			const alternateItems = items[i].serials.filter(
				// 				(elem) => elem.id !== el.id
				// 			);
				// 			items[i].serials = alternateItems;
				// temp.push({
				// 	id: index,
				// 	selected: items[i],
				// 	qty: el.assigned_quantity,
				// 	serial_number: el,
				// });
				// 		}
				// 	}
				// });
				const assignedItems = edit.items;
				assignedItems.forEach((assignedItem, index) => {
					items.forEach((item) => {
						const filterArr = item.serials.filter((serial) => assignedItem.id !== serial.id && assignedItem.item_id === serial.item_id);
						item.serials = filterArr;
						temp.push({
							id: index,
							selected: item,
							qty: assignedItem.assigned_quantity,
							serial_number: assignedItem,
						});
					})
				})
				setInventory([...items]);
				setDynamicForm([...temp]);
			}
		} catch (error) { }
	}, []);

	const [copyForm] = useState(form);
	const [error, setError] = useState("");

	function addEventDetail() {
		for (let key in form) {
			if (form[key] === "") {
				if (key === "name") return setError("Event name can't be empty.");
				if (key === "location")
					return setError("Please provide event location.");
				if (key === "client_name")
					return setError("Please provide client name.");
				if (key === "client_phone")
					return setError("Please provide client contact detail.");
				if (key === "client_company")
					return setError("Please provide client company/firm.");
				if (key === "technician_name")
					return setError("Please provide technician name");
				if (key === "technician_details")
					return setError("Please provide technician contact detail");
				if (key === "vehicle_number")
					return setError("Please provide vehicle number");
				if (key === "driver_name")
					return setError("Please provide driver name");
				if (key === "driver_phone")
					return setError("Please provide driver contact detail");
				if (key === "invoice_number")
					return setError("Please provide invoice number");
			}
		}
		if (form["client_phone"].length !== 10) {
			return setError("Client contact detail should be 10 digit.");
		}
		if (form["technician_details"].length !== 10) {
			return setError("Technician contact detail should be 10 digit.");
		}
		if (form["driver_phone"].length !== 10) {
			return setError("Driver contact detail should be 10 digit.");
		}

		const formData = new FormData();
		for (let key in form) {
			formData.set(key, form[key]);
		}
		dynamicForm.forEach((el, index) => {
			formData.set(`serial_number[${index}]`, el.serial_number.serial_number);
			formData.set(`serial_quantity[${index}]`, el.qty);
		});
		formData.set("start_date", startD);
		formData.set("end_date", endD);
		formData.set("reporting_date", reportD);

		dashboardBackend
			.addNewEvent(formData, window.localStorage.getItem("session_token"))
			.then((res) => {
				window.location.reload();
			})
			.catch((err) => {
				console.log("Err : ", err);
			});
	}

	const editEventDetail = () => {
		const difference = Object.keys(form).filter((k) => form[k] !== copyForm[k]);
		const formData = new FormData();
		for (let key of difference) {
			formData.set(key, form[key]);
		}
		dashboardBackend
			.editEvent(
				form.id,
				formData,
				window.localStorage.getItem("session_token")
			)
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

	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState({
		items: [],
		serials: [],
		flag: false,
	});

	const onSearch = (e) => {
		setSearch(e.target.value);
		const tempItems = items;
		if (e.target.value === "") {
			setSearchResult({ ...searchResult, items: [], serials: [], flag: false });
			return setSearch(e.target.value);
		} else {
			const searchItems = tempItems.filter((el) => el.name.includes(search));
			const serialNumbers = [];
			for (let i = 0; i < searchItems.length; i++) {
				for (let j = 0; j < subItems.length; j++) {
					if (subItems[j].item_id === searchItems[i].id) {
						serialNumbers.push(subItems[j]);
					}
				}
			}

			if (searchItems.length > 0 && serialNumbers.length > 0) {
				setSearchResult({
					items: searchItems,
					serials: serialNumbers,
					flag: true,
				});
			}
		}
	};

	const cancelSearch = () => {
		setSearchResult({ ...searchResult, items: [], serials: [], flag: false });
		return setSearch("");
	};

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;

		try {
			console.log(destination.droppableId, source.droppableId, draggableId);
			console.log(items[draggableId]);
		} catch (error) { }
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

	useEffect(() => {
		console.log("Copy arr : ", copyDynamicForm);
	}, [copyDynamicForm]);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Dialog fullWidth maxWidth="lg" open={open} component="form">
				<AppBar position="static" className="bg-dark">
					<Toolbar className="flex  w-full">
						<Typography variant="subtitle1" color="inherit">
							Add Event
						</Typography>
						<IconButton
							className="ml-auto text-white"
							onClick={(e) => setModal(false)}
						>
							<CloseRounded />
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
											<Typography>Items</Typography>
										</div>
									</div>
									<div className="row">
										<Droppable droppableId="start">
											{(provided, snapShot) => {
												return (
													<div
														className="col-sm-12 side-inventory"
														style={{ overflowY: "auto" }}
														{...provided.droppableProps}
														ref={provided.innerRef}
													>
														<FormControl
															variant="outlined"
															className="mt-3 mb-3"
															fullWidth
														>
															<InputLabel htmlFor="outlined-adornment-password">
																Search
															</InputLabel>
															<OutlinedInput
																id="outlined-adornment-password"
																value={search}
																onChange={onSearch}
																endAdornment={
																	<InputAdornment position="end">
																		<IconButton
																			aria-label="toggle password visibility"
																			edge="end"
																			onClick={cancelSearch}
																			style={{ outline: "none" }}
																		>
																			<CloseRounded />
																		</IconButton>
																	</InputAdornment>
																}
																labelWidth={70}
															/>
														</FormControl>

														<>
															{!searchResult.flag
																? items.map((elx) => {
																	return subItems.map((el, index) =>
																		el.item_id === elx.id ? (
																			<Draggable
																				draggableId={"" + el.id}
																				index={index}
																				key={index}
																			>
																				{(provded, snpshot) => {
																					return (
																						<div
																							{...provded.dragHandleProps}
																							{...provded.draggableProps}
																							elevation="1"
																							className="mb-2 alert cursor-pointer rounded alert-info "
																							ref={provded.innerRef}
																						>
																							<span className="mr-auto">
																								{elx.name}
																							</span>
																							<span className="serial-number">
																								serial : {el.serial_number}
																							</span>
																						</div>
																					);
																				}}
																			</Draggable>
																		) : null
																	);
																})
																: searchResult.items.map((elx) => {
																	return searchResult.serials.map(
																		(el, index) => {
																			return el.item_id === elx.id ? (
																				<Draggable
																					draggableId={"" + el.id}
																					key={index}
																					index={index}
																				>
																					{(provded, snpshot) => {
																						return (
																							<div
																								{...provded.dragHandleProps}
																								{...provded.draggableProps}
																								elevation="1"
																								className="mb-2 alert cursor-pointer rounded alert-info "
																								ref={provded.innerRef}
																							>
																								<span className="mr-auto">
																									{elx.name}
																								</span>
																								<span className="serial-number">
																									serial : {el.serial_number}
																								</span>
																							</div>
																						);
																					}}
																				</Draggable>
																			) : null;
																		}
																	);
																})}
															{provided.placeholder}
														</>
													</div>
												);
											}}
										</Droppable>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-8">
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
									<CustomeDateTimePicker
										value={startD}
										label="Start Date"
										setValue={setStartD}
									/>
								</div>
								<div className="mt-3 col-sm-4">
									<CustomeDateTimePicker
										label="End Date"
										value={endD}
										setValue={onEndDate}
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-4">
									<CustomeDateTimePicker
										classes={"mt-4"}
										label="Reporting Date"
										value={reportD}
										setValue={setReportD}
									/>
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
										<InputLabel id="demo-simple-select-outlined-label">
											Color
										</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											label="Priority"
											style={{ color: `#${form.priority}` }}
											value={form.priority}
											onChange={(e) =>
												setForm({ ...form, priority: e.target.value })
											}
										>
											<MenuItem value="04a9f5" className="text-primary">
												Normal
											</MenuItem>
											<MenuItem value={"f4c22b"} className="text-warning">
												Highest
											</MenuItem>
											<MenuItem value={"a389d4"} className="text-purple">
												Higher
											</MenuItem>
											<MenuItem value={"1de9b6"} className="text-success">
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
										error={
											error.includes("client contact detail") ||
											error.includes("Client contact")
										}
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
										error={
											error.includes("technician contact detail") ||
											error.includes("Technician contact")
										}
										label="Technician Contact"
										classes="mt-4"
										keyName="technician_details"
										value={form.technician_details}
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
										error={
											error.includes("driver contact detail") ||
											error.includes("Driver contact")
										}
										label="Driver Contact Detail"
										classes="mt-4"
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
									<Droppable droppableId="end">
										{(provided, snapShot) => {
											return (
												<div
													{...provided.droppableProps}
													ref={provided.innerRef}
												>
													{snapShot.isDraggingOver ? (
														<div
															className="d-flex justify-content-center align-items-center"
															style={{
																height: "auto",
																minHeight: "100px",
																border: snapShot.isDraggingOver
																	? "1px dashed #bdbdbd"
																	: null,
																padding: 20,
															}}
														>
															{snapShot.isDraggingOver ? (
																<h3 style={{ opacity: "0.4" }}>Drop here</h3>
															) : null}
														</div>
													) : null}
													{dynamicForm.map((el, index) => {
														return (
															<div key={index} className="row">
																<div className="col-sm-4">
																	{/* <CustomeTextField
																			error={
																				error.includes(
																					"driver contact detail"
																				) || error.includes("Driver contact")
																			}
																			disable={true}
																			label="Name"
																			classes="mt-4"
																			keyName="name"
																			value={el.name}
																			index={el.id}
																			onValueChange={onValueChangeDynamicForm}
																		/> */}
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
																			if (option && option.name)
																				return option.name;
																			else return "";
																		}}
																		renderInput={(params) => (
																			<TextField
																				label="Item"
																				variant="outlined"
																				{...params}
																				value={dynamicForm[index].name}
																			/>
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
																				if (option && option.serial_number)
																					return option.serial_number;
																				else return "";
																			}}
																			onChange={(evt, value, action) => {
																				console.log(value);
																				if (action === "clear") {
																					let current = dynamicForm[index].serial_number;
																					const currentSelected = dynamicForm[index].selected;
																					const inventoryItemIndex = inventory.filter((item) => item.id === currentSelected.id);
																					currentSelected.serials = [...currentSelected.serials, current];
																					dynamicForm[index].serial_number = "";
																					inventory.splice(inventoryItemIndex, 0);
																					inventory.splice(
																						inventoryItemIndex, 0, currentSelected
																					);
																					setInventory([...inventoryItemIndex]);
																					setDynamicForm([...dynamicForm]);
																				}
																				try {
																					const currentSelected =
																						dynamicForm[index].selected;
																					const selectItemIndex = currentSelected.serials.findIndex((serial) => serial.id === value.id);
																					currentSelected.serials.splice(selectItemIndex, 1);
																					dynamicForm[
																						index
																					].serial_number = value;
																					setDynamicForm([...dynamicForm]);
																					return value.serial_number;
																				} catch (error) {
																					return ""
																				}
																			}}
																			value={el.serial_number}
																			renderInput={(params) => (
																				<TextField
																					label="Serial Number"
																					variant="outlined"
																					{...params}
																				/>
																			)}
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
																			onChange={(e) =>
																				onValueChangeDynamicForm(
																					e,
																					"qty",
																					el.id
																				)
																			}
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
																		<CloseRounded className="text-white">
																			Add
																		</CloseRounded>
																	</IconButton>
																</div>
															</div>
														);
													})}
													<IconButton
														className="mt-3 bg-purple-gradient shadow mb-3"
														onClick={(e) =>
															setDynamicForm([
																...dynamicForm,
																{
																	id: dynamicForm.length,
																	selected: "",
																	serial_number: "",
																	qty: 1,
																	assign: false
																},
															])
														}
													>
														<AddRounded className="text-white">Add</AddRounded>
													</IconButton>
													{/* {!lock ? (
														<IconButton
															className="mt-3 bg-success shadow mb-3 ml-2"
															onClick={(e) => {
																setLock(true);
																console.log(dynamicForm);
															}}
														>
															<LockRounded className="text-white">
																Add
															</LockRounded>
														</IconButton>
													) : (
														<IconButton
															className="mt-3 bg-danger shadow mb-3 ml-2"
															onClick={(e) => {
																setLock(false);
															}}
														>
															<LockOpenRounded className="text-white">
																Add
															</LockOpenRounded>
														</IconButton>
													)} */}
												</div>
											);
										}}
									</Droppable>
								</div>
							</div>
						</div>
					</div>
				</DialogContent>

				{!edit ? (
					<DialogActions className="justify-content-between pl-4 mt-2 pl-16 mb-2">
						<Button
							variant="contained"
							className="btn-dark"
							onClick={addEventDetail}
						>
							Add
						</Button>
					</DialogActions>
				) : (
						<DialogActions className="justify-content-between pl-4 pl-16 mb-2">
							<Button
								onClick={editEventDetail}
								variant="contained"
								color="primary"
							>
								{" "}
							Save
						</Button>
							<IconButton>
								<Icon>delete</Icon>
							</IconButton>
						</DialogActions>
					)}
			</Dialog>
		</DragDropContext>
	);
};

export default DailogBox;
