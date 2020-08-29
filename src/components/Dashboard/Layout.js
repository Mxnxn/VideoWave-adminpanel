import React from "react";
import Navbar from "../Navbar/Navbar";
import ReactCalender from "./components/Calender";
import Header from "../Header/Header";
const DashboardLayout = ({setProgress}) => {

	return (
		<div className="fullscreen">
			<Navbar />
			<Header heading={"Scheduler"} />
			<div className="pcoded-main-container">
				<div className="pcoded-wrapper " >
					<div className="pcoded-content pt-0">
						<div className="pcoded-inner-content">
							<div className="main-body">
								<ReactCalender setProgress={setProgress} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
