import React, { useState, useCallback, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "./components/Header";
import TagItems from "./components/TagItems";
import AddModal from "./components/AddModal";
import AddItemModal from "./components/AddItemModal";
import PaceLoader from "../Utils/PaceLoader";
import { inventoryManagementBackend } from "./inventoryManagementBackend";

const InventoryManagement = (props) => {
	const initModalsState = {
		addCategory: false,
		addType: false,
		addTag: false,
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
	const [existingItems, setExistingItems] = useState({});

	const [loading, setLoading] = useState(false);

	const getTags = useCallback(async () => {
		setProgress({ ...progress, count: 24, view: true });
		try {
			const res = await inventoryManagementBackend.getTags();
			console.log([...new Set(res.data.class)][0]);
			setExistingItems({
				classes: [...new Set(res.data.class)],
				categories: [...new Set(res.data.category)],
				types: [...new Set(res.data.type)],
			});
			setProgress({ ...progress, count: 24, view: true });
			setLoading(true);
			setProgress({ ...progress, count: 100, view: true });
			setTimeout(() => {
				setProgress({ ...progress, view: false });
			}, 800);
		} catch (error) {
			console.log("ERROR GETTING TAGs :", error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getTags();
	}, [getTags]);

	const [modals, setModals] = useState(initModalsState);

	const onCancelHandler = () => {
		setModals(initModalsState);
	};

	const modalOpener = (which) => {
		setModals({ ...modals, [which]: true });
	};

	const onSubmitCategory = async () => {
		if (!state.category) {
			return setError({ ...error, category: "Please enter a category name!" });
		}
		try {
			const formData = new FormData();
			formData.set("tag_type", "category");
			formData.set("tag_name", state.category);
			const res = await inventoryManagementBackend.setTag(formData);
			const newCats = [
				...new Set(existingItems.categories),
				{ id: res.data.id, tag_name: res.data.tag_name },
			];
			setExistingItems({ ...existingItems, categories: newCats });
			setModals({ ...modals, addCategory: false });
			setState({ ...initState });
		} catch (error) {
			setError({ ...error, category: error.data.message.tag_name[0] });
			setState({ ...initState });
		}
	};

	const onSubmitType = async () => {
		if (!state.type) {
			return setError({ ...error, type: "Please enter a type name!" });
		}
		try {
			const formData = new FormData();
			formData.set("tag_type", "type");
			formData.set("tag_name", state.type);
			const res = await inventoryManagementBackend.setTag(formData);
			const newTypes = [
				...new Set(existingItems.types),
				{ id: res.data.id, tag_name: res.data.tag_name },
			];
			setExistingItems({ ...existingItems, types: newTypes });
			setModals({ ...modals, addType: false });
			setState({ ...initState });
		} catch (error) {
			setError({ ...error, type: error.data.message.tag_name[0] });
			setState({ ...initState });
		}
	};

	const onSubmitClass = async () => {
		if (!state.class) {
			return setError({ ...error, class: "Please enter a class name!" });
		}
		try {
			const formData = new FormData();
			formData.set("tag_type", "class");
			formData.set("tag_name", state.class);
			const res = await inventoryManagementBackend.setTag(formData);
			const newClasses = [
				...new Set(existingItems.classes),
				{ id: res.data.id, tag_name: res.data.tag_name },
			];
			setExistingItems({ ...existingItems, classes: newClasses });
			setModals({ ...modals, addClass: false });
			setState({ ...initState });
		} catch (error) {
			setError({ ...error, class: error.data.message.tag_name[0] });
			setState({ ...initState });
		}
	};

	const onValueChange = (e) => {
		console.log(e.target.name, e.target.value);
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const [progress, setProgress] = useState({
		count: 0,
		view: true,
	});

	return (
		<>
			<PaceLoader progress={progress.count} view={progress.view} />
			<div className="fullscreen">
				<Navbar />
				<Header heading={"Management"} setModal={modalOpener} />
				{loading ? (
					<div className="pcoded-main-container" style={{ minHeight: "unset" }}>
						<div className="pcoded-wrapper">
							<div
								className="pcoded-content"
								style={{ padding: "0 30px 30px 30px" }}
							>
								<div className="pcoded-inner-content">
									<div className="main-body">
										<div className="row fix-h-85">
											<div className="col-lg-4 h-100 px-0 pr-2">
												<TagItems
													items={[...new Set(existingItems.classes)]}
													setModal={modalOpener}
													title={"Classes"}
													toOpen={"addClass"}
													setExistingItems={setExistingItems}
													itemsType={"Classes"}
												/>
											</div>
											<div className="col-lg-8 h-100 px-0  d-flex flex-column ">
												<TagItems
													items={[...new Set(existingItems.categories)]}
													setModal={modalOpener}
													title={"Categories"}
													toOpen={"addCategory"}
													setExistingItems={setExistingItems}
												/>
												<TagItems
													title={"Types"}
													items={[...new Set(existingItems.types)]}
													setModal={modalOpener}
													toOpen={"addType"}
													setExistingItems={setExistingItems}
												/>
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
				) : null}
			</div>
		</>
	);
};

export default InventoryManagement;
