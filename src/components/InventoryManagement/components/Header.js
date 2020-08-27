import React from "react";
import {
	TrendingUp,

	MoreHorizontal,
} from "react-feather";
import { Button, Tooltip, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";

const theme = createMuiTheme({
	overrides: {
		MuiTooltip: {
			tooltip: {
				fontSize: "15px",
			}
		}
	}
});

const Header = ({ heading, setOpenAddModal }) => {
	return (
		<header className="navbar pcoded-header navbar-expand-lg header-default">
			<div className="m-header">
				<a className="mobile-menu" id="mobile-collapse1" href="#!">
					<span></span>
				</a>
				<span className="b-brand">
					<div className="b-bg">
						<TrendingUp />
					</div>
					<span className="b-title">Datta Able</span>
				</span>
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
				<ul className="navbar-nav ml-auto ">
					<li className="nav-item pr-0">
						<div className="drp-user dropdown  mr-4">
							<MuiThemeProvider theme={theme}>
								<Tooltip title="To add a item using these!" placement="left">
									<Button onClick={e => setOpenAddModal(prev => !prev)} variant="outlined" color="Primary" style={{ outline: "none" }} startIcon={<AddRounded />}>
										Add New Item
                            		</Button>
								</Tooltip>
							</MuiThemeProvider>
						</div>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
