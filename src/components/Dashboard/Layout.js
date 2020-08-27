import React from "react";
import Navbar from "../Navbar/Navbar";
import ReactCalender from "./components/Calender";
import Header from "../Header/Header";
// import StatsCard from "../Header/StatsCard";
// import FullScreenDialogBox from "./components/FullScreenDialogBox";
const DashboardLayout = (props) => {
	
	return (
		<div className="fullscreen">
			<Navbar  />
			<Header heading={"Scheduler"}/>
			<div className="pcoded-main-container">
				<div className="pcoded-wrapper">
					<div className="pcoded-content">
						<div className="pcoded-inner-content">
							<div className="main-body">
								{/* <div className="page-wrapper">
									<div className="row">
										<div class="col-xl-4 col-md-6">
											<StatsCard />
										</div>
									</div>
								</div> */}
								{/* <FullScreenDialogBox open={open} setOpen={setopen} /> */}
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
