import React from "react";
import {
	TrendingUp,
	Settings,
	MoreHorizontal,
	ChevronDown,
} from "react-feather";
const Header = ({ setOpen }) => {
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
					<span className="b-title">Datta Able</span>
				</a>
			</div>
			<a className="mobile-menu" id="mobile-header" href="#!">
				<MoreHorizontal />
			</a>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav mr-auto">
					<li>
						<span className="full-screen font-weight-bold text-uppercase geb ls-2">
							Scheduler
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
					<li className="nav-item pr-0">
						<div className="drp-user dropdown ">
							<button
								style={{ lineHeight: 0 }}
								onClick={(e) => setOpen((prev) => !prev)}
								aria-haspopup="true"
								aria-expanded="false"
								id="dropdown-basic"
								type="button"
								className="dropdown-toggle btn btn-link "
							>
								<Settings />
								<ChevronDown size="16" className="ml-1" />
							</button>
						</div>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
