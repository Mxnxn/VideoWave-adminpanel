import React, { useState } from "react";
import { Home, Package, Sliders, Users, Folder, LogOut } from "react-feather";
import { Link } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { CastConnectedRounded } from "@material-ui/icons";
import Axios from "axios";

const Navbar = (props) => {
	const [toggleNavBar, setToggleNavBar] = useState(window.localStorage.getItem("switchView") === "true" ? true : false);

	const classesNavbar =
		"pcoded-navbar  menu-light navbar-default brand-default drp-icon-style1 menu-item-icon-style1 active-default  title-default";

	const logout = async () => {
		try {
			const res = await Axios.post(
				`${process.env.REACT_APP_API_URL}/user/logout`,
				{},
				{
					headers: {
						Authorization: "Bearer " + window.localStorage.getItem("session_token"),
					},
				}
			);
			if (res.data.code === 200) {
				window.localStorage.removeItem("session_token");
				window.localStorage.removeItem("uid");
				window.localStorage.removeItem("email");
				window.localStorage.removeItem("su");
				window.localStorage.removeItem("id");
				window.localStorage.removeItem("wh");

				window.location.reload();
			}
		} catch (error) {
			window.localStorage.removeItem("session_token");
			window.localStorage.removeItem("uid");
			window.localStorage.removeItem("email");
			window.localStorage.removeItem("su");
			window.localStorage.removeItem("id");
			window.localStorage.removeItem("wh");

			window.location.reload();
		}
	};

	return (
		<nav className={toggleNavBar ? "nav-barx navbar-collapsed " + classesNavbar : classesNavbar}>
			<div className="navbar-wrapper">
				<div className="navbar-brand header-logo">
					{toggleNavBar ? (
						<span href="" className="b-brand">
							<div
								style={{
									borderRadius: " 10px",
									width: " 35px",
									height: " 35px",
									display: "inline-flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<CastConnectedRounded fontSize="large" style={{ color: "white" }} />
							</div>
							<span className="b-title">VideoWaves</span>
						</span>
					) : (
						<Link to="/" className="b-brand">
							<img src={require("../../assets/Logo.jpeg")} style={{ height: "50px" }} alt="Logo" />
						</Link>
					)}
					<p
						className={toggleNavBar ? "mobile-menu on cursor-pointer " : "mobile-menu cursor-pointer"}
						id="mobile-collapse"
						onClick={(e) => {
							window.localStorage.setItem("switchView", !toggleNavBar);
							setToggleNavBar(!toggleNavBar);
						}}
					>
						<span></span>
					</p>
				</div>
				<div className="navbar-content datta-scroll">
					<div className="scrollbar-container ps ps--active-y h-100">
						<ul className="nav pcoded-inner-navbar h-100 d-flex">
							<li className="nav-item pcoded-menu-caption">
								<label>Navigation</label>
							</li>
							<SidebarLink toggleNavBar={toggleNavBar} path="/" name="Dashboard" icon={Home} />
							{window.localStorage.getItem("wh") !== "true" && (
								<SidebarLink toggleNavBar={toggleNavBar} path="/inventory" name="Inventory" icon={Package} />
							)}
							{window.localStorage.getItem("wh") !== "true" && (
								<SidebarLink
									toggleNavBar={toggleNavBar}
									path="/manage/inventory"
									name="Manage Inventory"
									icon={Sliders}
								/>
							)}
							{window.localStorage.getItem("su") && (
								<SidebarLink toggleNavBar={toggleNavBar} path="/users" name="Users" icon={Users} />
							)}
							{!window.localStorage.getItem("wh") && (
								<SidebarLink
									className={"mt-auto"}
									toggleNavBar={toggleNavBar}
									path="/event/history"
									name="Previous Events"
									icon={Folder}
								/>
							)}
							<li
								className={window.localStorage.getItem("wh") ? toggleNavBar && "mt-auto mb-2" : ""}
								style={{ cursor: "pointer" }}
								onClick={logout}
							>
								<span className={"nav-link"} aria-current="page" style={{ padding: "7px 15px" }}>
									<span className="pcoded-micon" style={{ width: toggleNavBar ? "50px" : "30px" }}>
										<LogOut size={toggleNavBar ? "30" : "24"} />
									</span>
									<span className="pcoded-mtext fs-17" id="nav-link-mtext">
										Logout
									</span>
								</span>
							</li>

							{/*<li onClick={(e)=>{setOpenAddModal(!openAddModal)}} className="cursor-pointer">
								<span className={openAddModal ? "nav-link active":"nav-link"} aria-current="page">
									<span className="pcoded-micon">
										<PlusSquare />
									</span>
									<span className="pcoded-mtext">Add New Item</span>
								</span>
							</li>
							<li className="nav-item pcoded-hasmenu pcoded-trigger">
								 <Link to="/" className="nav-link ">
									<span className="pcoded-micon">
										<Home />
									</span>
									<span className="pcoded-mtext">Dashboard</span>
								</Link> 
								<ul className="pcoded-submenu">
									<li>
										<a
											className="nav-link active"
											aria-current="page"
											target=""
											href="/datta-able/react/default/dashboard/default"
										>
											Default
										</a>
									</li>
									<li>
										<a
											className="nav-link"
											target=""
											href="/datta-able/react/default/dashboard/e-commerce"
										>
											Ecommerce
										</a>
									</li>
								</ul> 
							</li>*/}
						</ul>

						<div className="ps__rail-x">
							<div className="ps__thumb-x"></div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
