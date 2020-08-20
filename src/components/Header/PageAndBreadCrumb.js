import React from "react";
import { Home } from "react-feather";
const PageAndBreadCrumb = (props) => {
	return (
		<div className="page-header">
			<div className="page-block">
				<div className="row align-items-center">
					<div className="col-md-12">
						<div className="page-header-title">
							{/* <div className="m-b-10">Default</div> */}
							{/* <ul className="breadcrumb pl-0">
								<li className="breadcrumb-item">
									<Home size="16" />
								</li>
								<li className="breadcrumb-item">
									<a>Dashboard</a>
								</li>
							</ul> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageAndBreadCrumb;
