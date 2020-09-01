import React, { useState, useCallback, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { inventoryBackend } from "./inventory_backend";
import Classes from "./components/Classes";
import PaceLoader from "../Utils/PaceLoader";
import InventorySidebarHeading from "./components/InventorySidebarHeading";
import SelectedInventory from "./components/SelectedInventory";
import { inventoryManagementBackend } from "../InventoryManagement/inventoryManagementBackend";

const Layout = (props) => {
	const [inventories, setInventories] = useState({
		classes: [],
		categories: [],
		types: [],
		objects: [],
	});
	const [session_token] = useState(
		window.localStorage.getItem("session_token")
	);
	const [loading, setLoading] = useState(false);
	const [nonFilteredItems, setNonFilteredItems] = useState([]);
	const [items, setItems] = useState({});

	const fetchInventories = useCallback(async () => {
		setProgress({ ...progress, count: 24, view: true });
		try {
			const res = await inventoryBackend.getAllInventory(session_token);
			const classes = [...new Set(res.map((el) => el.class))];
			const cats = [...new Set(res.map((el) => el.category))];
			const types = [...new Set(res.map((el) => el.type))];
			let sameClass = {};
			setNonFilteredItems(res);
			for (let i = 0; i < classes.length; i++) {
				let temp = {};
				for (let m = 0; m < cats.length; m++) {
					let ttmp = {};
					for (let k = 0; k < types.length; k++) {
						const element = res.filter(
							(el) =>
								el.class === classes[i] &&
								el.category === cats[m] &&
								el.type === types[k]
						);
						element.open = false;
						if (element.length > 0)
							ttmp = { ...ttmp, [types[k]]: element, open: false };
					}
					if (Object.keys(ttmp).length > 0)
						temp = {
							...temp,
							[cats[m]]: ttmp,
							open: false,
						};
					ttmp = {};
					setProgress({ ...progress, count: 48, view: true });
				}
				if (Object.keys(temp).length > 0)
					sameClass = {
						...sameClass,
						[classes[i]]: temp,
					};
			}

			setProgress({ ...progress, count: 100, view: true });
			setItems(sameClass);
			setProgress({ ...progress, count: 0, view: false });
			setInventories({
				...inventories,
				objects: res,
				classes: classes,
				categories: cats,
				types: types,
			});
		} catch (error) {
			setProgress({ ...progress, count: 0, view: false });
			console.log(error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchInventories();
		fetchTags();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [existingItems, setExistingItems] = useState({});

	const fetchTags = async () => {
		try {
			const res = await inventoryManagementBackend.getTags();
			setExistingItems({
				classes: [...new Set(res.data.class)],
				categories: [...new Set(res.data.category)],
				types: [...new Set(res.data.type)],
			});
			setProgress({ ...progress, count: 24, view: true });
			setLoading(true);
			setProgress({ ...progress, count: 0, view: false });
		} catch (error) {
			console.log("ERROR GETTING TAGs :", error);
			setProgress({ ...progress, count: 0, view: false });
		}
	};

	const onTapClassToggle = (className, searchList) => {
		Object.keys(searchList).forEach((cls) => {
			if (cls === className) {
				searchList[cls].open = !searchList[cls].open;
			}
		});
		if (Object.keys(search.result).length > 0) {
			return setSearch({ ...search, result: searchList });
		}
		setItems({ ...searchList });
	};

	const onTapCategoryToggle = (catName, searchList) => {
		Object.keys(searchList).forEach((cls) => {
			Object.keys(searchList[cls]).forEach((cat) => {
				if (cat === catName) {
					searchList[cls][cat].open = !searchList[cls][cat].open;
				}
			});
			if (Object.keys(search.result).length > 0) {
				return setSearch({ ...search, result: searchList });
			}
			setItems({ ...searchList });
		});
	};

	const onTapTypeToggle = (typeName, searchList) => {
		Object.keys(searchList).forEach((cls) => {
			Object.keys(searchList[cls]).forEach((cat) => {
				Object.keys(searchList[cls][cat]).forEach((type) => {
					if (type === typeName) {
						searchList[cls][cat][type].open = !searchList[cls][cat][type].open;
					}
				});
			});
			if (Object.keys(search.result).length > 0) {
				return setSearch({ ...search, result: searchList });
			}
			setItems({ ...searchList });
		});
	};

	const [selected, setSelected] = useState("");

	const [availableQty, setAvailableQty] = useState(0);

	useEffect(() => {
		if (selected) {
			const temp = selected.serials.filter(
				(el) => Number(el.is_available) === 1
			).length;
			setAvailableQty(temp);
		}
	}, [selected]);

	const [progress, setProgress] = useState({
		count: 0,
		view: false,
	});

	const [search, setSearch] = useState({
		view: false,
		query: "",
		result: [],
	});
	const onSearch = (evt) => {
		setSearch({ ...search, query: evt.target.value });
		if (evt.target.value === "") {
			return setSearch({ ...search, result: [], query: "" });
		}
		const searchFilteredItems = nonFilteredItems.filter(
			(el) =>
				el.name.match(`${evt.target.value}`.toUpperCase()) ||
				el.type.match(`${evt.target.value}`.toUpperCase()) ||
				el.category.match(`${evt.target.value}`.toUpperCase())
		);
		const classes = [...new Set(searchFilteredItems.map((el) => el.class))];
		const cats = [...new Set(searchFilteredItems.map((el) => el.category))];
		const types = [...new Set(searchFilteredItems.map((el) => el.type))];
		let sameClass = {};
		for (let i = 0; i < classes.length; i++) {
			let temp = {};
			for (let m = 0; m < cats.length; m++) {
				let ttmp = {};
				for (let k = 0; k < types.length; k++) {
					const element = searchFilteredItems.filter(
						(el) =>
							el.class === classes[i] &&
							el.category === cats[m] &&
							el.type === types[k]
					);
					element.open = true;
					if (element.length > 0)
						ttmp = { ...ttmp, [types[k]]: element, open: true };
				}
				if (Object.keys(ttmp).length > 0)
					temp = {
						...temp,
						[cats[m]]: ttmp,
						open: true,
					};
				ttmp = {};
			}
			if (Object.keys(temp).length > 0)
				sameClass = {
					...sameClass,
					[classes[i]]: temp,
				};
		}
		return setSearch({ ...search, result: sameClass, query: evt.target.value });
	};

	const cancelSearch = () => {
		setSearch({ ...search, query: "", result: [] });
	};

	return (
		<>
			<PaceLoader progress={progress.count} view={progress.view} />
			<div className="fullscreen">
				<Navbar />
				<div className="pcoded-main-container">
					{loading ? (
						<div className="main-body">
							<div className="d-flex">
								<div className="bg-sidebar">
									<ul>
										<InventorySidebarHeading
											setSearch={setSearch}
											search={search}
											onSearch={onSearch}
											cancelSearch={cancelSearch}
										/>
										<Classes
											items={
												Object.keys(search.result).length > 0
													? search.result
													: items
											}
											onTapCategoryToggle={onTapCategoryToggle}
											onTapTypeToggle={onTapTypeToggle}
											onTapClassToggle={onTapClassToggle}
											selected={selected}
											setSelected={setSelected}
										/>
									</ul>
								</div>
								<SelectedInventory
									selected={selected}
									availableQty={availableQty}
									tags={existingItems}
								/>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</>
	);
};

export default Layout;
