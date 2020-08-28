import React, { useState }
	from "react";
import { Home, Package, Sliders } from "react-feather";
import { Link } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { CastConnectedRounded } from "@material-ui/icons";

const Navbar = (props) => {

	const [toggleNavBar, setToggleNavBar] = useState(window.localStorage.getItem("switchView") ? Boolean(window.localStorage.getItem("switchView")) : false);

	const classesNavbar = "pcoded-navbar  menu-light navbar-default brand-default drp-icon-style1 menu-item-icon-style1 active-default  title-default"

	return (
		<nav className={toggleNavBar ? "nav-barx navbar-collapsed " + classesNavbar : classesNavbar}>
			<div className="navbar-wrapper">
				<div className="navbar-brand header-logo">
					{toggleNavBar ? (<span href="" className="b-brand">
						<div style={{    borderRadius:" 10px",
										width:" 35px",
										height:" 35px",
										display: "inline-flex",
										alignItems: "center",
										justifyContent: "center"
						}}>
							<CastConnectedRounded fontSize="large" style={{color:"white"}}/>
						</div>
						<span className="b-title">VideoWaves</span>
					</span>) 
					:(<Link to="/" className="b-brand">
						<img src={require("../../assets/Logo.jpeg")} style={{ height: "50px" }} alt="Logo" />
					</Link>)
					}
					<p className={toggleNavBar ? "mobile-menu on cursor-pointer " : "mobile-menu cursor-pointer"} id="mobile-collapse" onClick={e => {setToggleNavBar(!toggleNavBar); window.localStorage.setItem("switchView",!toggleNavBar) }}>
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
			
		</nav>
	);
};

export default Navbar;
