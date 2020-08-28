import React, { useState }
	from "react";
import { Home, Package, Sliders, Minimize2, Sidebar } from "react-feather";
import { Link } from "react-router-dom";
import { ExpandMoreRounded, Widgets } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import SidebarLink from "./SidebarLink";
// import { DialogContent, Dialog, AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
// import { CloseRounded } from "@material-ui/icons";
// import AlertDanger from "../Utils/AlertDanger"
const Navbar = (props) => {

	// const [openAddModal, setOpenAddModal] = useState(false);
	// const [error, setError] = useState(false);

	const [toggleNavBar, setToggleNavBar] = useState(false);



	const classesNavbar = "pcoded-navbar  menu-light navbar-default brand-default drp-icon-style1 menu-item-icon-style1 active-default  title-default"

	return (
		<nav className={toggleNavBar ? "nav-barx navbar-collapsed " + classesNavbar : classesNavbar}>
			<div className="navbar-wrapper">
				<div className="navbar-brand header-logo">
					<Link to="/" className="b-brand">
						<img src={require("../../assets/Logo.jpeg")} style={{ height: "50px" }} alt="Logo" />
					</Link>

					<p className={toggleNavBar ? "mobile-menu on " : "mobile-menu cursor-pointer"} id="mobile-collapse" onClick={e => setToggleNavBar(prev => !prev)}>
						<span></span>
					</p>
				</div>
				<div className="navbar-content datta-scroll">
					<div className="scrollbar-container ps ps--active-y">
						<ul className="nav pcoded-inner-navbar">
							<li className="nav-item pcoded-menu-caption">
								<label>Navigation</label>
							</li>
							<SidebarLink toggleNavBar={toggleNavBar} path="/" name="Dashboard" icon={Home} />
							<SidebarLink toggleNavBar={toggleNavBar} path="/inventory" name="Inventory" icon={Package} />
							<SidebarLink toggleNavBar={toggleNavBar} path="/manage/inventory" name="Manage Inventory" icon={Sliders} />
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
			{/* <Dialog fullWidth maxWidth="sm" open={openAddModal} component="form">
				<AppBar position="static" className="bg-dark">
					<Toolbar className="flex  w-full">
						<Typography variant="subtitle1" color="inherit">
							Add Item
						</Typography>
						<IconButton
							className="ml-auto text-white"
							onClick={(e) => setOpenAddModal(false)}
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
							></div>
						</div>
				</DialogContent>
			</Dialog> */}
		</nav>
	);
};

export default Navbar;
