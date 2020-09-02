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
} from "@material-ui/core";
import { CloseRounded, AddRounded } from "@material-ui/icons";
import AlertDanger from "../../Utils/AlertDanger";
import CustomeTextField from "../../Dashboard/components/CustomeTextFIeld";
import { inventoryManagementBackend } from "../inventoryManagementBackend";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AddItemModal = ({ onCancelHandler, modal, title, state, stuffs }) => {
	const classes = [...new Set(stuffs.classes)];
	const categories = [...new Set(stuffs.categories)];
	const types = [...new Set(stuffs.types)];

	const [dynamicForm, setDynamicForm] = useState([]);
	const [itemDetails, setItemDetails] = useState({
		class: "",
		type: "",
		category: "",
		name: "",
		id: "",
		error: false,
	});
	const initDynamicForm = {
		id: dynamicForm.length,
		serial_number: "",
		quantity: 1,
		error: false,
	};

	useEffect(() => {
		if (state) {
			const cls = classes.filter(
				(el) => el.tag_name.toUpperCase() === state.class
			)[0];
			const cat = categories.filter(
				(el) => el.tag_name.toUpperCase() === state.category
			)[0];
			const typex = types.filter(
				(el) => el.tag_name.toUpperCase() === state.type
			)[0];
			setItemDetails({
				...itemDetails,
				id: state.id,
				class: cls,
				category: cat,
				type: typex,
				name: state.name,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	const onDaynamicValueChange = (evt, key, index) => {
		const currentObj = dynamicForm[index];
		currentObj[key] = evt.target.value;
		setDynamicForm([...dynamicForm]);
	};

	const [generalError, setGeneralError] = useState(false);

	const submitHandler = async () => {
		setItemDetails({ ...itemDetails, error: false });
		setGeneralError(false);
		if (!itemDetails.name) {
			return setItemDetails({ ...itemDetails, error: true });
		}
		if (state) {
			if (dynamicForm.length === 0) {
				const formData = new FormData();
				formData.set("name", itemDetails.name);
				formData.set("class", itemDetails.class.id);
				formData.set("category", itemDetails.category.id);
				formData.set("type", itemDetails.type.id);
				await inventoryManagementBackend.updateItemsWithSerial(
					formData,
					itemDetails.id
				);
				return window.location.reload();
			}
		}
		console.log("HERER?", itemDetails);
		if (dynamicForm.length === 0) {
			return setGeneralError(
				"To add Items there should be atleast 1 serial number added!"
			);
		}
		dynamicForm.forEach((el, index) => {
			if (!el.serial_number) {
				el.error = `Item is empty, can be located at row ${index + 1}.`;
			} else el.error = false;
		});

		setDynamicForm([...dynamicForm]);
		let duplicateItems = [];
		let isDuplicateAvailable = false;
		const addedSerials = dynamicForm.map((el) => {
			return { serial_number: el.serial_number, id: el.id };
		});
		for (let i = 0; i < addedSerials.length; i++) {
			for (let j = 0; j < addedSerials.length; j++) {
				if (i !== j)
					if (addedSerials[i].serial_number === addedSerials[j].serial_number) {
						duplicateItems.push(addedSerials[i].id);
						duplicateItems.push(addedSerials[j].id);
						isDuplicateAvailable = true;
						break;
					}
			}
		}
		duplicateItems = [...new Set(duplicateItems)];
		duplicateItems.forEach((el, index) => {
			dynamicForm[el].error = `Item ${
				el.serial_number
			} is repeating, can be located at row ${index + 1}!`;
			setDynamicForm([...dynamicForm]);
		});
		if (isDuplicateAvailable) {
			console.log("HERER?", itemDetails);
			return console.log("Duplicate Available");
		} else {
			console.log("HERER?", itemDetails);
			try {
				const formData = new FormData();
				formData.set("name", itemDetails.name);
				formData.set("class", itemDetails.class.id);
				formData.set("category", itemDetails.category.id);
				formData.set("type", itemDetails.type.id);
				let count = 0;
				dynamicForm.forEach((el) => (count = Number(el.quantity) + count));
				formData.set("total_quantity", count);
				for (let i = 0; i < dynamicForm.length; i++) {
					formData.set(`serial_number[${i}]`, dynamicForm[i].serial_number);
					formData.set(`serial_quantity[${i}]`, dynamicForm[i].quantity);
				}
				console.log("HERER?", itemDetails);
				if (state) {
					await inventoryManagementBackend.updateItemsWithSerial(
						formData,
						itemDetails.id
					);
					window.location.reload();
				} else {
					console.log("HERER?");
					await inventoryManagementBackend.addItemsWithSerial(formData);
					onCancelHandler();
					setDynamicForm([{ ...initDynamicForm }]);
				}
			} catch (error) {
				console.log(error);
				setGeneralError(error.response.data.message);
			}
		}
	};

	return (
		<Dialog fullWidth maxWidth="md" open={modal} component="form">
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
						<div className="row">
							<div className="col-sm-12 col-xl-12">
								<div className="alert alert-info w-100 rounded mt-2">
									Note: Enter it Properly, it will be used later!
								</div>
							</div>
						</div>
						<AlertDanger
							error={itemDetails.error ? "Item name is empty!" : false}
						/>
						<AlertDanger error={generalError} />
						{dynamicForm.map((el, index) => (
							<AlertDanger error={el.error} />
						))}

						<div className="row mb-3 mr-3">
							<div className="col-sm-12 col-xl-12">
								<span className="geb fs-20">Add Item Details</span>
							</div>
						</div>
						<div className="row mt-3 ">
							<div className="col-sm-12 col-xl-6">
								<Autocomplete
									id="combo-box-demo"
									options={classes}
									onChange={(e, value) => {
										setItemDetails({ ...itemDetails, class: value });
										return value;
									}}
									value={itemDetails.class}
									getOptionLabel={(option) => {
										return option ? option.tag_name : "";
									}}
									renderInput={(params) => (
										<TextField label="Class" variant="outlined" {...params} />
									)}
								/>
							</div>
							<div className="col-sm-12 col-xl-6">
								<Autocomplete
									id="combo-box-demo"
									options={categories}
									onChange={(e, value) => {
										setItemDetails({ ...itemDetails, category: value });
										return value;
									}}
									value={itemDetails.category}
									getOptionLabel={(option) => {
										return option ? option.tag_name : "";
									}}
									renderInput={(params) => (
										<TextField
											label="Category"
											variant="outlined"
											{...params}
										/>
									)}
								/>
							</div>
						</div>
						<div className="row mt-3 ">
							<div className="col-sm-12 col-xl-6">
								<Autocomplete
									id="combo-box-demo"
									options={types}
									onChange={(e, value) => {
										setItemDetails({ ...itemDetails, type: value });
										return value;
									}}
									value={itemDetails.type}
									getOptionLabel={(option) => {
										return option ? option.tag_name : "";
									}}
									renderInput={(params) => (
										<TextField label="Type" variant="outlined" {...params} />
									)}
								/>
							</div>
							<div className="col-sm-12 col-xl-6">
								<TextField
									error={itemDetails.error}
									label="Name"
									value={itemDetails.name}
									variant="outlined"
									fullWidth
									onChange={(evt) =>
										setItemDetails({ ...itemDetails, name: evt.target.value })
									}
								/>
							</div>
						</div>
						<div className="row my-3 mr-3">
							<div className="col-sm-12 col-xl-12">
								<span className="geb fs-20">Add new Serial and Quantity</span>
							</div>
						</div>
						{dynamicForm.map((serialItem, index) => (
							<div key={index} className="row mt-3 ">
								<div className="col-sm-12 col-xl-6">
									<CustomeTextField
										error={serialItem.error}
										index={index}
										label="Serial Number"
										value={serialItem.serial_number}
										type="text"
										keyName="serial_number"
										name="serial_number"
										onValueChange={onDaynamicValueChange}
									/>
								</div>
								<div className="col-sm-12 col-xl-6">
									<CustomeTextField
										error={serialItem.error}
										index={index}
										label="Quantity"
										type="number"
										value={serialItem.quantity}
										keyName="quantity"
										name="quantity"
										onValueChange={onDaynamicValueChange}
									/>
								</div>
							</div>
						))}
						<div className="row mb-3 ">
							<div className="col-sm-12 col-xl-6">
								<IconButton
									className="mt-3 bg-purple-gradient shadow mb-3"
									onClick={(e) =>
										setDynamicForm([...dynamicForm, { ...initDynamicForm }])
									}
								>
									<AddRounded className="text-white">Add</AddRounded>
								</IconButton>
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
					{state ? "Save" : "Add"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddItemModal;
