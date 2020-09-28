import React from "react";
import { MoreHorizontal, TrendingUp } from "react-feather";

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
				</ul>
			</div>
		</header>
	);
};

export default Header;
