import React from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
const InventoryManagement = (props) => {
	const items = [0,1,2,3,4,56,7,8,9,0,12,31,5415,151,6,1,12,31,3,1,14,16,16,161,61,61];
	return (
		<div className="fullscreen">
			<Navbar  />
            <Header heading={"Management"} />
			<div className="pcoded-main-container" style={{height:"100vh",minHeight:"100vh"}}>
				<div className="pcoded-wrapper" >
					<div className="pcoded-content">
						<div className="pcoded-inner-content">
							<div className="main-body">
								<div className="row fix-h-85">
									<div className="col-lg-4 h-100">
										<div className="col pr-0 pl-4 h-100 bg-white rounded shadow"  >
											<div className="row py-2 pl-2 border-bottom">
												<div className="col-sm-6 col-lg-6 geb text-uppercase fs-20 ls-1">
													<span className="ls-1">Classes</span>
												</div>
												<div className="col-sm-6 col-lg-6 d-flex">
													<button className="ml-auto my-auto btn btn-primary btn-sm shadow-1">Add</button>
												</div>
											</div>
											<div className=" d-flex flex-wrap item-area " style={{overflowX:"auto",height:"90%"}}  >
												{items.map((el,index)=><div className="d-flex h-60 m-2 b-bg shadow-1 fira fs-16" ><span className="m-auto">Switcher</span></div>)}
											</div>
										</div>
									</div>
									<div className="col-lg-8 h-100   d-flex flex-column ">
										<div className="col pl-4 pr-0 bg-white border-light rounded shadow " style={{height:"48%"}} >
											<div className="row py-2 pl-2 border-bottom">
												<div className="col-sm-10 col-lg-10 geb text-uppercase fs-20 ls-1">
													<span className="ls-1">Categories</span>
												</div>
												<div className="col-sm-2 col-lg-2 d-flex">
													<button className="ml-auto my-auto btn btn-primary btn-sm shadow-1">Add</button>
												</div>
											</div>
											<div className="d-flex flex-wrap item-area " style={{height:"78%",overflowX:"auto"}}>
												{items.map((el,index)=><div className="d-flex h-60 m-2 b-bg shadow-1 fira fs-16" ><span className="m-auto">Switcher</span></div>)}
											</div>
										</div>
										{/* Type */}
										<div className="col pl-4 pr-0 bg-white rounded shadow mt-2" style={{height:"48%"}} >
											<div className="row py-2 pl-2 border-bottom">
												<div className="col-sm-10 col-lg-10 geb text-uppercase fs-20 ls-1">
													<span className="ls-1">Types</span>
												</div>
												<div className="col-sm-2 col-lg-2 d-flex">
													<button className="ml-auto my-auto btn btn-primary btn-sm shadow-1">Add</button>
												</div>
											</div>
											<div className="d-flex flex-wrap item-area"  style={{height:"82%",overflowY:"auto",overflowX:"none"}}>
												{items.map((el,index)=><div className="d-flex h-60 m-2 b-bg shadow-1 fira fs-16" ><span className="m-auto">Switcher</span></div>)}
											</div>
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InventoryManagement;
