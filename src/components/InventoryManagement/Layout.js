import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "./components/Header";
import ItemsCategories from "./components/ItemsCategories";
import ItemsTypes from "./components/ItemsTypes";
import ItemsClasses from "./components/ItemsClasses";
import AddModal from "./components/AddModal";
import AddItemModal from "./components/AddItemModal";

const InventoryManagement = ({setProgress}) => {
	const items = [
		"SHARP 2500 LUMENS SR.NO5 WHITE",
		"SEAMLESS SWITCHER",
		"PROCESSOR & CONTROLLER",
		"CAT-6 TRANSMITTER",
		"VENUSX1PRO",
		"4K FIBER CABLE",
	];

	const initModalsState = {
		addCategory: false,
		addType: false,
		addClass: false,
		addItem: false,
	};

	const initState = {
		category: "",
		class: "",
		type: "",
	};

	const initDelete = {
		category: false,
		item: false,
		type: false,
		class: false,
	};

	const [error, setError] = useState(initDelete);
	const [state, setState] = useState(initState);
	const [existingItems] = useState({
		classes: ["Speed", "Video", "LED", "Transistors", "Anything"],
		categories: ["Cat1", "Cat2", "Cat3"],
		types: ["Type1", "Type2", "Type3", "Type4", "Type5"],
	});

	const [modals, setModals] = useState(initModalsState);

	const onCancelHandler = () => {
		setModals(initModalsState);
	};

	const modalOpener = (which) => {
		setModals({ ...modals, [which]: true });
	};

	const onSubmitCategory = () => {
		if (!state.category) {
			return setError({ ...error, category: "Please enter a category name!" });
		}
		console.log(state.category);
	};

	// const onSubmitItems = () => {

	// }

	const onSubmitType = () => {
		if (!state.type) {
			return setError({ ...error, type: "Please enter a type name!" });
		}
		console.log(state.type);
	};

	const onSubmitClass = () => {
		if (!state.class) {
			return setError({ ...error, class: "Please enter a class name!" });
		}
		console.log(state.class);
	};

	const onValueChange = (e) => {
		console.log(e.target.name, e.target.value);
		setState({ ...state, [e.target.name]: e.target.value });
	};

	return (
		<div className="fullscreen">
			<Navbar />
			<Header heading={"Management"} setModal={modalOpener} />
			<div
				className="pcoded-main-container"
				style={{ height: "100vh", minHeight: "100vh" }}
			>
				<div className="pcoded-wrapper">
					<div className="pcoded-content">
						<div className="pcoded-inner-content">
							<div className="main-body">
								<div className="row fix-h-85">
									<div className="col-lg-4 h-100">
										<ItemsClasses items={items} setModal={modalOpener} />
									</div>
									<div className="col-lg-8 h-100   d-flex flex-column ">
										<ItemsCategories items={items} setModal={modalOpener} />
										<ItemsTypes items={items} setModal={modalOpener} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<AddItemModal
					modal={modals.addItem}
					stuffs={existingItems}
					title={"Add Item"}
					onCancelHandler={onCancelHandler}
				/>
				<AddModal
					error={error.type}
					modal={modals.addType}
					onValueChange={onValueChange}
					state={state}
					keyName="type"
					submitHandler={onSubmitType}
					title="Add Type"
					onCancelHandler={onCancelHandler}
				/>
				<AddModal
					error={error.category}
					modal={modals.addCategory}
					onValueChange={onValueChange}
					state={state}
					submitHandler={onSubmitCategory}
					keyName="category"
					title="Add Category"
					onCancelHandler={onCancelHandler}
				/>
				<AddModal
					error={error.class}
					modal={modals.addClass}
					onValueChange={onValueChange}
					state={state}
					keyName="class"
					title="Add Class"
					submitHandler={onSubmitClass}
					onCancelHandler={onCancelHandler}
				/>
			</div>
		</div>
	);
};

export default InventoryManagement;
