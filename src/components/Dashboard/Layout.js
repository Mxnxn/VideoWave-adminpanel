import React from "react";
import Navbar from "../Navbar/Navbar";
import ReactCalender from "./components/Calender";
import Header from "../Header/Header";
const DashboardLayout = (props) => {

	return (
		<div className="fullscreen">
			<Navbar />
			<Header heading={"Scheduler"} />
			<div className="pcoded-main-container">
				<div className="pcoded-wrapper">
					<div className="pcoded-content">
						<div className="pcoded-inner-content">
							<div className="main-body">
								<ReactCalender />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
