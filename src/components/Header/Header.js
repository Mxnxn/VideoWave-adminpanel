import React, { useState } from "react";
import { TrendingUp, MoreHorizontal, LogOut, Shield } from "react-feather";
import { Badge, IconButton } from "@material-ui/core";
import { NotificationsActiveRounded, MoreVert } from "@material-ui/icons";
import Axios from "axios";
const Header = ({ heading }) => {
	const [popup, setPopup] = useState(false);
	const [notifications, setNotifications] = useState(false);
	const childPopupClass =
		"dropdown-menu dropdown-menu-right profile-notification";
	const childNotifiClass = "dropdown-menu dropdown-menu-right notification";
	const parentPopupClass = "drp-user dropdown";

	const logout = async () => {
		try {
			const res = await Axios.post(
				`${process.env.REACT_APP_API_URL}/user/logout`,
				{},
				{
					headers: {
						Authorization:
							"Bearer " + window.localStorage.getItem("session_token"),
					},
				}
			);
			if (res.data.code === 200) {
				window.localStorage.removeItem("session_token");
				window.localStorage.removeItem("uid");
				window.localStorage.removeItem("email");
				window.location.reload();
			}
		} catch (error) {
			window.localStorage.removeItem("session_token");
				window.localStorage.removeItem("uid");
				window.localStorage.removeItem("email");
				window.location.reload();
		}
	};

	return (
		<header className="navbar pcoded-header navbar-expand-lg header-default">
			<div className="m-header">
				<a className="mobile-menu" id="mobile-collapse1" href="#!">
					<span></span>
				</a>
				<a href="#!" className="b-brand">
					<div className="b-bg">
						<TrendingUp />
					</div>
					<span className="b-title">VideoWaves</span>
				</a>
			</div>
			<a className="mobile-menu" id="mobile-header" href="#!">
				<MoreHorizontal />
			</a>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav mr-auto">
					<li>
						<span className="full-screen font-weight-bold text-uppercase geb ls-1 fs-18">
							{heading}
						</span>
					</li>
					{/* <li className="nav-item">
						<div className="dropdown">
							<button
								aria-haspopup="true"
								aria-expanded="false"
								id="dropdown-basic"
								type="button"
								className="dropdown-toggle btn btn-link"
							>
								Dropdown
								<ChevronDown size="16" className="ml-2" />
							</button>
							<ul></ul>
						</div>
					</li> */}
					{/* <li className="nav-item">
						<div id="main-search" className="main-search open">
							<div className="input-group">
								<input
									type="text"
									id="m-search"
									className="form-control"
									placeholder="Search . . ."
									style={{ width: "210px" }}
								/>
								<a
									href="#!"
									className="input-group-append search-close align-items-center"
								>
									<X size="16" />
								</a>
								<span className="input-group-append search-btn btn btn-primary">
									<Search size="16" color="#fff" />
								</span>
							</div>
						</div>
					</li> */}
				</ul>
				<ul className="navbar-nav ml-auto ">
					<li className="nav-item p-0">
						<div className={notifications ? "show dropdown" : "dropdown"}>
							<span
								style={{ lineHeight: 0 }}
								aria-haspopup="true"
								aria-expanded="false"
								id="dropdown-basic"
								type="button"
								onClick={(e) => setNotifications(!notifications)}
								className="dropdown-toggle btn btn-link "
							>
								<IconButton>
									<Badge color="primary" badgeContent=" " variant="dot">
										<NotificationsActiveRounded size="large" />
									</Badge>
								</IconButton>
							</span>
							<div
								className={
									notifications ? `${childNotifiClass} show` : childNotifiClass
								}
								style={{ marginRight: 24 }}
							>
								<div className="noti-head">
									<h6 className="d-inline-block m-b-0">Notifications</h6>
									<div className="float-right">
										<a href="#!" className="m-r-10">
											mark as read
										</a>
										<a href="#!">clear all</a>
									</div>
								</div>
								<ul className="noti-body">
									<li className="n-title">
										<p className="m-b-0">NEW</p>
									</li>
									<li className="notification">
										<div className="media">
											<img
												className="img-radius"
												src={require("../../assets/plain.png")}
												alt="a"
											/>
											<div className="media-body">
												<p>
													<strong>John Doe</strong>
													<span className="n-time text-muted">
														<i className="icon feather icon-clock m-r-10"></i>30
														min
													</span>
												</p>
												<p>New ticket Added</p>
											</div>
										</div>
									</li>
								</ul>
								<div className="noti-footer">
									<a href="#!">show all</a>
								</div>
							</div>
						</div>
					</li>
					<li className="nav-item p-0">
						<div
							className={popup ? `${parentPopupClass}  show` : parentPopupClass}
						>
							<span
								style={{ lineHeight: 0 }}
								aria-haspopup="true"
								aria-expanded="false"
								id="dropdown-basic"
								type="button"
								onClick={(e) => setPopup(!popup)}
								className="dropdown-toggle btn btn-link "
							>
								<IconButton>
									<MoreVert size="large" />
								</IconButton>
							</span>
							<div
								className={popup ? `show ${childPopupClass}` : childPopupClass}
								style={{ marginRight: 25 }}
							>
								<div className="pro-head">
									<img
										src={require("../../assets/plain.png")}
										style={{ height: 42, width: 42 }}
										className="img-radius"
										alt="b"
									/>
									<span className="geb  ls-1 fs-18">John Doe</span>
								</div>
								<ul className="pro-body">
									<li>
										<span className="dropdown-item">
											<Shield
												size="18"
												className="mr-2"
												style={{ verticalAlign: "text-bottom" }}
											/>{" "}
											Security Prefrences
										</span>
									</li>
									<li onClick={logout}>
										<span className="dropdown-item">
											<LogOut
												size="18"
												className="mr-2"
												style={{ verticalAlign: "text-bottom" }}
											/>{" "}
											Logout
										</span>
									</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
