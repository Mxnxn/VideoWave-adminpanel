import React, { useState, useCallback, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "./components/Header";
import PaceLoader from "../Utils/PaceLoader";
import { adminBackend } from "./adminBackend";
import DeleteModal from "../Utils/DeleteModal";
import AddAdminModal from "./components/AddAdminModal";
import AdminTable from "./components/AdminTable";
import WarehouseUserTable from "./components/WarehouseUserTable";

const Layout = (props) => {
	const [progress] = useState({ count: 0, view: false });

	const [users, setUsers] = useState({
		admins: [],
		appUsers: [],
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [modal, setModal] = useState({
		adminDelete: false,
		adminNew: false,
		userDelete: false,
		userNew: false,
	});
	const [selected, setselected] = useState(false);

	const initState = {
		input: {
			name: "",
			email: "",
			password: "",
			phone: "",
		},
		validation: {
			name: false,
			email: false,
			password: false,
			phone: false,
		},
	};

	const [state, setState] = useState(initState);

	const getUsers = useCallback(async () => {
		try {
			const res = await adminBackend.getAdmins();
			const appusers = await adminBackend.getAppUsers();
			setUsers({ ...users, admin: [...res.data], appUsers: [...appusers.data] });
			setLoading(true);
		} catch (error) {
			console.log(error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	const onCancelHandler = () => {
		setModal({
			adminDelete: false,
			adminNew: false,
			userDelete: false,
			userNew: false,
		});
		setError(false);
		setselected(false);
		setState(initState);
	};

	const submitHandler = async () => {
		try {
			console.log(modal);
			if (modal.userDelete) {
				await adminBackend.deleteWhuser(selected.id);
				const index = users.appUsers.findIndex((el) => el.id === selected.id);
				users.appUsers.splice(index, 1);
				setUsers({ ...users });
				setModal({
					adminDelete: false,
					adminNew: false,
					userDelete: false,
					userNew: false,
				});
				setselected({});
				return null;
			}
			await adminBackend.deleteUser(selected.id);
			const index = users.admin.findIndex((el) => el.id === selected.id);
			users.admin.splice(index, 1);
			setUsers({ ...users });
			setModal({
				adminDelete: false,
				adminNew: false,
				userDelete: false,
				userNew: false,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const addNewAdmin = async () => {
		if (!state.input.name) {
			return setState({
				...state,
				validation: {
					name: "Fields can't be empty",
					...state.validation,
				},
			});
		}
		if (!state.input.email) {
			return setState({
				...state,
				validation: {
					...state.validation,
					email: "Fields can't be empty",
				},
			});
		}
		if (!state.input.phone) {
			return setState({
				...state,
				validation: {
					phone: "Fields can't be empty",
					...state.validation,
				},
			});
		}
		if (!state.input.password) {
			return setState({
				...state,
				validation: {
					password: "Fields can't be empty",
					...state.validation,
				},
			});
		}

		if (state.validation.password.length < 8) {
			return setState({
				...state,
				validation: {
					...state.validation,
					password: "Min. 8 character.",
				},
			});
		}
		try {
			const formData = new FormData();
			formData.set("email", state.input.email);
			formData.set("name", state.input.name);
			formData.set("phone", state.input.phone);
			formData.set("password", state.input.password);
			formData.set("password_confirmation", state.input.password);
			if (modal.userNew) {
				const res = await adminBackend.addNewWarehouseUser(formData);
				setUsers([...users, res.data]);
				onCancelHandler();
				return null;
			}
			if (modal.adminNew) {
				const res = await adminBackend.addNewAdmin(formData);
				setUsers([...users, res.data]);
				onCancelHandler();
				return null;
			}
		} catch (error) {
			if (error.response) {
				console.log(error.response);
				let res = error.response.data.message;
				if (res.email) {
					return setState({
						...state,
						validation: { ...state.validation, email: res.email[0] },
					});
				}
				if (res.phone) {
					return setState({
						...state,
						validation: { ...state.validation, phone: res.phone[0] },
					});
				}
			}
		}
	};

	const onChangeValue = (evt) => {
		setState({
			...state,
			validation: { name: false, email: false, password: false, phone: false },
			input: { ...state.input, [evt.target.name]: evt.target.value },
		});
	};

	useEffect(() => {
		return console.log(modal);
	}, [modal]);

	return (
		loading && (
			<>
				<PaceLoader progress={progress.count} view={progress.view} />
				<div className="fullscreen">
					<Navbar />
					<Header heading={"Users"} />
					<div className="pcoded-main-container">
						<div className="pcoded-wrapper ">
							<div className="pcoded-content pt-0">
								<div className="pcoded-inner-content">
									<div className="main-body ">
										<div className="row">
											<div className="col-xl-8 col-sm-12 py-4">
												<AdminTable setModal={setModal} modal={modal} users={users.admin} setselected={setselected} />
											</div>
											<div className="col-xl-4 col-sm-12 py-4">
												<WarehouseUserTable
													setModal={setModal}
													modal={modal}
													users={users.appUsers}
													setselected={setselected}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<DeleteModal
						onCancelHandler={onCancelHandler}
						modal={modal.adminDelete ? modal.adminDelete : modal.userDelete ? modal.userDelete : false}
						submitHandler={submitHandler}
						error={error}
					/>
					<AddAdminModal
						modal={modal.adminNew}
						onCancelHandler={onCancelHandler}
						state={state.input}
						error={state.validation}
						submitHandler={addNewAdmin}
						onChangeValue={onChangeValue}
					/>
					{/* for App user registration */}
					<AddAdminModal
						modal={modal.userNew}
						onCancelHandler={onCancelHandler}
						state={state.input}
						error={state.validation}
						submitHandler={addNewAdmin}
						onChangeValue={onChangeValue}
					/>
				</div>
			</>
		)
	);
};

export default Layout;
