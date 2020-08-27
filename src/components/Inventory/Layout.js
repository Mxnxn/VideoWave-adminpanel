import React, { useState, useCallback, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { inventoryBackend } from "./inventory_backend";
import Classes from "./components/Classes";

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
	const [items, setItems] = useState({});
	const fetchInventories = useCallback(async () => {
		try {
			const res = await inventoryBackend.getAllInventory(session_token);
			const classes = [...new Set(res.map((el) => el.class))];
			const cats = [...new Set(res.map((el) => el.category))];
			const types = [...new Set(res.map((el) => el.type))];
			let sameClass = {};
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
				}
				if (Object.keys(temp).length > 0)
					sameClass = {
						...sameClass,
						[classes[i]]: temp,
					};
			}
			console.log(sameClass);
			setItems(sameClass);
			setInventories({
				...inventories,
				objects: res,
				classes: classes,
				categories: cats,
				types: types,
			});
			setLoading(true);
		} catch (error) {
			console.log(error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchInventories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onTapClassToggle = (className) => {
		Object.keys(items).forEach((cls) => {
			if (cls === className) {
				items[cls].open = !items[cls].open;
			}
		});
		setItems({ ...items });
	};

	const onTapCategoryToggle = (catName) => {
		Object.keys(items).forEach((cls) => {
			Object.keys(items[cls]).forEach((cat) => {
				if (cat === catName) {
					items[cls][cat].open = !items[cls][cat].open;
				}
			});
			setItems({ ...items });
		});
	};

	const onTapTypeToggle = (typeName) => {
		Object.keys(items).forEach((cls) => {
			Object.keys(items[cls]).forEach((cat) => {
				Object.keys(items[cls][cat]).forEach((type) => {
					if (type === typeName) {
						items[cls][cat][type].open = !items[cls][cat][type].open;
					}
				});
			});
			setItems({ ...items });
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

	return (
		<div className="fullscreen">
			<Navbar />
			<div className="pcoded-main-container">
				{loading ? <div className="main-body">
					<div className="d-flex">
						<div className="bg-sidebar">
							<ul>
								<li className="font-weight-bold sidebar-top geb">Inventory</li>
								<Classes
									items={items}
									onTapCategoryToggle={onTapCategoryToggle}
									onTapTypeToggle={onTapTypeToggle}
									onTapClassToggle={onTapClassToggle}
									selected={selected}
									setSelected={setSelected}
								/>
							</ul>
						</div>
						<div className="detail-view">
							{selected ? (
								<div className="d-flex flex-column  h-100 margin-20px ">
									<div className="d-flex geb fs-24 mt-3 mb-3">
										<span>{selected.name}</span>
										<span className="ml-auto" style={{ marginRight: "5%" }}>
											Available Quantity: {availableQty}
										</span>
									</div>
									<div className="d-flex flex-wrap w-100 ">
										{selected.serials.map((el, index) => (
											<div className="d-flex  card-ivntry shadow-sm">
												<div className="details d-flex flex-column">
													<div className="d-flex  w-100 fira">
														Serial : {el.serial_number}
													</div>
													<div
														className="d-flex f-row w-100 "
														style={{ margin: 0 }}
													>
														<span className="fira mt-3">
															Name : {selected.name}
														</span>
													</div>
													{Number(el.is_available) === 1 ? (
														<span className="badge badge-success mt-auto mr-auto fira">
															Available
														</span>
													) : (
															<div
																className="d-flex f-row w-100 mt-auto "
																style={{ margin: 0 }}
															>
																<span className="badge badge-warning  mr-1">
																	Engaged
															</span>
																<span className="badge badge-warning  mr-auto">
																	event: will be displayed
															</span>
															</div>
														)}
												</div>
												<div className="qr-area">
													<img
														src={`${process.env.REACT_APP_QR_PREFIX}${el.qrcode_path}`}
														alt="qr"
													/>
												</div>
											</div>
										))}
									</div>
								</div>
							) : (
									<div
										className="d-flex align-items-center justify-content-center h-100 geb text-uppercase ls-1"
										style={{ flex: 1, letterSpacing: "2px", fontSize: "14px" }}
									>
										Please select item
									</div>
								)}
						</div>
					</div>
				</div> : null}
			</div>
		</div>
	);
};

export default Layout;
