import React from "react";
import {
	TrendingUp,
	Settings,
	MoreHorizontal,
	ChevronDown,
} from "react-feather";
const Header = ({ heading }) => {
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
					<li className="nav-item pr-0">
						<div className="drp-user dropdown show">
							<button
								style={{ lineHeight: 0 }}
								aria-haspopup="true"
								aria-expanded="false"
								id="dropdown-basic"
								type="button"
								className="dropdown-toggle btn btn-link "
							>
								<Settings />
								<ChevronDown size="16" className="ml-1" />
							</button>
							<div class="dropdown-menu dropdown-menu-right profile-notification show" style={{marginRight:40}}>
								<div class="pro-head">
									<img src={require("../../assets/plain.png")} style={{height:42,width:42}} class="img-radius" alt="User-Profile-Image"/>
									<span>John Doe</span>
									<a href="auth-signin.html" class="dud-logout" title="Logout">
										<i class="feather icon-log-out"></i>
									</a>
								</div>
								<ul class="pro-body">
									<li><a href="#!" class="dropdown-item"><i class="feather icon-settings"></i> Settings</a></li>
									<li><a href="#!" class="dropdown-item"><i class="feather icon-user"></i> Profile</a></li>
									<li><a href="message.html" class="dropdown-item"><i class="feather icon-mail"></i> My Messages</a></li>
									<li><a href="auth-signin.html" class="dropdown-item"><i class="feather icon-lock"></i> Lock Screen</a></li>
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
