import React from "react";
import { TrendingUp, Home, Package } from "react-feather";
import { Link } from "react-router-dom";
const Navbar = (props) => {
	const setActive = (path) => {
		const temp = window.location.pathname;
		if (temp === path) {
			return "nav-link active";
		}
		return "nav-link";
	};

	return (
		<nav className="pcoded-navbar menu-dark navbar-default brand-default drp-icon-style1 menu-item-icon-style1 active-default title-default">
			<div className="navbar-wrapper">
				<div className="navbar-brand header-logo">
					<Link to="/" className="b-brand">
						<div className="b-bg">
							<TrendingUp />
						</div>
						<span className="b-title">VideoWaves</span>
					</Link>
					<p className="mobile-menu" id="mobile-collapse">
						<span></span>
					</p>
				</div>
				<div className="navbar-content datta-scroll">
					<div className="scrollbar-container ps ps--active-y">
						<ul className="nav pcoded-inner-navbar">
							<li className="nav-item pcoded-menu-caption">
								<label>Navigation</label>
							</li>
							<Link to="/">
								<li>
									<span className={setActive("/")} aria-current="page">
										<span className="pcoded-micon">
											<Home />
										</span>
										<span className="pcoded-mtext">Dashboard</span>
									</span>
								</li>
							</Link>
							<Link to="/inventory">
								<li>
									<span className={setActive("/inventory")} aria-current="page">
										<span className="pcoded-micon">
											<Package />
										</span>
										<span className="pcoded-mtext">Inventory</span>
									</span>
								</li>
							</Link>
							{/*<li className="nav-item pcoded-hasmenu pcoded-trigger">
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
